const express = require('express')
const { loadNuxt } = require('nuxt')
const { todosRouter } = require('./routes')

const PORT = 3000

const app = express()
app.use('/api/todo_list', todosRouter)
app.use(express.json())
const start = async () => {
  const nuxt = await loadNuxt('start')
  app.use(nuxt.render)

  app.listen(PORT, () => {
    console.log('server start on', PORT)
  })
}

start()
