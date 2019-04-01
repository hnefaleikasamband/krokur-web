import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import renderWithActions from "../../helpers/renderWithActions";
import { dashboard as dashboardActions } from "../../actions";
import Dashboard from "./dashboard";

const mapStateToProps = (state, ownProps) => ({
  ...ownProps
});

const mapDispatchToProps = {
  refreshDashboard: dashboardActions.refreshDashboard
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  renderWithActions(["refreshDashboard"])
);

const MainComponent = enhance(Dashboard);

export default withRouter(MainComponent);
