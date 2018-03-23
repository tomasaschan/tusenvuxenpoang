const sheets = require("./sheets");

exports.handler = (event, context, callback) => {
  const data = JSON.parse(event.body);
  sheets
    .authenticate()
    .then(doc => {
      const lines = data.names
        .map(name => ({
          Namn: name,
          Kommer: data.attending,
          Granhedsgården: data.staying,
          Mat: data.foods
        }))
        .map(sheets.addRow(doc));
      return Promise.all(lines);
    })
    .then(() =>
      callback(null, {
        body: "OK",
        statusCode: 200
      })
    )
    .catch(callback);
};
