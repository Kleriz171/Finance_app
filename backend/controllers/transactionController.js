const Transaction = require("../models/transaction")
const mongoose = requrie ("mongoose")

//get transaction
const getTransaction = async (req ,res) =>{
  const transactions = await Transaction.find().sort({createdAt: -1})

  res.status(200).json(transactions)
}

const createTransaction = async (req,res) =>{

  const {tite, amount, type, category, description, date} = req.body

  try{

    const transaction = await Transaction.create({tite, amount, type, category, description, date})
    res.status(200).json(transaction)
  }catch(error){
    res.status(400).json({error: error.message})
  }
}

