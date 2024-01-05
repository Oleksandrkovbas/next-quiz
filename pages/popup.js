import * as React from 'react';

export default () => {
  const [state, setState] = React.useState(false);

  return (
    <>
      <script src="/static/modal.js" />
      <link href={'/static/modal.css'} rel={'stylesheet'}></link>

      <a href="#open-quiz">Open</a>
    </>
  );
};
