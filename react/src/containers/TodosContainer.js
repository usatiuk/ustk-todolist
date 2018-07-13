import { connect } from 'react-redux';

import Todos from '../components/Todos';

function mapStateToProps(state) {
  return {
    list: Boolean(state.lists.list),
  };
}

export default connect(mapStateToProps)(Todos);
