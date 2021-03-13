import * as React from "react";
import PropTypes from "prop-types";
import { animated } from "react-spring/renderprops";
import { ButtonBase } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";

const icon = {
    fontSize: 24,
    padding: 0,
};
const disabledAction = {
    backgroundColor: "#fafafa",
    color: "#dddddd",
};

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
        };
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.startEdit = this.startEdit.bind(this);
        this.stopEdit = this.stopEdit.bind(this);
    }

    onMouseOver() {
        const { state } = this;
        this.setState({
            ...state,
            hover: true,
        });
    }

    onMouseOut() {
        const { state } = this;
        this.setState({
            ...state,
            hover: false,
        });
    }

    startEdit() {
        const { state } = this;
        this.setState({
            ...state,
            editing: true,
        });
    }

    stopEdit(value) {
        const { editTodo } = this.props;
        editTodo(value);
        const { state } = this;
        this.setState({
            ...state,
            editing: false,
            hover: false,
        });
    }

    render() {
        const deleteClasses = ["delete"];
        const editClasses = ["edit"];
        const { hover, editing } = this.state;
        const { todo, removeTodo, toggleTodo, style } = this.props;
        if (!hover) {
            deleteClasses.push("disabled");
            editClasses.push("disabled");
        }

        let input;

        const text = editing ? (
            <div className="todo">
                <textarea
                    className="todo--input"
                    defaultValue={todo.text}
                    ref={(node) => {
                        input = node;
                    }}
                />
            </div>
        ) : (
            <ButtonBase
                style={{
                    justifyContent: "left",
                    paddingLeft: "1rem",
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "#888888" : "black",
                }}
                className="todo"
                onClick={() => {
                    toggleTodo();
                }}
            >
                {todo.text}
            </ButtonBase>
        );
        const ButtonBases = editing
            ? [
                  <ButtonBase
                      key="save"
                      style={{ backgroundColor: "lightgreen" }}
                      className="save"
                      onClick={() => this.stopEdit(input.value)}
                  >
                      <CheckIcon style={icon} />
                  </ButtonBase>,
              ]
            : [
                  <ButtonBase
                      key="remove"
                      style={
                          hover ? { backgroundColor: "pink" } : disabledAction
                      }
                      className={deleteClasses.join(" ")}
                      onClick={removeTodo}
                  >
                      <DeleteIcon style={icon} />
                  </ButtonBase>,
                  <ButtonBase
                      key="edit"
                      style={
                          hover
                              ? { backgroundColor: "lightcyan" }
                              : disabledAction
                      }
                      className={editClasses.join(" ")}
                      onClick={this.startEdit}
                  >
                      <EditIcon style={icon} />
                  </ButtonBase>,
              ];
        return (
            <animated.li
                style={{
                    ...style,
                    borderTop: "1px solid #f0f0f0",
                }}
                onMouseOver={this.onMouseOver}
                onFocus={this.onMouseOver}
                onMouseOut={this.onMouseOut}
                onBlur={this.onMouseOut}
            >
                {text}
                {ButtonBases}
            </animated.li>
        );
    }
}

Todo.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    }).isRequired,
    removeTodo: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    style: PropTypes.shape({ height: PropTypes.object.isRequired }).isRequired,
};

export default Todo;
