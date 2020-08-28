const moment = require('moment')
const connection = require('../db/connection');

class Attendance {
  add(atendimento, res) {
    const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

    const dataIsValid = moment(data).isSameOrAfter(dataCriacao)
    const clienteIsValid = atendimento.cliente.length >= 5

    const validations = [
      {
        nome: 'data',
        valido: dataIsValid,
        mensagem: 'Data deve ser maior ou igual a data atual'
      },
      {
        nome: 'cliente',
        valido: clienteIsValid,
        mensagem: 'Cliente deve ter pelo menos cinco caracteres'
      }
    ]

    const errors = validations.filter(campo => !campo.valido)
    const existsErrors = errors.length

    if (existsErrors) {
      res.status(400).json(errors)
    } else {
      const atendimentoDatado = { ...atendimento, dataCriacao, data }

      const sql = 'INSERT INTO Atendimentos SET ?'

      connection.query(sql, atendimentoDatado, (err, result) => {
        if (err) {
          res.status(400).json(err)
        } else {
          res.status(201).json(atendimento)
        }
      })
    }

  }

  list(res){
    const sql = 'SELECT * FROM Atendimentos'
  
    connection.query(sql, (err, result) => {
      if(err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  }

  getId(id, res){
    const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

    connection.query(sql, (err, result) => {
      const uniqueAttendanceObject = result[0];

      if(err){
        res.status(400).json(err);
      } else {
        res.status(200).json(uniqueAttendanceObject);
      }
    });
  }

  update(id, values, res){
    if(values.data){
      values.data = moment(values.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
    }

    const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

    connection.query(sql, [
      values,
      id
    ], (err, result) => {
      if(err){
        res.status(400).json(err);
      }else{
        res.status(200).json(result);
      }
    });
  }
}

module.exports = new Attendance; 