import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { user as userActions } from '../../actions';
import Navigation from './navigation';

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  logout: userActions.logout,
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

const MainComponent = enhance(Navigation);
export default withRouter(MainComponent);
