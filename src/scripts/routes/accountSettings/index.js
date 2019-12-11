import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AccountSettings from './accountSettings';

const mapStateToProps = (state, ownProps) => ({
  isFetchingUser: state.isFetchingUser,
  user: state.user,
  clubs: state.system.clubs,
  ...ownProps,
});

const mapDispatchToProps = {};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default withRouter(enhance(AccountSettings));
