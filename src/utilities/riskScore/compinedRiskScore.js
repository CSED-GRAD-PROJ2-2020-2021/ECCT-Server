var _ = require("lodash");
var attenuationAndDurationConfig = require("./attenuationAndDurationConfig");
var riskScoreClassification = require("./riskScoreClassification");
var exposureConfig = require("./exposureConfig");

const durationWeightsAccordingToRssi = (rssi, attenuationThresholds, durationWeights) => {
  return rssi < attenuationThresholds.lower
    ? durationWeights.low
    : rssi < attenuationThresholds.upper
    ? durationWeights.mid
    : durationWeights.high;
};

const combinedRiskScore = (userPets) => {
  // calculate total risk and put it with its metadata
  let totalRiskScoresWithMetaData = userPets.map((petMetaData) => ({
    petMetaData,
    totalRisk: exposureConfig.calculateTotalRiskScore(
      petMetaData.RSSI,
      petMetaData.duration,
      petMetaData.uploadDate,
      petMetaData.meetingDate,
      petMetaData.exposureDate
    ),
  }));

  //console.log(totalRiskScoresWithMetaData);

  totalAcceptedRiskScore = totalRiskScoresWithMetaData.filter((petMetaDataAndTotalRisk) => {
    return petMetaDataAndTotalRisk.totalRisk > riskScoreClassification.minRiskScoreThreshold;
  }); // filter all total risks according to low threshold

  if (totalAcceptedRiskScore.length == 0) {
    return 0;
  }

  //console.log(totalAcceptedRiskScore);
  let maxTotalRiskScore = _.max(totalAcceptedRiskScore.map((x) => x.totalRisk)); // number max totalRisk Score

  //console.log(maxTotalRiskScore + " max total score");
  // multiple the duration of each pet with weight according to rssi
  let totalRiskScoresWithDurationWeight = totalAcceptedRiskScore.map((petMetaDataAndTotalRisk) => {
    return (
      petMetaDataAndTotalRisk.petMetaData.duration *
      durationWeightsAccordingToRssi(
        petMetaDataAndTotalRisk.petMetaData.RSSI,
        attenuationAndDurationConfig.attenuationThresholds,
        attenuationAndDurationConfig.durationWeights
      )
    );
  });

  // get the sum of the weighted duration
  let exposureScore = _.sum(totalRiskScoresWithDurationWeight);

  // normalize the max of total risks with normalization divisor
  let normalizeTotalRiskScore =
    maxTotalRiskScore / riskScoreClassification.risk_score_normalization_divisor;

  // calculate the combinedRiskScore
  let combinedRiskScore = normalizeTotalRiskScore * exposureScore;

  // classification the output

  return combinedRiskScore;
};

const classificationOfCombinedRiskScore = (
  combinedRiskScore,
  riskClasses = riskScoreClassification.riskClasses
) => {
  //console.log(combinedRiskScore);
  return combinedRiskScore >= riskClasses.low.min && combinedRiskScore <= riskClasses.low.max
    ? 0
    : combinedRiskScore >= riskClasses.high.min && combinedRiskScore <= riskClasses.high.max
    ? 1
    : -1;
};

module.exports = { combinedRiskScore, classificationOfCombinedRiskScore };
