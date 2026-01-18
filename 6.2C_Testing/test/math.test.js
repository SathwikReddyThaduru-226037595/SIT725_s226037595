const { expect } = require('chai');
const { calculateAverage } = require('../math');

describe('calculateAverage()', () => {

  it('should calculate average correctly', () => {
    const result = calculateAverage([10, 20, 30]);
    expect(result).to.equal(20);
  });

  it('should return null for empty array', () => {
    const result = calculateAverage([]);
    expect(result).to.equal(null);
  });

  it('should return null for invalid input', () => {
    const result = calculateAverage('invalid');
    expect(result).to.equal(null);
  });

  it('should handle single value', () => {
    const result = calculateAverage([15]);
    expect(result).to.equal(15);
  });

});
