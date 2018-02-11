import React, {Component} from "react";
import TodoItem from "./TodoItem";
import Input from "./Input";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {id: 1, todoName: "Todo 1", done: false},
                {id: 2, todoName: "Todo 2", done: false},
                {id: 3, todoName: "Todo 3", done: false}
            ]
        }
    }

    render() {
        const {todos} = this.state;

        return (
            <div>
                <h1>Todo app</h1>

                <div>
                    <Input submitInput={todoName => this.setState({
                        todos: [...todos,
                            {id: todos.length + 1, todoName: todoName, done: false}]
                    })}/>

                    <ul className="list-group">
                        {todos.map(todo =>
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                markTodo={markedTodo => this.setState({
                                    todos: todos.map(todo => todo.id === markedTodo.id ? markedTodo : todo)
                                })}
                                removeTodo={removeTodo => this.setState({todos: todos.filter(todo => todo.id !== removeTodo.id)})}
                            />)}
                    </ul>
                </div>
            </div>
        )
    }
}