const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  merchantName: {
    type: String,
    required: true
  },
  cardNumber: {
    type: String,
    required: true
  },
  transactionDate: {
    type: Date,
    default: Date.now
  },
  isFraudulent: {
    type: Boolean,
    required: true
  },
  riskLevel: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
    required: true
  },
  fraudIndicators: [{
    type: String
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
