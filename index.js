const customExpress = require('./config/customExpress');
const connection = require('./db/connection')
const Tables = require('./db/Tables');

connection.connect((err) => {
  if (err) {
    console.log(err)
  } else {
    Tables.init(connection);
    const app = customExpress();

    app.listen(5000, console.log('Servidor rodando na porta 5000'));
  }
});

