import { Component } from "react";
import isEqual from "lodash/isEqual";
import { withDataProvider } from "ra-core";

class Query extends Component {
  state = {
    data: null,
    total: null,
    loading: true,
    error: null
  };

  callDataProvider = () => {
    const { dataProvider, type, resource, payload, options } = this.props;
    this.setState({ loading: true });
    dataProvider(type, resource, payload, options)
      .then(({ data, total }) => {
        this.setState({
          data,
          total,
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          error,
          loading: false
        });
      });
  };

  componentDidMount = () => {
    this.callDataProvider();
  };

  componentDidUpdate = prevProps => {
    if (
      prevProps.type !== this.props.type ||
      prevProps.resource !== this.props.resource ||
      !isEqual(prevProps.payload, this.props.payload) ||
      !isEqual(prevProps.options, this.props.options)
    ) {
      this.callDataProvider();
    }
  };

  render() {
    const { children } = this.props;
    return children(this.state);
  }
}

export default withDataProvider(Query);
