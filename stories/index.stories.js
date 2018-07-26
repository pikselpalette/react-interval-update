import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

const specialAction = (name) =>
  (...args) => {
    console.log(name, args);
    return action(name)(...args);
  };

import { Interval, withInterval } from '../lib/index';

const CurrentTime = () => new Date().toString();

storiesOf('Interval', module)
  .addDecorator(story => (
    <div style={{ height: '100vh', width: '100vw' }}>
      {story()}
    </div>
  ))
  .add('update every second', () => (
    <Interval interval={1000}>
      <CurrentTime />
    </Interval>
  ))
  .add('update every 5 seconds', () => (
    <Interval interval={5000}>
      <CurrentTime />
    </Interval>
  ));

const CurrentTimeWithUpdater = ({ onIntervalChange, interval }) => (
  <div>
    {new Date().toString()}
    <input value={interval} onChange={({ target }) => onIntervalChange(parseInt(target.value, 10))} />
  </div>
);

const CurrentTimeWithInterval = withInterval(CurrentTimeWithUpdater, 1000);

storiesOf('withInterval', module)
  .addDecorator(story => (
    <div style={{ height: '100vh', width: '100vw' }}>
      {story()}
    </div>
  ))
  .add('default update every second', () => (
    <CurrentTimeWithInterval />
  ));
