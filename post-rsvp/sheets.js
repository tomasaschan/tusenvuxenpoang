const GoogleSpreadsheet = require("google-spreadsheet");

const SPREADSHEET_ID = process.env.SpreadsheetId;
const PRIVATE_KEY = process.env.GAuthPrivateKey;
const CLIENT_EMAIL = process.env.GAuthClientEmail;

const creds = {
  client_email: CLIENT_EMAIL,
  private_key: PRIVATE_KEY
};

exports.authenticate = () =>
  new Promise((resolve, reject) => {
    console.info(SPREADSHEET_ID);
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    doc.useServiceAccountAuth(
      creds,
      (err, _) => (!err ? resolve(doc) : reject(err))
    );
  });

exports.addRow = doc => data =>
  new Promise((resolve, reject) =>
    doc.addRow(1, data, (err, _) => (!err ? resolve() : reject(err)))
  );
