import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import PropTypes from 'prop-types';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }
  onMouseOver() {
    this.setState({
      hover: true,
    });
  }

  onMouseOut() {
    this.setState({
      hover: false,
    });
  }
  render() {
    const deleteClasses = ['delete'];
    if (!this.state.hover) {
      deleteClasses.push('disabled');
    }

    const todoClasses = ['todo'];
    if (this.props.todo.completed) {
      todoClasses.push('done');
    }

    return (
      <li
        onMouseOver={this.onMouseOver}
        onFocus={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        onBlur={this.onMouseOut}
      >
        <div className={deleteClasses.join(' ')} onClick={this.props.handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </div>
        <div className={todoClasses.join(' ')} onClick={this.props.onClick}>
          {this.props.todo.text}
        </div>
      </li>
    );
  }
}

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Todo;
