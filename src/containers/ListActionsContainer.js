import { connect } from 'react-redux';
import ListActions from '../components/ListActions';
import { startCreateList, startEditList, removeList } from '../actions/lists';

function mapStateToProps(state) {
  return {
    list: state.lists.list,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    startCreateList: () => dispatch(startCreateList()),
    startEditList: () => dispatch(startEditList()),
    removeList: () => dispatch(removeList()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListActions);
