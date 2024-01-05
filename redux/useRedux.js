import get from 'lodash/get';
import { ReactReduxContext } from 'react-redux';
import * as React from 'react';

import equal from 'shallow-equal/objects';

export const useBindAction = () => {
  const redux = React.useContext(ReactReduxContext);

  return fn => {
    if (typeof fn !== 'function') {
      throw new Error(`invalid action ${fn}`);
    }

    return (...args) => redux.store.dispatch(fn(...args));
  };
};

const _initialState = '@useRedux_initial';

export const useRedux = stateMapperFn => {
  const lastValue = React.useRef(_initialState);
  const redux = React.useContext(ReactReduxContext);
  const bindAction = useBindAction();

  const getMappedState = () => stateMapperFn(redux.store.getState(), get);

  const [mappedState, setMappedState] = React.useState(getMappedState());

  React.useEffect(() => {
    return redux.store.subscribe(() => {
      const currentMappedState = getMappedState();
      const changed = !equal(currentMappedState, lastValue.current);

      if (changed) {
        lastValue.current = currentMappedState;
        setMappedState(currentMappedState);
      }
    });
  }, []);

  return [mappedState, bindAction, redux.store];
};
