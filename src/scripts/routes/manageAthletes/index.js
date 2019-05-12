import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import renderWithActions from '../../helpers/renderWithActions';
import { athletes as athletesActions } from '../../actions';
import ManageAthletes from './manageAthletes';

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.athletes.managedAthletes.isFetching,
  athletes: state.athletes.managedAthletes.data,
  isEmpty: state.athletes.managedAthletes.data.length <= 0,
  ...ownProps,
});

const mapDispatchToProps = {
  getManagedAthletes: athletesActions.getManagedAthletes,
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  renderWithActions(['getManagedAthletes'])
);

const MainComponent = enhance(ManageAthletes);

export default withRouter(MainComponent);
