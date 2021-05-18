const Vonage = require("@vonage/server-sdk");

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
});

// generate 4 random 4 digits
const generatePinCode = () => {
  const min = 1000;
  const max = 9999;
  pinCode = Math.floor(Math.random() * (max - min + 1) + min);
  return pinCode.toString();
};

const sendPinCode = (phoneNumber, pinCode) => {
  const from = "Desire Application";
  const to = phoneNumber;
  const text = pinCode;

  vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
      throw new Error(err);
    } else {
      if (responseData.messages[0]["status"] === "0") {
        console.log("Message sent successfully.");
      } else {
        throw new Error(`Message failed with error: ${responseData.messages[0]["error-text"]}`);
      }
    }
  });
};

module.exports = { generatePinCode, sendPinCode };
