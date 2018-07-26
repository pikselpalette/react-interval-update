/* globals jest */
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import { withInterval, Interval } from '../../lib/index';

Enzyme.configure({ adapter: new Adapter() });

jest.useFakeTimers();

describe('withInterval', () => {
  let component;

  class TestComponent extends React.Component {
    render() {
      return this.props.children;
    }
  }

  const WrappedTestComponent = withInterval(TestComponent, { interval: 1000, prop: 'update' });

  const setupComponent = (overrides = {}) => {
    component = mount((
      <WrappedTestComponent foo="bar">
        <b>Hello</b>
      </WrappedTestComponent>
    ));
  };

  beforeEach(setupComponent);

  it('renders normally', () => {
    expect(component.find('b')).toHaveText('Hello');
  });

  it('passes props to wrapped component', () => {
    expect(component.find(WrappedTestComponent)).toHaveProp('foo', 'bar');
  });

  it('renders Interval with the default interval', () => {
    expect(component.find(Interval)).toHaveProp('interval', 1000);
  });

  it('renders Component with the default interval', () => {
    expect(component.find(TestComponent)).toHaveProp('interval', 1000);
  });

  describe('when onIntervalChange called', () => {
    beforeEach(() => {
      component.find(TestComponent).prop('onIntervalChange')(2000);
      component.update();
    });

    it('renders Interval with the new interval', () => {
      expect(component.find(Interval)).toHaveProp('interval', 2000);
    });

    it('renders Component with the new interval', () => {
      expect(component.find(TestComponent)).toHaveProp('interval', 2000);
    });
  });
});
