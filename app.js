const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app
  .get('/', require('./routes/index'))
  .post('/', require('./routes/index'))
  .post('/:id', require('./routes/index'))

app.listen(3000, () => {
  console.log('------------------')
})
