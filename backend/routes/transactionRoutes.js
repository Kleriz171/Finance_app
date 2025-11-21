const express = require('express');
const { getTransactionn } = require('../controllers/transactionController');

const router = express.Router();


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
