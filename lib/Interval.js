// @flow
import * as React from 'react';

/** @memberOf Interval */
type Props = {
  /** Children to re-render */
  children: React.Node,
  /** Interval to update */
  interval: number,
  /** Prop to update to trigger a change */
  prop: string
};

/** @memberOf Interval */
type State = {
  update: boolean
};

export default class Interval extends React.Component<Props> {
  static defaultProps = {
    prop: 'key'
  };

  state = {
    update: false
  };

  render() {
    const fragmentProps = { [this.props.prop]: new Date().getTime() };

    return React.Children.map(
      this.props.children,
      (child, index) => React.isValidElement(child)
        ? React.cloneElement(child, {
          ...child.props,
          [this.props.prop]: [new Date().getTime(), index].join()
        }, child.props.children)
        : null
    );
  }
}
