import { connect } from 'react-redux';
import Selector from '../components/Selector';
import { changeList } from '../actions';

function mapStateToProps(state) {
  const { list } = state.lists;
  if (!list) {
    return {
      lists: [],
      list: '',
      dirty: state.lists.dirty,
    };
  }
  return {
    lists: Object.values(state.lists.lists),
    list: state.lists.list,
    dirty: state.lists.dirty,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: list => dispatch(changeList(list)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Selector);
