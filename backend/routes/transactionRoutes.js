const express = require('express');
const { 
  getTransaction,
  createTransaction,
  getSingleTransaction,
  deleteTransaction,
  updateTransaction
} = require('../controllers/transactionController');
const requireAuth = require("../middleware/requireAuth")

const router = express.Router();

router.use(requireAuth)

//get req
router.get('/', getTransaction)

router.get('/:id', getSingleTransaction)

//post req
router.post('/', createTransaction)

//delete req
router.delete('/:id', deleteTransaction)

//update req
router.patch("/:id", updateTransaction)

module.exports = router;
