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

const withInterval = (
  Component: React.ComponentType<any>,
  intervalProps: { interval: number, [string]: any }
) =>
  class IntervalWrapper extends React.Component<Props, State> {
    state = {
      interval: intervalProps.interval
    };

    onIntervalChange = (interval: number): void => this.setState({ interval });

    render() {
      return (
        <Interval {...intervalProps} interval={this.state.interval}>
          <Component
            onIntervalChange={this.onIntervalChange}
            interval={this.state.interval}
            {...this.props}
          >
            {this.props.children}
          </Component>
        </Interval>
      );
    }
  };

export default withInterval;
