// weight section
const getTransmissionWeight = (uploadDate, meetingDate) => {

    uploadDate = new Date(uploadDate);
    meetingDate = new Date(meetingDate);
    const diffTime = Math.abs(uploadDate - meetingDate);
    const delay = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    console.log( 'diff transmission ' + delay);

    if (delay < 0 && delay > 14) {
        console.log('error delay bigger than 14');
    }

    return (delay >= 9) ? 1:
        (delay == 8) ? 2:
        (delay == 7) ? 3:
        (delay == 6) ? 5:
        (delay == 5) ? 7:
        (delay == 4) ? 8:
        (delay == 3) ? 8:
        (delay == 2) ? 8:
        (delay == 1) ? 7:
        (delay == 0) ? 6:
        0;
}


// paramters section
const getTransmissionParmater = (transmissionWeight) => {

    return (transmissionWeight == 8) ? 8:
        (transmissionWeight == 7) ? 7:
        (transmissionWeight == 6) ? 6:
        (transmissionWeight == 5) ? 5:
        (transmissionWeight == 4) ? 4:
        (transmissionWeight == 3) ? 3:
        (transmissionWeight == 2) ? 2:
        (transmissionWeight == 1) ? 0:
        0;

}

const getDurationParmater = (duration) => {

    return (duration <= 0) ? 0:
        (duration <= 5) ? 0:
        (duration <= 10) ? 0:
        (duration <= 15) ? 1:
        (duration <= 20) ? 1:
        (duration <= 25) ? 1:
        (duration <= 30) ? 1:
        1;
}

const getExposureDayParmater = (exposureDate, meetingDate) => {

    exposureDate = new Date(exposureDate);
    meetingDate = new Date(meetingDate);
    const diffTime = Math.abs(exposureDate - meetingDate);
    const daysSinceExposure = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    // console.log('days since exposure ' + daysSinceExposure);

    return (daysSinceExposure > 14) ? 5:
        (daysSinceExposure > 12) ? 5:
        (daysSinceExposure > 10) ? 5:
        (daysSinceExposure > 8) ? 5:
        (daysSinceExposure > 6) ? 5:
        (daysSinceExposure > 4) ? 5:
        (daysSinceExposure > 2) ? 5:
        5;
}

const getAttenuationParmater = (attenuation) => {

    return (attenuation > 73) ? 2:
        (attenuation > 63) ? 2:
        (attenuation > 51) ? 2:
        (attenuation > 33) ? 2:
        (attenuation > 27) ? 2:
        (attenuation > 15) ? 2:
        (attenuation > 10) ? 2:
        2;
}


const calculateTotalRiskScore = (rssi, duration ,uploadDate, meetingDate, exposureDate) => {
   transmissionWeight =  getTransmissionWeight(uploadDate, meetingDate)
   return getAttenuationParmater(rssi) * getDurationParmater(duration) * getExposureDayParmater(exposureDate, meetingDate) * getTransmissionParmater(transmissionWeight);
}


/*

var uploadDate1 = new Date('12/21/2020');
var meetingDate1 = new Date('12/16/2020');
var exposureDate1 = new Date('12/22/2020');

var uploadDate2 = new Date('12/20/2020');
var meetingDate2 = new Date('12/13/2020');
var exposureDate2 = new Date('12/21/2020');


var userPets = [{uploadDate: uploadDate1, exposureDate: exposureDate1, meetingDate: meetingDate1, duration: 20, rssi: 52}, {uploadDate: uploadDate2, exposureDate: exposureDate2, meetingDate: meetingDate2, duration: 16, rssi: 64}]

*/

module.exports = {calculateTotalRiskScore}