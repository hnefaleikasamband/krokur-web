import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import renderWithActions from '../../helpers/renderWithActions';
import AthleteDetails from './athleteDetails';
import { athletes as athletesActions, system as systemActions } from '../../actions';

const mapStateToProps = (state, ownProps) => ({
  isFetchingAthlete: state.athletes.isFetchingAthlete,
  isFetchingBouts: state.athletes.isFetchingAthleteBouts,
  athlete: state.athletes.athlete,
  athletes: state.athletes.allAthletes,
  isAdmin: state.user.userInfo.role === 'ADMIN',
  bouts: state.athletes.athleteBouts,
  clubs: state.system.clubs,
  ...ownProps,
});

const mapDispatchToProps = (dispatch, props) => {
  const { athleteId } = props.match.params;
  const hasAthleteId = typeof athleteId !== 'undefined';

  return {
    getAllAthletes: () => dispatch(athletesActions.getAllAthletes()),
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
    getClubs: (componentProps) =>
      componentProps.clubs.length === 0 && dispatch(systemActions.fetchClubs()),
    addBoutForAthlete: (bout) => dispatch(athletesActions.addBoutForAthlete(bout)),
  };
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  renderWithActions(['getAllAthletes', 'getAthlete', 'getAthleteBouts', 'getClubs'])
);

const MainComponent = enhance(AthleteDetails);

export default withRouter(MainComponent);
