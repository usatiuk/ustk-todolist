import { faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import PropTypes from 'prop-types';
import { animated } from 'react-spring';

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
    this.setState({
      ...this.state,
      hover: true,
    });
  }
  onMouseOut() {
    this.setState({
      ...this.state,
      hover: false,
    });
  }

  startEdit() {
    this.setState({
      ...this.state,
      editing: true,
    });
  }
  stopEdit(value) {
    this.props.editTodo(value);
    this.setState({
      ...this.state,
      editing: false,
    });
  }

  render() {
    const deleteClasses = ['delete'];
    if (!this.state.hover) {
      deleteClasses.push('disabled');
    }

    const editClasses = ['edit'];
    if (!this.state.hover) {
      editClasses.push('disabled');
    }

    const todoClasses = ['todo'];
    if (this.props.todo.completed) {
      todoClasses.push('done');
    }

    if (this.state.editing) {
      let input;
      return (
        <animated.li style={this.props.style}>
          <button className="save" onClick={() => this.stopEdit(input.value)}>
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <div className={todoClasses.join(' ')}>
            <textarea
              className="todo--input"
              defaultValue={this.props.todo.text}
              ref={(node) => {
                input = node;
              }}
            />
          </div>
        </animated.li>
      );
    }
    return (
      <animated.li
        style={this.props.style}
        onMouseOver={this.onMouseOver}
        onFocus={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        onBlur={this.onMouseOut}
      >
        <button className={deleteClasses.join(' ')} onClick={this.props.removeTodo}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <button className={editClasses.join(' ')} onClick={this.startEdit}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button className={todoClasses.join(' ')} onClick={this.props.toggleTodo}>
          {this.props.todo.text}
        </button>
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
  style: PropTypes.shape({ maxHeight: PropTypes.number.isRequired }).isRequired,
};

export default Todo;
