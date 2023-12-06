const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2
  if (bmi < 18.5) {
    return 'Underweight'
  } else if (bmi < 25) {
    return 'Normal (healthy weight)'
  } else if (bmi < 30) {
    return 'Overweight'
  } else {
    return 'Obese'
  }
}

if (process.argv.length === 4) {
  const height = Number(process.argv[2])
  const weight = Number(process.argv[3])
  console.log(calculateBmi(height, weight))
} else {
  console.log('No parameters given, using default values (180cm, 74kg)')
  console.log(calculateBmi(180, 74))
}

export { calculateBmi }
