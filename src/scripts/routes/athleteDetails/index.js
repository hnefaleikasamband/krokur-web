import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import renderWithActions from '../../helpers/renderWithActions';
import AthleteDetails from './athleteDetails';
import { athletes as athletesActions } from '../../actions';

const mapStateToProps = (state, ownProps) => ({
  isFetchingAthlete: state.athletes.isFetchingAthlete,
  isFetchingBouts: state.athletes.isFetchingAthleteBouts,
  athlete: state.athletes.athlete,
  isAdmin: state.user.userInfo.role === 'ADMIN',
  bouts: state.athletes.athleteBouts,
  ...ownProps,
});

const mapDispatchToProps = (dispatch, props) => {
  const { athleteId } = props.match.params;
  const hasAthleteId = typeof athleteId !== 'undefined';

  return {
    getAllAthletes: athletesActions.getAllAthletes,
    getAthlete: () => {
      if (hasAthleteId) {
        dispatch(athletesActions.getAthlete(athleteId));
      }
    },
    getAthleteBouts: () => {
      if (hasAthleteId) {
        dispatch(athletesActions.getAthleteBouts(athleteId));
      }
    },
  };
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  renderWithActions(['getAthlete', 'getAthleteBouts'])
);

const MainComponent = enhance(AthleteDetails);

export default withRouter(MainComponent);
