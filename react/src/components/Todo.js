import * as React from 'react';
import PropTypes from 'prop-types';
import { animated } from 'react-spring';
import { ButtonBase } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';

const icon = {
  fontSize: 24,
  padding: 0,
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

    let input;

    const text = this.state.editing ? (
      <div className="todo">
        <textarea
          className="todo--input"
          defaultValue={this.props.todo.text}
          ref={node => {
            input = node;
          }}
        />
      </div>
    ) : (
      <ButtonBase
        style={{
          justifyContent: 'left',
          paddingLeft: '1.5rem',
          borderTop: '1px solid #f0f0f0',
          textDecoration: this.props.todo.completed ? 'line-through' : 'none',
          color: this.props.todo.completed ? '#888888' : 'black',
        }}
        className="todo"
        onClick={this.state.hover ? this.props.toggleTodo : null}
      >
        {this.props.todo.text}
      </ButtonBase>
    );
    const ButtonBases = this.state.editing
      ? [
          <ButtonBase
            key="save"
            style={{ backgroundColor: 'lightgreen' }}
            className="save"
            onClick={() => this.stopEdit(input.value)}
          >
            <CheckIcon style={icon} />
          </ButtonBase>,
        ]
      : [
          <ButtonBase
            key="remove"
            style={{ backgroundColor: 'pink' }}
            className={deleteClasses.join(' ')}
            onClick={this.props.removeTodo}
          >
            <DeleteIcon style={icon} />
          </ButtonBase>,
          <ButtonBase
            key="edit"
            style={{ backgroundColor: 'lightcyan' }}
            className={editClasses.join(' ')}
            onClick={this.startEdit}
          >
            <EditIcon style={icon} />
          </ButtonBase>,
        ];
    return (
      <animated.li
        style={this.props.style}
        onMouseOver={this.onMouseOver}
        onFocus={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        onBlur={this.onMouseOut}
      >
        {ButtonBases}
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
