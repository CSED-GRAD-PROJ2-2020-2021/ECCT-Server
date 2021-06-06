const attenuationThresholds = {
  lower: 55,
  upper: 63
}

const durationWeights = {
  low: 1.0,
  mid: 0.5,
  high: 0.0
}

module.exports = { attenuationThresholds, durationWeights };

/*
const lowAttenuationFilter = (rssi) => {

    return rssi < attenuationThresholds.lower;
}

const midAttenuationFilter = (rssi) => {

    return rssi > attenuationThresholds.lower && rssi < attenuationThresholds.upper;
}

const midAttenuationFilter = (rssi) => {

    return rssi > attenuationThresholds.lower && rssi < attenuationThresholds.upper;
}
*/
