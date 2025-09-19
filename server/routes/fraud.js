const express = require('express');
const Transaction = require('../models/Transaction');
const fraudDetectionModel = require('../models/fraudDetectionModel');
const auth = require('../middleware/auth');
const router = express.Router();

// Apply auth middleware to all fraud routes
router.use(auth);

// Check transaction
router.post('/check', async (req, res) => {
    try {
        const { amount, merchantName, cardNumber } = req.body;

        // Basic validation
        if (!amount || !merchantName || !cardNumber) {
            return res.status(400).json({ 
                message: 'Missing required fields' 
            });
        }

        // Validate card number format
        if (!/^\d{13,19}$/.test(cardNumber.replace(/\D/g, ''))) {
            return res.status(400).json({ 
                message: 'Invalid card number format' 
            });
        }

        // Get fraud analysis
        const fraudAnalysis = await fraudDetectionModel.predict({
            amount: parseFloat(amount),
            merchantName,
            cardNumber
        });

        // Save transaction
        const transaction = new Transaction({
            amount,
            merchantName,
            cardNumber,
            userId: req.userId,
            isFraudulent: fraudAnalysis.isFraudulent,
            riskLevel: fraudAnalysis.riskLevel,
            fraudIndicators: fraudAnalysis.reasons
        });

        await transaction.save();

        // Return analysis results
        res.json({
            isFraudulent: fraudAnalysis.isFraudulent,
            riskLevel: fraudAnalysis.riskLevel,
            reasons: fraudAnalysis.reasons,
            confidence: fraudAnalysis.confidence,
            riskScore: fraudAnalysis.riskScore,
            transactionId: transaction._id
        });
    } catch (error) {
        console.error('Fraud check error:', error);
        res.status(500).json({ 
            message: 'Error processing transaction' 
        });
    }
});

// Get user transactions
router.get('/transactions/:userId', async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.params.userId })
            .sort({ transactionDate: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching transactions' 
        });
    }
});

module.exports = router;
