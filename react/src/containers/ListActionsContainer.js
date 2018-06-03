import { connect } from 'react-redux';
import ListActions from '../components/ListActions';
import { startCreateList, startEditList, removeList } from '../actions/lists';

function mapStateToProps(state) {
  const editing =
    state.lists.list && !state.lists.dirty
      ? state.lists.lists[state.lists.list].editing
      : false;
  return {
    list: state.lists.list,
    creating: state.lists.creating,
    editing,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    startCreateList: () => dispatch(startCreateList()),
    startEditList: () => dispatch(startEditList()),
    removeList: () => dispatch(removeList()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListActions);
