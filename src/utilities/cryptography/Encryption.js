const crypto = require("crypto");

const generatePrivateKey = () => {
  const key = crypto.randomBytes(32).toString("hex");
  const iv = crypto.randomBytes(16).toString("hex");

  return { key, iv };
};

const encryptData = (data, keyHex, ivHex) => {
  encryptionAlgorithm = process.env.ENCRYPTION_ALGORITHM;
  let iv = Buffer.from(ivHex, "hex"); // convert the iv from string to byte array
  let key = Buffer.from(keyHex, "hex"); // convert the key from string to byte array

  return typeof data === "boolean"
    ? encryptBoolean(data, encryptionAlgorithm, key, iv)
    : typeof data === "string"
    ? encryptString(data, encryptionAlgorithm, key, iv)
    : typeof data === "number"
    ? encryptNumber(data, encryptionAlgorithm, key, iv)
    : Array.isArray(data)
    ? encryptList(data, encryptionAlgorithm, key, iv)
    : typeof data === "object"
    ? encryptJsonObj(data, encryptionAlgorithm, key, iv)
    : "not defiend";
};

const encryptString = (text, encryptionAlgorithm, key, iv) => {
  let cipher = crypto.createCipheriv(encryptionAlgorithm, key, iv);
  let encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return encrypted.toString("hex");
};

const encryptBoolean = (bool, encryptionAlgorithm, key, iv) => {
  let text = bool ? "True" : "False";
  return encryptString(text, encryptionAlgorithm, key, iv);
};

const encryptNumber = (num, encryptionAlgorithm, key, iv) => {
  let text = num.toString();
  return encryptString(text, encryptionAlgorithm, key, iv);
};

const encryptJsonObj = (JsonObj, encryptionAlgorithm, key, iv) => {
  let encryptedObj = {};
  Object.keys(JsonObj).map(function (JsonObjkey, index) {
    if (JsonObjkey != "ID") {
      encryptedObj[JsonObjkey] = encryptData(JsonObj[JsonObjkey], key, iv);
    }
  });

  return encryptedObj;
};

const encryptList = (list, encryptionAlgorithm, key, iv) => {
  const encryptedList = list.map((listInstance) =>
    encryptData(listInstance, encryptionAlgorithm, key, iv)
  );

  return encryptedList;
};
const encryptUser = (data, keyHex, ivHex) => {
  return encryptData(data, keyHex, ivHex);
};

module.exports = { generatePrivateKey, encryptUser };
