const riskCalsses = {
    low: {
        min: 0,
        max: 15 
    },
    high: {
        min: 16,
        max: 99
    }
}

const minRiskScoreThreshold = 11;

const risk_score_normalization_divisor = 50;

module.exports = {riskCalsses, minRiskScoreThreshold, risk_score_normalization_divisor};