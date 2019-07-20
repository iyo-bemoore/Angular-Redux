import { ITodo } from './todo';
import {ADD_TODO,TOGGLE_TODO,REMOVE_TODO,REMOVE_ALL } from './actions'; 
 
export interface IAppState { 
   todos:ITodo[];
   lastUpdate: Date; 
};


export const INITIAL_STATE:IAppState = {
    todos:[],
    lastUpdate:null
}

export function rootReducer ( state:IAppState = INITIAL_STATE , action ) { 
   switch(action.type) {
       case ADD_TODO :
           action.todo.id = state.todos.length + 1;
           return Object.assign({} , state , { 
               todos : state.todos.concat(Object.assign({} , action.todo)),
               lastUpdate: new Date()
           });  
       case TOGGLE_TODO :
            const todo = state.todos.find(t => t.id === action.id);
            const index = state.todos.indexOf(todo);
            return Object.assign({},state , {
                todos : [
                    ...state.todos.slice(0,index),
                    Object.assign({}, todo , {isCompleted:!todo.isCompleted}),
                    ...state.todos.slice(index+1)
                ]
            }) 
       case REMOVE_TODO :
           Object.assign({} , state , {
               todos: state.todos.filter(t => t.id !== action.id),
               lastUpdate: new Date()
           })

       case REMOVE_ALL : 
       return Object.assign({} , state , {
           todos:[],
           lastUpdate: new Date()
       })

   }
   
   
    return state;

}