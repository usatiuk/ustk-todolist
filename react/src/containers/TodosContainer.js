import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Todos from '../components/Todos';

import { loadLists } from '../actions/lists';

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadLists: () => dispatch(loadLists()),
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Todos),
);
