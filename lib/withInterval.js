// @flow
import * as React from 'react';
import { Interval } from './index';

/** @memberOf IntervalWrapper */
type Props = {
  [string]: any
};

/** @memberOf IntervalWrapper */
type State = {
  interval: number
};

const withInterval = (Component: React.ComponentType<>, defaultInterval: number) =>
  class IntervalWrapper extends React.Component<Props, State> {
    state = {
      interval: defaultInterval
    };

    onIntervalChange = (interval: number): void => this.setState({ interval });

    render() {
      return (
        <Interval interval={this.state.interval}>
          <Component onIntervalChange={this.onIntervalChange} {...this.props}>
            {this.props.children}
          </Component>
        </Interval>
      );
    }
  };

export default withInterval;
