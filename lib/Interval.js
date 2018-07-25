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

export default class Interval extends React.Component<Props> {
  static defaultProps = {
    prop: 'key'
  };

  timer: TimeoutID;

  update = () => this.forceUpdate();

  render() {
    clearTimeout(this.timer);
    this.timer = setTimeout(this.update, this.props.interval);

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
