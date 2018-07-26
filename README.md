# React Interval Update

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Installation

```
npm i --save react-interval-update
```

## Usage

### As a HOC

```jsx
import { withInterval } from 'react-interval-update';

const CurrentTimeWithUpdater = ({ onIntervalChange, interval }) => (
  <div>
    {new Date().toString()}
    <br />
    Update interval:
    <input
      value={interval}
      onChange={({ target }) => onIntervalChange(parseInt(target.value, 10))}
    />
  </div>
);

export default withInterval(CurrentTimeWithUpdater, { interval: 5000, prop: 'update' });
```

### As a component

```jsx
import { Interval } from 'react-interval-update';

const CurrentTime = () => new Date().toString();

return (
  <Interval interval={1000}>
    <CurrentTime />
  </Interval>
);
```
