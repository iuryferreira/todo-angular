import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Todo } from 'src/models/todo.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  todos : Todo[] = []
  form : FormGroup

  constructor (private formBuilder : FormBuilder) {
    this.form = this.formBuilder.group({
      text: ['', Validators.required]
    })
    this.load()
  }

  done (todo : Todo) {
    todo.done = true
    this.save()
  }

  undone (todo : Todo) {
    todo.done = false
    this.save()
  }

  add () {
    const text = this.form.controls.text.value
    this.todos.push(new Todo(this.todos.length + 1, text, false))
    this.save()
    this.clear()
  }

  remove (todo : Todo) {
    const index = this.todos.indexOf(todo)
    if (index !== -1) {
      this.todos.splice(index, 1)
    }
    this.save()
  }

  clear () {
    this.form.reset()
  }

  save () {
    const data = JSON.stringify(this.todos)
    localStorage.setItem('todos', data)
  }

  load () {
    const data = localStorage.getItem('todos')
    if (data) {
      this.todos = JSON.parse(data)
    } else {
      this.todos = []
    }
  }
}
