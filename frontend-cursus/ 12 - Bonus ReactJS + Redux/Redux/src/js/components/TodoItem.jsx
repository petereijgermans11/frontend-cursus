import React, {Component} from "react";

export default class TodoItem extends Component {

    handleTodoChange(todo, toggle) {
        todo.done = toggle;
        this.props.markTodo(todo)
    }

    renderChangeTodo(label, todo, toggle) {
        return <span
            className="btn btn-info small-button"
            onClick={() => this.handleTodoChange(todo, toggle)}>
            {label}
        </span>
    }

    render() {
        const {todo} = this.props;

        return (
            <li className={`list-group-item ${todo.done ? 'disabled' : ''}`}>
                {todo.todoName}

                {todo.done == false &&
                    this.renderChangeTodo("Done", todo, true) }

                {todo.done == true &&
                this.renderChangeTodo("Not Done", todo, false) }

                <span
                    className="btn btn-danger small-button"
                    onClick={() => this.props.removeTodo(todo)}>
                    Remove
                </span>
            </li>
        )
    }
}