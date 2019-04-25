import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import renderWithActions from "../../helpers/renderWithActions";
import { system as systemActions } from "../../actions";
import System from "./system";

const mapStateToProps = (state, ownProps) => ({
  usersData: state.system.users,
  clubsData: state.system.clubs,
  ...ownProps
});

const mapDispatchToProps = {
  fetchAllUsers: systemActions.fetchAllUsers,
  fetchClubs: systemActions.fetchClubs
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  renderWithActions(["fetchAllUsers", "fetchClubs"])
);

const MainComponent = enhance(System);

export default withRouter(MainComponent);
