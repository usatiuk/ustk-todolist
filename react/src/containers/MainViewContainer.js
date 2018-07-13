import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MainView from '../components/MainView';

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default withRouter(connect(mapStateToProps)(MainView));
