/* globals jest */
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import { Interval } from '../../lib/index';

Enzyme.configure({ adapter: new Adapter() });

jest.useFakeTimers();

describe('Interval', () => {
  let component;
  let mockProps;
  let currentTime;

  const TimeComponent = () => (currentTime = new Date().getTime().toString());

  const getRequiredProps = () => ({
    interval: 1000
  });

  const setupComponent = (overrides = {}) => {
    mockProps = {
      ...getRequiredProps(),
      ...overrides
    };

    component = mount((
      <Interval {...mockProps}>
        <b><TimeComponent /></b>
        {null}
        Test
      </Interval>
    ));
  };

  beforeEach(setupComponent);

  it('renders normally', () => {
    expect(component.find('b')).toHaveText(currentTime);
  });

  it('sets timer matching interval', () => {
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
  });

  describe('after timer completes', () => {
    let oldTime;

    beforeEach(() => {
      oldTime = currentTime;
      jest.runOnlyPendingTimers();
      component.update();
    });

    it('re-renders the child component', () => {
      expect(oldTime).not.toEqual(currentTime);
      expect(component.find('b')).toHaveText(currentTime);
    });

    describe('after timer completes again', () => {
      beforeEach(() => {
        oldTime = currentTime;
        jest.runOnlyPendingTimers();
        component.update();
      });

      it('re-renders the child component again', () => {
        expect(oldTime).not.toEqual(currentTime);
        expect(component.find('b')).toHaveText(currentTime);
      });
    });

    describe('when passed a new interval prop', () => {
      beforeEach(() => {
        component.setProps({ interval: 2000 });
        component.update();
      });

      it('calls setTimeout with new interval', () => {
        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 2000);
      });
    });
  });
});
