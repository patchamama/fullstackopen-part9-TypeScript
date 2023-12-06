interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number // 1-3
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (
  dailyExerciseHours: Array<number>,
  target: number
): Result => {
  const periodLength = dailyExerciseHours.length
  const trainingDays = dailyExerciseHours.filter((hours) => hours > 0).length
  const average = dailyExerciseHours.reduce((a, b) => a + b) / periodLength
  const success = average >= target
  let rating = 2
  let ratingDescription = 'not too bad but could be better'
  if (success) {
    rating = 3
    ratingDescription = 'very good'
  } else if (average < target / 2) {
    rating = 1
    ratingDescription = 'bad'
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
