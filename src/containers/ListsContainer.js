import { connect } from 'react-redux';
import Lists from '../components/Lists';
import { changeList, removeList, addList } from '../actions';

function mapStateToProps(state) {
  return {
    lists: Object.values(state.lists.lists),
    list: state.lists.list,
    dirty: state.lists.dirty,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: list => dispatch(changeList(list)),
    addList: name => dispatch(addList(name)),
    removeList: id => dispatch(removeList(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
