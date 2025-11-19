const Transaction = require('../models/Transaction');

// @desc    Get all transactions for logged-in user
// @route   GET /api/transactions
// @access  Private
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new transaction
// @route   POST /api/transactions
// @access  Private
const addTransaction = async (req, res) => {
  const { type, category, amount, date, note } = req.body;

  if (!type || !category || !amount) {
    return res.status(400).json({ message: 'Please provide type, category, and amount' });
  }

  try {
    const transaction = await Transaction.create({
      user: req.user._id,
      type,
      category,
      amount,
      date: date || Date.now(),
      note
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a transaction
// @route   PUT /api/transactions/:id
// @access  Private
const updateTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    let transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Only allow owner to update
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    transaction = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a transaction
// @route   DELETE /api/transactions/:id
// @access  Private
const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Only allow owner to delete
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Transaction.findByIdAndDelete(id);
    res.json({ message: 'Transaction removed', id: transaction._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction
};
