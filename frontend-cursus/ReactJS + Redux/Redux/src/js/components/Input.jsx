import React, {Component} from "react";

export default class Input extends Component {

    handleSubmit() {
        if (this.input.value != "") {
            this.props.submitInput(this.input.value)
        }
    };

    render() {
        return (
            <div className="input-group">
                <input
                    ref={node => this.input = node}
                    type="text"
                    className="form-control"
                    placeholder="Your new todo item..."
                />

                <span className="input-group-btn">
                    <button
                        className="btn btn-success"
                        type="button"
                        onClick={this.handleSubmit.bind(this)}>
                        Add todo
                    </button>
                </span>
            </div>
        )
    }
}