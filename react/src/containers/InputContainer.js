import { connect } from 'react-redux';

import Input from '../components/Input';
import { addTodo } from '../actions/todos';

function mapDispatchToProps(dispatch) {
  return {
    onClick: text => dispatch(addTodo(text)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(Input);
