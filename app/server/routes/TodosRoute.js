const { Router } = require('express')
const { TodosController } = require('../controllers/TodosController')

const router = Router()

router.get('/', (_, res) => {
  const todos = TodosController.getAll()

  res.status(200).json({ status: 'ok', todoItems: todos })
})

router.post('/update/:id', (req, res) => {
  const id = req.params.id
  const nextIsChecked = false

  const updateStatus = TodosController.updateTodo({ id, nextIsChecked })

  const requestResult = {
    status: updateStatus
  }

  res.status(200).json(requestResult)
})

router.delete('/delete/:id', (req, res) => {
  const id = req.params.id

  const deleteStatus = TodosController.deleteTodo({ id })

  const requestResult = {
    status: deleteStatus
  }

  res.status(200).json(requestResult)
})

router.post('/add', (_, res) => {
  const label = 'ОСТОРОЖНЕЕ БЛИН'
  const addResult = TodosController.addTodo({ label })

  res.status(200).json(addResult)
})

module.exports = {
  todosRouter: router
}
