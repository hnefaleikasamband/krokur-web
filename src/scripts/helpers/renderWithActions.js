import React, { Fragment } from 'react';

class RenderWithActionsComponent extends React.Component {
  componentDidMount() {
    const { actions, componentProps } = this.props;
    actions.forEach((action) => componentProps[action](componentProps));
  }
  render() {
    return <Fragment>{this.props.children}</Fragment>;
  }
}
const renderWithActions = (actions) => (Component) => (componentProps) => (
  <RenderWithActionsComponent actions={actions} componentProps={componentProps}>
    <Component {...componentProps} />
  </RenderWithActionsComponent>
);

export default renderWithActions;
