const qs = require('query-string')
const fs = require('fs')
const gapi = require('googleapis')
const SPREADSHEET_ID = '183_RxQxm-g1XT46jYBJoDIenWGk6_1KBTkR9VyqSDLg'
const API_KEY = 'AIzaSyAoRVc-RE6OrMaGam91_CvJMIpKJIF0rUY'
const ACCESS_KEY_FILE = './accesskey.json'

const decode = str => qs.parse(str);

exports.handler = (event, context, callback) => {
  // gapi.auth.fromAPIKey(API_KEY, (err, jwt) => {
  // gapi.auth.fromJSON(JSON.parse())
  // console.log(JSON.stringify(jwt))

  // const decoded = decode(event.body);
  // decoded.attending = decoded.attending === 'true'

  // console.log(decoded)
  // callback(null, {
  //   body: JSON.stringify(decode(event.body))
  // })
  // })

  // const secret = JSON.parse(fs.readFileSync(ACCESS_KEY_FILE, 'utf-8'))
  // console.log(secret)
  // gapi.auth.fromJSON(secret, (err, data) => {
  gapi.auth.fromAPIKey(API_KEY, (err, data) => {
    console.log('err', err)
    console.log('secret', data.gToken())
    callback(null, { body: JSON.stringify("done") })
  })

}
