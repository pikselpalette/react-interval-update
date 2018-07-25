/* globals jest */
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import { Interval } from '../../lib/index';

Enzyme.configure({ adapter: new Adapter() });

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
      </Interval>
    ));
  };

  beforeEach(setupComponent);

  it('renders normally', () => {
    expect(component.find('b')).toHaveLength(1);
    expect(component.find('b')).toHaveText(currentTime);
  });
});
