import { connect } from 'react-redux';
import Selector from '../components/Selector';
import { changeList, addList, editList } from '../actions/lists';

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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: list => dispatch(changeList(list)),
    addList: name => dispatch(addList(name)),
    editList: (id, name) => dispatch(editList(id, name)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Selector);
