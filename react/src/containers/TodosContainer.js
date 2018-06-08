import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Todos from '../components/Todos';

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default withRouter(connect(mapStateToProps)(Todos));
