<template>
  <div class="todo-list">
    <Loader v-if="isLoading" />
    <h2
      class="todo-list__title"
    >
      Список задач
    </h2>

    <form
      class="todo-list__next-todo"
      @submit="onAddTodoClick"
    >
      <div class="todo-list__next-todo-input">
        <Input
          id="next-todo-item-input"
          :value="nextTodoItemValue"
          :on-change="updateNextTodoItemValue"
          label="Следующая задача:"
        />
      </div>
      <div class="todo-list__next-todo-add">
        <Button
          theme="add"
          type="submit"
        />
      </div>
    </form>
    <ul
      class="todo-list__list"
    >
      <li
        v-for="checkbox in checkboxes"
        :key="checkbox.id"
        class="todo-list__item"
      >
        <Checkbox
          :id="checkbox.id"
          :is-checked="checkbox.isChecked"
          :label="checkbox.label"
          :on-change="onCheckboxChange({
            id: checkbox.id
          })"
          :line-through="checkbox.isChecked"
        />
        <Button
          :action="onRemoveButtonClick({
            id: checkbox.id
          })"
          theme="remove"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import Button from '../components/Button'
import Checkbox from '../components/Checkbox'
import Input from '../components/Input'
import Loader from '../components/Loader'

export default Vue.extend({
  name: 'TodosPage',
  components: {
    Button,
    Checkbox,
    Input,
    Loader
  },
  data () {
    return {
      checkboxes: [],
      isLoading: false,
      nextTodoItemValue: '',
      apiLink: 'http://localhost:3000/api/todo_list'
    }
  },
  mounted () {
    this.fetchTodoList()
  },
  methods: {
    async fetchTodoList () {
      this.isLoading = true
      const response = await fetch(`${this.apiLink}`)
      if (response.ok) {
        const json = await response.json()
        if (json.status === 'ok') {
          this.checkboxes = json.todoItems || []
        }
      }
      this.isLoading = false
    },
    async deleteTodoItem (id) {
      this.isLoading = true
      const response = await fetch(`${this.apiLink}/delete/${id}`, { method: 'DELETE' })
      if (response.ok) {
        const json = await response.json()
        this.isLoading = false
        if (json.status === 'ok') {
          return json.status
        }
      }
      this.isLoading = false

      return null
    },
    async updateIsChecked (id, nextIsChecked) {
      this.isLoading = true
      const formData = new FormData()
      formData.append('isChecked', nextIsChecked)

      const response = await fetch(`${this.apiLink}/update/${id}`, { method: 'POST', body: formData })
      if (response.ok) {
        const json = await response.json()
        this.isLoading = false
        if (json.status === 'ok') {
          return json.status
        }
      }
      this.isLoading = false

      return null
    },
    async addTodoItem ({ label, nextIsChecked }) {
      this.isLoading = true
      const formData = new FormData()
      formData.append('isChecked', nextIsChecked)
      formData.append('label', label)

      const response = await fetch(`${this.apiLink}/add`, { method: 'POST', body: formData })
      if (response.ok) {
        const json = await response.json()
        this.isLoading = false
        if (json.status === 'ok') {
          return { status: json.status, id: json.nextTodo.id }
        }
      }
      this.isLoading = false

      return null
    },
    onCheckboxChange ({ id }) {
      return async () => {
        if (id) {
          const checkboxIndex = this.checkboxes.findIndex(checkbox => checkbox.id === id)
          if (checkboxIndex !== -1) {
            const nextIsChecked = !this.checkboxes[checkboxIndex].isChecked

            const status = await this.updateIsChecked(id, nextIsChecked)

            if (status === 'ok') {
              this.checkboxes[checkboxIndex].isChecked = nextIsChecked
            }
          }
        }
      }
    },
    onRemoveButtonClick ({ id }) {
      return async () => {
        if (id) {
          const status = await this.deleteTodoItem(id)
          if (status === 'ok') {
            this.checkboxes = this.checkboxes.filter(checkbox => checkbox.id !== id)
          }
        }
      }
    },
    async onAddTodoClick (evt) {
      evt.preventDefault()
      if (this.nextTodoItemValue) {
        const result = await this.addTodoItem({ label: this.nextTodoItemValue, nextIsChecked: false })
        if (result && result.status === 'ok' && result.id) {
          this.checkboxes = [...this.checkboxes, { isChecked: false, id: result.id, label: this.nextTodoItemValue }]
        }
      }
      this.nextTodoItemValue = ''
    },
    updateNextTodoItemValue (nextValue) {
      this.nextTodoItemValue = nextValue
    }
  }
})
</script>

<style>
  .todo-list__title {
    margin: 0;

    margin-bottom: 34px;
  }

  .todo-list__next-todo {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 34px;
  }

  .todo-list__next-todo-input {
    width: 100%;
  }

  .todo-list__list {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .todo-list__item {
    display: flex;
    border-bottom: 3px solid rgba(38, 38, 43, .6);
  }

  * {
  box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;
    white-space: nowrap;
    clip-path: inset(100%);
    clip: rect(0 0 0 0);
    overflow: hidden;
  }
</style>
