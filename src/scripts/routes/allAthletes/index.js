import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import renderWithActions from '../../helpers/renderWithActions';
import { athletes as athletesActions } from '../../actions';
import AllAthletes from './allAthletes';

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.athletes.allAthletes.isFetching,
  athletes: state.athletes.allAthletes.data,
  isEmpty: state.athletes.allAthletes.data.length <= 0,
  ...ownProps,
});

const mapDispatchToProps = {
  getAllAthletes: athletesActions.getAllAthletes,
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  renderWithActions(['getAllAthletes'])
);

const MainComponent = enhance(AllAthletes);

export default withRouter(MainComponent);
