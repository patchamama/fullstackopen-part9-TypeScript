import express from 'express'
import { calculateBmi } from './bmiCalculator'
import { calculateExercises } from './exerciseCalculator'

const app = express()
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query
  if (!height || !weight) {
    res.status(400).json({ error: 'malformatted parameters' })
  } else {
    const bmi = calculateBmi(Number(height), Number(weight))
    res.json({ weight, height, bmi })
  }
})

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body
  console.log({ daily_exercises, target })
  if (!daily_exercises || !target) {
    res.status(400).json({ error: 'parameters missing' })
  } else if (
    typeof daily_exercises !== 'object' ||
    typeof target !== 'number'
  ) {
    res.status(400).json({ error: 'malformatted parameters' })
  } else {
    const result = calculateExercises(daily_exercises, target)
    res.json(result)
  }
})

const PORT = 3002

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
