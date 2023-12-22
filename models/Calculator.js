const mongoose = require('mongoose')

const calculationSchema = new mongoose.Schema({
  operand1: Number,
  operand2: Number,
  operation: String,
  result: Number,
})

const Calculator = mongoose.model('Calculator', calculationSchema)

module.exports = Calculator
