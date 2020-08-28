module.exports = app => {
  app.get('/', (req, res) => {
    res.send({
      casa: {
        numero: 1
      }
    });
  });

  app.post('/', (req, res) => {
    console.log(req.body);
    res.send('YAAAY');
  });
}
