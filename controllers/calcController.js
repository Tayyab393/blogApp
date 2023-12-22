const Calculator = require('../models/Calculator')

const calculate = async (req, res) => {
  const { operand1, operand2, operation } = req.body

  let result

  switch (operation) {
    case 'add':
      result = operand1 + operand2
      break
    case 'subtract':
      result = operand1 - operand2
      break
    case 'multiply':
      result = operand1 * operand2
      break
    case 'divide':
      if (operand2 !== 0) {
        result = operand1 / operand2
      } else {
        return res
          .status(400)
          .json({ error: 'Division by zero is not allowed' })
      }
      break

    default:
      return res.status(400).json({ error: 'Invalid operation' })
  }

  const calculation = new Calculator({
    operand1,
    operand2,
    operation,
    result,
  })

  await calculation.save()

  res.json({ calculation })
}

module.exports = {
  calculate,
}
