import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import { onBrowser } from '../helpers/onBrowser';

export default function createStore(data) {
  const middleware = [];

  let finalCreateStore;

  const devTool = onBrowser(() => window.__REDUX_DEVTOOLS_EXTENSION__);

  if (devTool) {
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      devTool()
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }

  const reducer = require('./reducer').default;

  const store = finalCreateStore(reducer, data);

  onBrowser(() => {
    window.appreduxstore = store;
  });

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(require('./reducer').default);
    });
  }

  return store;
}
