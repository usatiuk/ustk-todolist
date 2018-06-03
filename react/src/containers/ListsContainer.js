import { connect } from 'react-redux';
import Lists from '../components/Lists';

function mapStateToProps(state) {
  return {
    userLoaded: state.user.loaded,
    listsLoaded: state.lists.loaded,
  };
}

export default connect(mapStateToProps)(Lists);
