import { connect } from 'react-redux';

import App from '../components/App';

import { loadUser } from '../actions/user';

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadUser: () => dispatch(loadUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
