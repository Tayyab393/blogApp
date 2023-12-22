import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'   // in order to store the result in browser to display the result again
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

const Calculate = () => {
  const [operand1, setOperand1] = useState('')
  const [operand2, setOperand2] = useState('')
  const [operation, setOperation] = useState('add')
  const [result, setResult] = useState('')
  const [resultArray, setResultArray] = useState([])

  const [cookies, setCookie] = useCookies(['resultArray'])

  useEffect(() => {
    if (cookies.resultArray) {
      setResultArray(cookies.resultArray)
    } else {
      setResultArray([])
    }
  }, [cookies.resultArray])

  const calculate = async () => {
    try {
      const response = await axios.post('api/v1/calc/add', {
        operand1: parseFloat(operand1),
        operand2: parseFloat(operand2),
        operation,
      })

      setResult(response.data.calculation.result)
      setResultArray([...resultArray, response.data.calculation])

 
      setCookie('resultArray', [...resultArray, response.data.calculation])
    } catch (error) {
      console.error(
        'Error calculating:',
        error.response?.data?.error || 'Unknown error'
      )
      
    }
  }

  return (
    <Container>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant='h4'>Calculator App</Typography>
        <TextField
          label='Operand 1'
          type='number'
          value={operand1}
          onChange={(e) => setOperand1(e.target.value)}
          maxWidth={450}
          sx={{ mt: 2 }}
        />
        <Select
          label='Operation'
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          maxWidth={450}
          sx={{ mt: 2 }}
        >
          <MenuItem value='add'>+</MenuItem>
          <MenuItem value='subtract'>-</MenuItem>
          <MenuItem value='multiply'>*</MenuItem>
          <MenuItem value='divide'>/</MenuItem>
        </Select>        
        <TextField
          label='Operand 2'
          type='number'
          value={operand2}
          onChange={(e) => setOperand2(e.target.value)}
          maxWidth={450}
          sx={{ mt: 2 }}
        />

        <Button
          variant='contained'
          color='primary'
          onClick={calculate}
          maxWidth={450}
          sx={{ mt: 2 }}
        >
          Calculate
        </Button>
        <Typography variant='h5' sx={{ mt: 2 }}>
          Result: {result}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant='h6'>Calculation History</Typography>
          <table style={{ width: '100%', marginTop: '8px' }}>
            <thead>
              <tr>
                <th>Operand 1</th>
                <th>Operation</th>
                <th>Operand 2</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {resultArray.map((calculation, index) => (
                <tr key={index}>
                  <td>{calculation.operand1}</td>
                  <td>{calculation.operation}</td>
                  <td>{calculation.operand2}</td>
                  <td>{calculation.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Box>
    </Container>
  )
}

export default Calculate
