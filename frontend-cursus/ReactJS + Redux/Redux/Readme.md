# Homework week 4

open `./react/week4/` in your prompt/shell/terminal.

Run the following: 
 - `npm install` - this will install all dependencies
 - `gulp` - this will start the build tool

You can now open the file `dist/index.html` in your browser.
Try to toggle the development tools in your browser and open the console. (generally right-click -> inspect)
The code resides in the `src` folder.

---

## Look around

At first walk a bit through the `src/components` folder. Recognize some components?
This App does not have a great code base, still it is difficult to follow the state change trail, we will fix this with redux.
Afterwards we will implement some extra functionality using redux.


---

## Setup

Let's initialize redux shall we?
Open then `index.jsx` file and add the following code:
```
import {Provider} from "react-redux";
import {createStore} from "redux";

const store = createStore();
```
Wrap the `<App />` with `<Provider store={store}> ... </Provider>`.

Refresh the browser, what kind of error message do you see?
Oke so `createStore();` expects a reducer function, let's create one. (`src/js/reducers/todos.jsx`)
```
const todosDefault = {
    todos: [
        {id: 1, todoName: "Todo 1", done: false},
        {id: 2, todoName: "Todo 2", done: false},
        {id: 3, todoName: "Todo 3", done: false}
    ]
};

export const todos = (state = todosDefault, action) => {
    switch (action.type) {

        default:
            return state;
    }
};
```
Couple things to notice, we have a default that we will use if the state is undefined.
Also the switch statement will only handle the default case.

We can now add the todo to the store:
```
import {todos} from "./reducers/todos";

const store = createStore(todos);
```

This should be enough to initialize the application with the default todos.
Add the following code to the `App` component:
```
import {connect} from "react-redux";
 
export default connect(
     state => ({todos: state.todos})
   )(class App extends Component {
            .....
    )
```
If you refresh the browser you will see the Todo items!
But what have we just done? Using the connect function we decorated the `App` class. 
This function gives us the opportunity to inject the state.todos.
This is obtained with the store.getState().

Let's recap we connected redux to react. We also injected the todos into the App component.


---

## Actions

Right now we initialize the application with the todos from redux, but when we remove an todo or add one, it is still done without redux.
Let's implement this.

Create the a file `src/js/actions/todos.jsx` with the following content:
```
export const createTodo = todoName => ({
    type: "CREATE_TODO",
    todoName
});
```

Now we need to dispatch this action to the reducer. We do that the following way:
```
//Add this import to the App
import * as todoTypes from "./../actions/todos";

//Change the Input component to the following:
<Input submitInput={todoName => this.props.dispatch(todoTypes.createTodo(todoName))}/>
```

Now we need to handle this change in the reducer as follows: 
```
case "CREATE_TODO":
    return {
        todos: [
            ...state.todos, 
            {id: Date.now(), todoName: action.todoName, done: false}]
    };
```
Remember, we are not(!) allowed to change the state or action in anyway, the only thing we are allowed to do is create a new state.

To make this really awesome we need our App component to only depend on the `this.props` and remove the `this.state`:
- Remove the constructor
- Make the render method start with: `render() { const {todos} = this.props; ... etc`

Test your changes, you should be able to view the todos and create new ones, unfortunately we cannot remove or change the status any more.


---

## Implementing remove and done

Add the following functions to the `actions/todos.jsx`.
```
export const removeTodo = todoId => ({
    type: "REMOVE_TODO",
    todoId
});

export const markTodo = (todoId, isDone) => ({
    type: "MARK_TODO",
    todoId,
    isDone
});

```

Add the following cases to the reducer:
```
case "MARK_TODO":
    const changedItems = state.todos.filter(todo => todo.id === action.todoId)
        .map(todo => {todo.done = action.isDone; return todo});
    const unchangedItems = state.todos.filter(todo => todo.id !== action.todoId);

    return { todos: [...changedItems, ...unchangedItems] };

case "REMOVE_TODO":
    return { todos: [...state.todos.filter(todo => todo.id !== action.todoId)] };
```
Notice how we are not directly manipulating the state but creating a new list with the map function.

Next up we dispatch the actions from the `App` component.
Change the `TodoItem` node in the App component as follows:
```
<TodoItem
    key={index}
    todo={todo}
    markTodo={(markedTodo, isDone) => this.props.dispatch(todoTypes.markTodo(markedTodo.id, isDone))                                    }
    removeTodo={removeTodo => this.props.dispatch(todoTypes.removeTodo(removeTodo.id))}
/>
```
Nice and clean one-liners :)
We only need to adjust the TodoItem a bit, change there the `handleTodoChange`: 
```
handleTodoChange(todo, toggle) {
    todo.done = toggle;
    this.props.markTodo(todo, toggle)
}
```

If you did everything alright the app should function properly again :)
We can now remove, mark, add and view the todos, but our state is in 1 place and immutable.
Right now it may seem overkill but as your application grows this will be a life-saver in maintaining sanity.


---
## Keeping the state

We are now using redux for our state, but every time we refresh our application we see the same dull todo items.
Let's hook redux up to localStorage.

First we need to subscribe to redux changes and put those changes in the store.
We do this by adding the following code beneath the createStore() in the `index.jsx` file.
```
store.subscribe(() => console.log(store.getState())); // Output the store for debugging purposes
store.subscribe(() => localStorage.todos = JSON.stringify(store.getState().todos));
```
Refresh the application and make some change, have a look at the localStorage in your browser. 
You should be able to see a new items called todos containing your todos :) 

Let's initialize redux with those items in order to maintain our state:
```
let data = {todos: []};
if (localStorage.todos) {
    data.todos = JSON.parse(localStorage.todos);
}

const store = createStore(todos, data);
```

BAM, your todo items should now be maintained.


---

## To Conclude

With this exercise we have implemented the following:
 - Use redux state instead of `this.state`
 - Made use of store, actions, reducers
 - Persisting state
 
This app can now easily be enriched with simple filters:
    - Only showing the marked/unmarked/all TodoItems
    - Add additional information to the TodoItem
    
It is not required to implement these features but highly recommended, as this gives you a better understanding of redux than just copy pasting.
