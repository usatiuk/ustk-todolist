import { connect } from 'react-redux';
import UserHeader from '../components/UserHeader';

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(UserHeader);
