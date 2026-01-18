function calculateAverage(waitTimes) {
  if (!Array.isArray(waitTimes) || waitTimes.length === 0) {
    return null;
  }

  const sum = waitTimes.reduce((a, b) => a + b, 0);
  return sum / waitTimes.length;
}

module.exports = { calculateAverage };
