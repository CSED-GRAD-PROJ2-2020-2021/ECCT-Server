const riskClasses = {
  low: {
    min: 0,
    max: 15,
  },
  high: {
    min: 16,
    max: 999999,
  },
};

const minRiskScoreThreshold = 11;

const risk_score_normalization_divisor = 20;

module.exports = { riskClasses, minRiskScoreThreshold, risk_score_normalization_divisor };
