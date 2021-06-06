var _ = require('lodash');
var attenuationAndDurationConfig = require('./attenuationAndDurationConfig');
var riskScoreClassification = require('./riskScoreClassification');
var exposureConfig = require('./exposureConfig');

const durationWeightsAcordingToRssi = (rssi, attenuationThresholds, durationWeights) => {

    return (rssi < attenuationThresholds.lower) ? durationWeights.low :
        (rssi < attenuationThresholds.upper) ? durationWeights.mid :
        durationWeights.high;
}

const compinedRiskScore = (userPets) => {

    // calculate total risk and put it with its metadata
    let totalRiskScoresWithMetaData = userPets.map(petMetaData => ( { petMetaData , totalRisk: exposureConfig.calculateTotalRiskScore(petMetaData.RSSI, petMetaData.duration, petMetaData.uploadDate, petMetaData.meetingDate, petMetaData.exposureDate) }));


    totalAcceptedRiskScore = totalRiskScoresWithMetaData.filter((petMetaDataAndtotalRisk) => {
        return petMetaDataAndtotalRisk.totalRisk > riskScoreClassification.minRiskScoreThreshold;
    }); // filter all total risks according to low threshold

    let maxTotalRiskScore = _.max(totalAcceptedRiskScore.map(x => x.totalRisk)); // number max totalRisk Score

    // multiple the duration of eache pet with weight according to rssi
    let totalRiskScoresWithDurationWeight = totalAcceptedRiskScore.map( petMetaDataAndtotalRisk => {
        return petMetaDataAndtotalRisk.petMetaData.duration * durationWeightsAcordingToRssi(petMetaDataAndtotalRisk.petMetaData.RSSI, attenuationAndDurationConfig.attenuationThresholds, attenuationAndDurationConfig.durationWeights);
    });

    // get the summtion of the weighted duration
    let exposureScore = _.sum(totalRiskScoresWithDurationWeight);

    // normalize the max of total risks with normalizatoin divisor
    let normalizeTotlaRiskScore = maxTotalRiskScore / riskScoreClassification.risk_score_normalization_divisor;  

    // calculate the combinedRiskScore
    let combinedRiskScore = normalizeTotlaRiskScore * exposureScore;

    // cassification the output

    return combinedRiskScore;
} 


const calssificationOfCompinedRiskScore = (compinedRiskScore, riskCalsses=riskScoreClassification.riskCalsses) => {

    return (compinedRiskScore >= riskCalsses.low.min && compinedRiskScore <= riskCalsses.low.max) ? 0:
    (compinedRiskScore >= riskCalsses.high.min && compinedRiskScore <= riskCalsses.high.max) ? 1 : -1;

}

// console.log(compinedRiskScore(userPets))
module.exports = { compinedRiskScore, calssificationOfCompinedRiskScore }