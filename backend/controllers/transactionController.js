const Transaction = require("../models/transaction")
const mongoose = require ("mongoose")

//get transaction
const getTransaction = async (req ,res) =>{
  const transactions = await Transaction.find().sort({createdAt: -1})

  res.status(200).json(transactions)
}

const createTransaction = async (req,res) =>{

  const {title, amount, type, category, description, date} = req.body

  try{

    const transaction = await Transaction.create({title, amount, type, category, description, date})
    res.status(200).json(transaction)
  }catch(error){
    res.status(400).json({error: error.message})
  }
}

//get one transaction
const getSingleTransaction = async (req,res) =>{
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:"No such transaction"})
  }

  const transaction = await Transaction.findById(id)

  if(!transaction){
    return res.status(404).json({error:"No such transaction"})
  }

  res.status(200).json(transaction)
}

const deleteTransaction = async (req,res) =>{
  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:"No such transaction"})
  }

  const transaction = await Transaction.findByIdAndDelete(id)

  if(!transaction){
    return res.status(404).json({error:"No such transaction"})
  }

  res.status(200).json(transaction)
}

const updateTransaction = async (req,res) =>{
  const {id} = req.params
  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "Workout does not exist"})
  }
  const transaction = await Transaction.findByIdAndUpdate(id, req.body,{new:true})
  if(!transaction){
    return res.status(404).json({error:"No such transaction"})
  }
  res.status(200).json(transaction)
}


module.exports = {
  getTransaction,
  createTransaction,
  getSingleTransaction,
  deleteTransaction,
  updateTransaction
}

