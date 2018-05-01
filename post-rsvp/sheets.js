const GoogleSpreadsheet = require('google-spreadsheet')

const SPREADSHEET_ID = process.env.SpreadsheetId
const CLIENT_EMAIL = process.env.GAuthClientEmail

// hack around lambda's inability to store env vars with newlines
// see https://forums.aws.amazon.com/thread.jspa?threadID=248843&tstart=0&messageID=790654#790654
const PRIVATE_KEY = process.env.GAuthPrivateKey.split('\\n').join('\n')

const creds = {
  client_email: CLIENT_EMAIL,
  private_key: PRIVATE_KEY
}

exports.authenticate = () =>
  new Promise((resolve, reject) => {
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID)
    doc.useServiceAccountAuth(
      creds,
      (err, _) => (!err ? resolve(doc) : reject(err))
    )
  })

exports.addRow = doc => data =>
  new Promise((resolve, reject) =>
    doc.addRow(1, data, (err, _) => (!err ? resolve() : reject(err)))
  )
