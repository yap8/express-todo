require('dotenv').config()

const app = require('express')
const mysql = require('mysql')
const router = app.Router()

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
})

router.get('/', (req, res) => {
  const query = `SELECT * FROM todos`

  connection.query(query, (err, result) => {
    if (err) console.log(err)

    res.render('pages/index', { result  })
  })
})

router.post('/', (req, res) => {
  const query = `INSERT INTO todos (title) VALUES ('${req.body.title}')`

  connection.query(query, err => {
    if (err) console.log(err)

    res.redirect('/')
  })
})

router.post('/:id', (req, res) => {
  if (req.body.action === 'update') {
    const query = `UPDATE todos SET title = '${req.body.title}' WHERE id = '${req.params.id}'`
  
    connection.query(query, err => {
      if (err) console.log(err)
      
      res.redirect('/')
    })
  } else if (req.body.action === 'delete') {
    const query = `DELETE FROM todos WHERE id = '${req.params.id}'`
  
    connection.query(query, err => {
      if (err) console.log(err)
      
      res.redirect('/')
    })
  }
})

module.exports = router
