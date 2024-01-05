import * as React from 'react';
import { useRedux } from '../redux/useRedux';
import { setReduxState } from '../redux/reducer';

export const useAppState = () => {
  const [state, bindAction] = useRedux(s => s);
  const setState = bindAction(setReduxState);

  return [state, setState];
};
