export const isBrowser = () =>
  typeof window !== 'undefined' && typeof document !== 'undefined';

export const onBrowser = (browserCB, serverCB) => {
  if (isBrowser()) {
    return typeof browserCB === 'function' ? browserCB() : undefined;
  } else {
    return typeof serverCB === 'function' ? serverCB() : undefined;
  }
};
