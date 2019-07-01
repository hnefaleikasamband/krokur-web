import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import renderWithActions from '../../helpers/renderWithActions';
import { athletes as athletesActions, system as systemActions } from '../../actions';
import ManageAthletes from './manageAthletes';

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.athletes.managedAthletes.isFetching,
  athletes: state.athletes.managedAthletes.data,
  clubsData: state.system.clubs,
  isEmpty: state.athletes.managedAthletes.data.length <= 0,
  ...ownProps,
});

const mapDispatchToProps = {
  getManagedAthletes: athletesActions.getManagedAthletes,
  fetchClubs: systemActions.fetchClubs,
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  renderWithActions(['getManagedAthletes', 'fetchClubs'])
);

const MainComponent = enhance(ManageAthletes);

export default withRouter(MainComponent);
