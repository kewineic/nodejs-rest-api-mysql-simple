const Attendance = require('../models/Attendance');

module.exports = app => {
  app.get('/atendimentos', (req, res) => {
    Attendance.list(res)
  });

  app.get('/atendimentos/:id', (req, res) => {
    const id = Number(req.params.id);
    Attendance.getId(id, res);
  });

  app.post('/atendimentos', (req, res) => {
    const attendance = req.body;

    Attendance.add(attendance, res);
  });

  app.patch('/atendimentos/:id', (req, res) => {
    const id = Number(req.params.id);
    const values = req.body;

    Attendance.update(id, values, res);
  });

  app.delete('/atendimentos/:id', (req, res) => {
    const id = Number(req.params.id);

    Attendance.delete(id, res);
  });
}
