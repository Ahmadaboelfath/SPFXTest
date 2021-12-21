import * as React from "react";

const asyncComponent = (importComponent) => {
  return class extends React.Component<any, any> {
    constructor(props) {
      super(props);
      this.state = {
        component: null,
      };
    }

    componentDidMount(): void {
      importComponent().then((cmp) => {
        this.setState({ component: cmp.default });
      });
    }

    render(): React.ReactNode {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  };
};

export default asyncComponent;
