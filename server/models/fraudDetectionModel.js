// Risk configuration
const riskConfig = {
    // Merchant categories with risk scores
    merchantCategories: {
        'online_retail': { baseRisk: 0.4, timeFactors: { night: 0.1 } },
        'gambling': { baseRisk: 0.8, timeFactors: { night: 0.2 } },
        'travel': { baseRisk: 0.3, timeFactors: { night: 0.1 } },
        'electronics': { baseRisk: 0.5, timeFactors: { night: 0.15 } },
        'unknown': { baseRisk: 0.6, timeFactors: { night: 0.2 } }
    },
    
    // Amount thresholds for different merchant types
    amountThresholds: {
        'online_retail': { low: 100, medium: 500, high: 1000 },
        'gambling': { low: 50, medium: 200, high: 500 },
        'travel': { low: 200, medium: 1000, high: 3000 },
        'electronics': { low: 300, medium: 1000, high: 2000 },
        'unknown': { low: 100, medium: 500, high: 1000 }
    },
    
    // Time-based risk factors
    timeRisk: {
        night: { start: 23, end: 5 },
        weekend: { days: [0, 6] }  // Sunday = 0, Saturday = 6
    },
    
    // Pattern-based risk factors
    patterns: {
        sequentialDigits: 0.6,
        repeatedDigits: 0.7,
        singleDigitVariety: 0.5
    }
};

/**
 * Main fraud detection class
 */
class FraudDetectionModel {
    constructor() {
        this.riskConfig = riskConfig;
    }

    /**
     * Main prediction function
     */
    async predict(transaction) {
        try {
            // Get current transaction context
            const now = new Date();
            const hour = now.getHours();
            const dayOfWeek = now.getDay();
            const merchantType = this.categorizeMerchant(transaction.merchantName.toLowerCase());
            
            // 1. Calculate base merchant risk
            const merchantRisk = this.calculateMerchantRisk(merchantType, hour, dayOfWeek);
            
            // 2. Calculate amount-based risk
            const amountRisk = this.calculateAmountRisk(transaction.amount, merchantType);
            
            // 3. Analyze card number patterns
            const cardFeatures = this.analyzeCardNumber(transaction.cardNumber);
            const cardRisk = this.calculateCardRisk(cardFeatures);
            
            // 4. Calculate temporal risk
            const temporalRisk = this.calculateTemporalRisk(hour, dayOfWeek);
            
            // 5. Combine risk factors with dynamic weights
            const riskFactors = [
                { score: merchantRisk, weight: 0.25 },
                { score: amountRisk, weight: 0.3 },
                { score: cardRisk, weight: 0.25 },
                { score: temporalRisk, weight: 0.2 }
            ];
            
            // Calculate final risk score
            const riskScore = riskFactors.reduce((total, factor) => {
                return total + (factor.score * factor.weight);
            }, 0);
            
            // Generate detailed analysis
            const reasons = [];
            if (merchantRisk > 0.6) reasons.push(`High-risk merchant category: ${merchantType}`);
            if (amountRisk > 0.7) reasons.push('Unusual transaction amount for this merchant type');
            if (cardFeatures[1] === 1) reasons.push('Invalid card number checksum');
            if (cardFeatures[2] > 0.5) reasons.push('Suspicious digit patterns in card number');
            if (temporalRisk > 0.6) reasons.push('Unusual transaction time');
            
            // Determine fraud probability
            const isFraudulent = riskScore >= 0.7; // Threshold for fraud
            
            // Calculate confidence based on the distribution of risk factors
            const riskVariance = this.calculateRiskVariance(riskFactors);
            const confidence = Math.max(0.5, 1 - riskVariance);
            
            return {
                isFraudulent,
                riskLevel: this.calculateRiskLevel(riskScore),
                riskScore: Math.round(riskScore * 100) / 100,
                confidence: Math.round(confidence * 100) / 100,
                reasons,
                analysis: {
                    merchantRisk: Math.round(merchantRisk * 100) / 100,
                    amountRisk: Math.round(amountRisk * 100) / 100,
                    cardRisk: Math.round(cardRisk * 100) / 100,
                    temporalRisk: Math.round(temporalRisk * 100) / 100
                }
            };
        } catch (error) {
            console.error('Prediction error:', error);
            throw error;
        }
    }

    /**
     * Categorize merchant
     */
    categorizeMerchant(merchantName) {
        if (merchantName.includes('bet') || merchantName.includes('casino')) {
            return 'gambling';
        }
        if (merchantName.includes('travel') || merchantName.includes('air')) {
            return 'travel';
        }
        if (merchantName.includes('shop') || merchantName.includes('store')) {
            return 'online_retail';
        }
        if (merchantName.includes('tech') || merchantName.includes('electronics')) {
            return 'electronics';
        }
        return 'unknown';
    }

    /**
     * Analyze card number for fraud indicators
     */
    analyzeCardNumber(cardNumber) {
        const features = [];
        
        // Clean card number
        const cleanNumber = cardNumber.replace(/\D/g, '');
        
        // Length check (normalized)
        features.push((cleanNumber.length - 13) / (19 - 13));
        
        // Luhn algorithm check
        features.push(this.validateLuhn(cleanNumber) ? 0 : 1);
        
        // Repetition patterns
        features.push(this.getRepetitionScore(cleanNumber));
        
        return features;
    }

    /**
     * Luhn algorithm validation
     */
    validateLuhn(cardNumber) {
        let sum = 0;
        let isEven = false;
        
        // Loop from right to left
        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumber.charAt(i), 10);
            
            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            
            sum += digit;
            isEven = !isEven;
        }
        
        return (sum % 10) === 0;
    }

    /**
     * Check for suspicious repetition patterns
     */
    getRepetitionScore(cardNumber) {
        let repetitions = 0;
        let lastDigit = '';
        let streak = 0;
        
        for (const digit of cardNumber) {
            if (digit === lastDigit) {
                streak++;
                if (streak > 2) {
                    repetitions++;
                }
            } else {
                streak = 1;
            }
            lastDigit = digit;
        }
        
        return Math.min(repetitions / 5, 1);
    }

    /**
     * Calculate risk variance for confidence scoring
     */
    calculateRiskVariance(riskFactors) {
        const mean = riskFactors.reduce((sum, factor) => sum + factor.score, 0) / riskFactors.length;
        const variance = riskFactors.reduce((sum, factor) => {
            return sum + Math.pow(factor.score - mean, 2);
        }, 0) / riskFactors.length;
        return Math.sqrt(variance); // Standard deviation
    }

    /**
     * Calculate merchant-specific risk
     */
    calculateMerchantRisk(merchantType, hour, dayOfWeek) {
        const category = this.riskConfig.merchantCategories[merchantType] || this.riskConfig.merchantCategories.unknown;
        let risk = category.baseRisk;
        
        // Add time-based risk factors
        if (hour >= this.riskConfig.timeRisk.night.start || hour <= this.riskConfig.timeRisk.night.end) {
            risk += category.timeFactors.night;
        }
        
        return Math.min(risk, 1);
    }

    /**
     * Calculate amount-based risk
     */
    calculateAmountRisk(amount, merchantType) {
        const thresholds = this.riskConfig.amountThresholds[merchantType] || this.riskConfig.amountThresholds.unknown;
        
        if (amount > thresholds.high) {
            return 0.8 + Math.min((amount - thresholds.high) / (thresholds.high * 2), 0.2);
        } else if (amount > thresholds.medium) {
            return 0.5 + ((amount - thresholds.medium) / (thresholds.high - thresholds.medium) * 0.3);
        } else if (amount > thresholds.low) {
            return 0.3 + ((amount - thresholds.low) / (thresholds.medium - thresholds.low) * 0.2);
        }
        return 0.2;
    }

    /**
     * Calculate temporal risk factors
     */
    calculateTemporalRisk(hour, dayOfWeek) {
        let risk = 0;
        
        // Night-time risk
        if (hour >= this.riskConfig.timeRisk.night.start || hour <= this.riskConfig.timeRisk.night.end) {
            risk += 0.3;
        }
        
        // Weekend risk
        if (this.riskConfig.timeRisk.weekend.days.includes(dayOfWeek)) {
            risk += 0.2;
        }
        
        return Math.min(risk, 1);
    }

    /**
     * Calculate card risk from features
     */
    calculateCardRisk(cardFeatures) {
        let risk = 0;
        
        // Length risk (unusual lengths)
        if (cardFeatures[0] > 0.7) risk += 0.3;
        
        // Luhn check (failed validation)
        if (cardFeatures[1] === 1) risk += 0.4;
        
        // Repetition patterns
        if (cardFeatures[2] > 0.5) risk += 0.3;
        
        return Math.min(risk, 1);
    }

    /**
     * Calculate risk level from score
     */
    calculateRiskLevel(score) {
        if (score >= 0.8) return 'CRITICAL';
        if (score >= 0.7) return 'HIGH';
        if (score >= 0.4) return 'MEDIUM';
        return 'LOW';
    }
}

// Export a new instance of the model
module.exports = new FraudDetectionModel();
