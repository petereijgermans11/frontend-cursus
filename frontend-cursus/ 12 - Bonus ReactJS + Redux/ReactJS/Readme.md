# Homework week 3

open `./react/week3/` in your prompt/shell/terminal.

Run the following: 
 - `npm install` - this will install all dependencies
 - `gulp` - this will start the build tool

You can now open the file `dist/index.html` in your browser.
Try to toggle the development tools in your browser and open the console. (generally right-click -> inspect)
The code resides in the `src` folder.


---
## Jsx

Start by looking at the `index.html` file and the `index.jsx` file.

Let's first do something easy, lets style the list a bit.

Replace:
```
<ul>
    <li>Todo 1</li>
    <li>Todo 2</li>
    <li>Todo 3</li>
</ul>
```
With: 
```
<ul className="list-group">
    <li className="list-group-item">Todo 1</li>
    <li className="list-group-item">Todo 2</li>
    <li className="list-group-item">Todo 3</li>
</ul>

```

That already looks much better. Notice that we are not useing class="", but className="". Try using class="", your browser will not be happy :)

We also would like to add Todo's, but right now, there is no input. Let's add that aswell.
Paste this jsx in between the `<div>` and the `<ul>`:
```
<div className="input-group">
    <input type="text" className="form-control" placeholder="Your new todo item..."/>
    <span className="input-group-btn">
        <button className="btn btn-success" type="button">Add todo</button>
    </span>
</div>

```

Just refresh the browser, how does it look? Looks like we have a the html we need. Let's go for some react logic!





---
## Components

Hmmm, looking at the code we now have I'm starting to think we should split the first render code and the html.
Let's say into an App component.

Create in the `src/js` folder a new file called `App.jsx`.
Place into that file the following code:
```
import React, {Component} from "react";

export default class App extends Component {
    
    render() {
        return (
            <!-- place here all the jsx you had in the ReactDom.render function -->
        )
    }
}
```

Notice that the import now also includes {Component}. Great now we have an App component! But this on its own does nothing.

Let's use this App component in the `index.jsx` file:
```
ReactDOM.render(
    <App />
    , document.getElementById('week3'));
```

What does the browser tell you on the console? Dang, we forgot to import our created App. Let's do that with the following:
```
import App from "./App";
```
Everything is alright again!

Let's do the same thing for the list items, they clearly need there own components aswell.
Create an `TodoItem.jsx` file in `/src/js` with the followning:
```
import React, {Component} from "react";

export default class TodoItem extends Component {

    render() {
        return (
            <li className="list-group-item">
                Todo 1
            </li>
        )
    }
}
```

Right, hook it up into the App component in the `App.jsx`:
```
//Do not forget the import!

<ul className="list-group">
    <TodoItem/>
    <TodoItem/>
    <TodoItem/>
</ul>
```

Right, we have our components, lets add some functionality!


---
## this.state

Oke, we have components, we have jsx, but we have zero functionality, we need to change that!

We will start with adding and onClick implementation to our `button` element in the `App.jsx`:
```
<button
    className="btn btn-success"
    type="button"
    onClick={e => console.log("I was clicked!")}>
    Add todo
</button>
```
Cool, when I click the button 'Add todo' I get something in my console in the browser.
Instead of merely logging we need to get the value of the input field and put it in the `App` state.

Add the following property to the `input` element:
```
ref={node => this.addTodoInput = node}
```
Great now we can interact with the input node through the `this.addTodoInput` node.
Use this be changing your `onClick` function in the button:
```
onClick={e => console.log(this.addTodoInput.value)}>
```
Now we can log the value of the input. Hook it up to the state of the App component!
First implement the constructor:
```
constructor(props) {
    super(props);
    this.state = {
        todos: [
            {todoName: "Todo 1"},
            {todoName: "Todo 2"},
            {todoName: "Todo 3"}
        ]
    }
}
```
And then change the onClick function:
```
onClick={e => this.setState({
    todos: [
        ...this.state.todos,
        {todoName: this.addTodoInput.value}]
})}
```
Recap: we initialize our App component with todos in this.state.
When the button is clicked we retrieve the value of the input node and add it to the todos via the setState and the Array spread operator.

But... I'm not seeing anything :(
Let's fix that with changing what we render in the `ul` element:
```
<ul className="list-group">
    {this.state.todos.map(todo => <TodoItem />)}
</ul>
```
Because JSX/React is just plain javascript we can just use the Array.map function.
If you press the "Add todo" button, new elements will be added!

---
## this.props

The TodoItems that are added generate error's in the console log, o dear!
```
bundle.js:1157 Warning: Each child in an array or iterator should have a unique "key" prop. Check the render method of `App`. See https://fb.me/react-warning-keys for more information.
    in TodoItem (created by App)
    in App
```
This happens because React is not able to find the distinction between each TodoItem element.
Adding the prop `key` the following way fixes it: `<TodoItem key={todo.todoName}/>`
But we are not yet seeing our Todo name.

We need to fix that by passing props to the `TodoItem`.
Add the props `name` with the value `todo.todoName` in much the same way as the key.

The TodoItem itself also needs to be changed. Put the following in the render method and refresh your browser:
```
render() {
    return (
        <li className="list-group-item">
            {this.props.name}
        </li>
    )
}
```

Try adding a todo. See it's added!

---
## More functionality

Our little app is becoming more awesome with each add line of code.
But we can do much more, for start we need to mark an todo as 'done'

Add the following to `li` in the `TodoItem`:
```
<span 
    className="btn btn-info small-button" 
    onClick={e => this.props.markTodoAsDone(this.props.name)}>
    Done
</span>
```

We have already added a `this.props.markTodoAsDone` property. This will be a function that we give the todoName.
Let's implement that function in the `App` component:
```
<TodoItem
    key={todo.todoName}
    name={todo.todoName}
    isDone={todo.done}
    markTodoAsDone={name => {
        const todos = this.state.todos.map(todo => {
            if (todo.todoName === name) {
                todo.done = true;
            }
            return todo
        });
        this.setState({todos})
    }}
/>
```
Great, we are searching for the relevant todos and marking them done. The `done` property we give to the `TodoItem` with `isDone`.
Let's change the TodoItem's render method:
```
<li className={`list-group-item ${this.props.isDone ? 'disabled' : ''}`}>
    {this.props.name}

    {!this.props.isDone &&
    <span
        className="btn btn-info small-button"
        onClick={e => this.props.markTodoAsDone(this.props.name)}>
        Done
    </span>
    }
</li>
```

Note the `{!this.props.isDone && ...}`, we are doing it this way because we are in a JSX context. It is not able to handle if statements.
[Conditionals in React](https://facebook.github.io/react/docs/jsx-in-depth.html)

---
## To Conclude

You have created an app that can: show todo items, add todo items, mark todo items as done.

Some suggestions you can implement to make this application better:
- Removing a TodoItem
- Mark a Todo based on an id instead of name
- Refactor the input element into it's own component, with input validation (do not allow "" as a value)
- Move the TodoItems that are done down in the list ordering

Although doing this is optional, it is recommended to implement at least one feature. 
This will help you understand the code better instead of simply copy pasting :) 



Maintaining the state of this application will be discussed next week with Redux.