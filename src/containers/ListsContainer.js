import { connect } from 'react-redux';
import Lists from '../components/Lists';
import {
  changeList,
  removeList,
  addList,
  editList,
  startCreateList,
  startEditList,
} from '../actions/lists';

function mapStateToProps(state) {
  const editing = state.lists.lists[state.lists.list]
    ? state.lists.lists[state.lists.list].editing
    : false;
  return {
    lists: Object.values(state.lists.lists),
    listObjs: state.lists,
    list: state.lists.list,
    editing,
    creating: state.lists.creating,
    dirty: state.lists.dirty,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: list => dispatch(changeList(list)),
    addList: name => dispatch(addList(name)),
    removeList: id => dispatch(removeList(id)),
    editList: (id, name) => dispatch(editList(id, name)),
    startCreateList: () => dispatch(startCreateList()),
    startEditList: () => dispatch(startEditList()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
