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
    const editClasses = ['edit'];
    if (!this.state.hover) {
      deleteClasses.push('disabled');
      editClasses.push('disabled');
    }

    const todoClasses = ['todo'];
    if (this.props.todo.completed) {
      todoClasses.push('done');
    }

    let input;

    const text = this.state.editing ? (
      <div className={todoClasses.join(' ')}>
        <textarea
          className="todo--input"
          defaultValue={this.props.todo.text}
          ref={node => {
            input = node;
          }}
        />
      </div>
    ) : (
      <button className={todoClasses.join(' ')} onClick={this.props.toggleTodo}>
        {this.props.todo.text}
      </button>
    );
    const buttons = this.state.editing
      ? [
          <animated.button
            key="save"
            className="save"
            onClick={() => this.stopEdit(input.value)}
          >
            <FontAwesomeIcon icon={faCheck} />
          </animated.button>,
        ]
      : [
          <animated.button
            key="remove"
            className={deleteClasses.join(' ')}
            onClick={this.props.removeTodo}
          >
            <FontAwesomeIcon icon={faTrash} />
          </animated.button>,
          <animated.button
            key="edit"
            className={editClasses.join(' ')}
            onClick={this.startEdit}
          >
            <FontAwesomeIcon icon={faEdit} />
          </animated.button>,
        ];
    return (
      <animated.li
        style={this.props.style}
        onMouseOver={this.onMouseOver}
        onFocus={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        onBlur={this.onMouseOut}
      >
        {buttons}
        {text}
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
