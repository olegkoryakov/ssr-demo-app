class TodosController {
  static getAll () {
  // emmited data base request
    const DATA_MOCK = [
      {
        isChecked: false,
        label: 'am blue labudi labudai1',
        id: 1
      },
      {
        isChecked: false,
        label: 'am blue labudi labudai2',
        id: 2
      },
      {
        isChecked: false,
        label: 'am blue labudi labudai3',
        id: 3
      }
    ]

    return DATA_MOCK
  }

  static updateTodo ({ id, nextIsChecked }) {
    // emmited DB update status
    const status = 'ok'

    return status
  }

  static deleteTodo ({ id }) {
    // emmited DB delete status
    const status = 'ok'

    return status
  }

  static addTodo ({ label }) {
    const nextTodo = {
      label,
      isChecked: false,
      id: 5
    }

    // emmited DB add todo
    return {
      status: 'ok',
      nextTodo
    }
  }
}

module.exports = {
  TodosController
}
