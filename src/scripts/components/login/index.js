import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import renderWithActions from "../../helpers/renderWithActions";
import { user as userActions } from "../../actions";
import Login from "./login";

const mapStateToProps = (state, ownProps) => ({
  isLoading: state.user.isFetching,
  isLoggedIn: state.user.isLoggedIn,
  ...ownProps
});

const mapDispatchToProps = {
  attemptLogin: userActions.login,
  getUseByToken: userActions.getUserByToken
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  renderWithActions(["getUseByToken"])
);

const MainComponent = enhance(Login);
export default withRouter(MainComponent);
