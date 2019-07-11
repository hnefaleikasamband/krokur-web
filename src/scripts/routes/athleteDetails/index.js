import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import renderWithActions from '../../helpers/renderWithActions';
import AthleteDetails from './athleteDetails';

const mapStateToProps = (state, ownProps) => ({
  usersData: state.system.users,
  clubsData: state.system.clubs,
  ...ownProps,
});

const mapDispatchToProps = {
  //fetchAllUsers: systemActions.fetchAllUsers,
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  renderWithActions([])
);

const MainComponent = enhance(AthleteDetails);

export default withRouter(MainComponent);
