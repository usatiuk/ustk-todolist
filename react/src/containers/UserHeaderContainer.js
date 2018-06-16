import { connect } from 'react-redux';
import UserHeader from '../components/UserHeader';
import { fetchLists } from '../actions/lists';

function mapStateToProps(state) {
  return {
    user: state.user,
    dirtyLists: state.lists.dirty,
    dirtyTodos: state.todos.dirty,
    fetchingLists: state.lists.fetching,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchLists: () => dispatch(fetchLists()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserHeader);
