const crypto = require("crypto");

const decryptString = (encryptedData, decryptionAlgorithm, keyHex, ivHex) => {
  let encryptedText = Buffer.from(encryptedData, "hex"); // convert the encrypted text to byte array
  let iv = Buffer.from(ivHex, "hex"); // convert the iv from string to byte array
  let key = Buffer.from(keyHex, "hex"); // convert the key from string to byte array
  let decipher = crypto.createDecipheriv(decryptionAlgorithm, key, iv); // create the decipher
  let decrypted = decipher.update(encryptedText); // decrypt the encrypted text
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

const decryptBool = (encryptedData, decryptionAlgorithm, key, iv) => {
  let decryptedData = decryptString(encryptedData, decryptionAlgorithm, key, iv);
  return decryptedData === "True";
};

const decryptNumber = (encryptedData, decryptionAlgorithm, key, iv) => {
  let decryptedData = decryptString(encryptedData, decryptionAlgorithm, key, iv);
  return Number(decryptedData);
};

const LEPMInstanceDecryption = (encryptedLEPMInstance, decryptionAlgorithm, key, iv) => {
  decryptedInstance = {
    PET: decryptString(encryptedLEPMInstance["PET"], decryptionAlgorithm, key, iv),
    duration: decryptNumber(encryptedLEPMInstance["duration"], decryptionAlgorithm, key, iv),
    RSSI: decryptNumber(encryptedLEPMInstance["RSSI"], decryptionAlgorithm, key, iv),
    meetingDate: decryptString(encryptedLEPMInstance["meetingDate"], decryptionAlgorithm, key, iv),
    uploadDate: decryptString(encryptedLEPMInstance["uploadDate"], decryptionAlgorithm, key, iv),
    exposureDate: decryptString(encryptedLEPMInstance["exposureDate"], decryptionAlgorithm, key, iv),
  };

  return decryptedInstance;
};

const LEPMDecryption = (encryptedLEPM, decryptionAlgorithm, key, iv) => {
  const decryptedLEPM = encryptedLEPM.map((LEPMInstance) =>
    LEPMInstanceDecryption(LEPMInstance, decryptionAlgorithm, key, iv)
  );

  return decryptedLEPM;
};

const decryptUser = (userModelInstance, key, iv) => {
  decryptionAlgorithm = process.env.ENCRYPTION_ALGORITHM;
  decryptedInstance = {
    //ID: decryptString(userModelInstance["ID"], decryptionAlgorithm, key, iv),
    ID: userModelInstance["ID"],
    UN: decryptBool(userModelInstance["UN"], decryptionAlgorithm, key, iv),
    SRE: decryptNumber(userModelInstance["SRE"], decryptionAlgorithm, key, iv),
    LEPM: LEPMDecryption(userModelInstance["LEPM"], decryptionAlgorithm, key, iv),
    ERSA: decryptNumber(userModelInstance["ERSA"], decryptionAlgorithm, key, iv),
  };

  return decryptedInstance;
};

module.exports = { decryptUser };
