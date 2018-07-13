import { connect } from 'react-redux';

import Input from '../components/Input';
import { addTodo } from '../actions/todos';

function mapStateToProps(state, ownProps) {
  return { ...ownProps };
}

function mapDispatchToProps(dispatch) {
  return {
    onClick: text => dispatch(addTodo(text)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Input);
