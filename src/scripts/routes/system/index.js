import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import renderWithActions from '../../helpers/renderWithActions';
import { system as systemActions } from '../../actions';
import System from './system';

const mapStateToProps = (state, ownProps) => ({
  isFetchingUsers: state.system.isFetchingUsers,
  isFetchingClubs: state.system.isFetchingClubs,
  users: state.system.users,
  clubs: state.system.clubs,
  ...ownProps,
});

const mapDispatchToProps = {
  fetchAllUsers: systemActions.fetchAllUsers,
  fetchClubs: systemActions.fetchClubs,
  addClubAction: systemActions.addClub,
  editClubAction: systemActions.updateClub,
  addUserAction: systemActions.addUser,
  updateUserAction: systemActions.updateUser,
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  renderWithActions(['fetchAllUsers', 'fetchClubs'])
);

const MainComponent = enhance(System);

export default withRouter(MainComponent);
