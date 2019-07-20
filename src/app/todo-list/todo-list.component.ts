import { Component, OnInit, ViewChild } from '@angular/core';
import { NgRedux , select } from '@angular-redux/store';
import { IAppState } from '../store';
import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from '../actions';
import { ITodo } from '../todo';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  @ViewChild('todoForm',{static:false}) formValues;

  @select() todos;
  
  model:ITodo = {
    id: 0,
    description: '',
    responsible: '',
    priority :   'low',
    isCompleted: false
  }
  constructor(private ngRedux:NgRedux<IAppState>) { }
  
  warningText:string ='';
  ngOnInit() {
  };

  onSubmit() {
    this.ngRedux.dispatch({type: ADD_TODO , todo: this.model });
    this.formValues.resetForm();
  };


  toggleTodo(todo) { 
    this.ngRedux.dispatch({type: TOGGLE_TODO , id: todo.id});
    this.warningText ='';
        
  };

  removeTodo(todo) { 
    if( todo.isCompleted) {
       this.ngRedux.dispatch({type: REMOVE_TODO, id: todo.id });
    } else { 
      this.warningText = 'Please complete the Task first'
    }
   
  };

  warningMessage() {
      return 'Please complete the task before deleting or contact your Admin' 
  }

 



}
