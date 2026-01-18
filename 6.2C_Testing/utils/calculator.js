function calculateAverage(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new Error('Invalid input');
  }

  const sum = numbers.reduce((a, b) => a + b, 0);
  return sum / numbers.length;
}

module.exports = { calculateAverage };
