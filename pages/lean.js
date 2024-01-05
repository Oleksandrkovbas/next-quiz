import * as React from 'react';
import styled from 'styled-components';

import Quiz from '../components/Quiz';

const LeanWrapper = styled.div`
  width: 100%;
  height: 100vh;
  align-items: center;
  max-height: 100%;

  > div {
    max-height: 100vh;
    overflow-y: auto;
  }
`;

// this version is used in popup as iframe
export default () => {
  return (
    <LeanWrapper className={'ui-flex Lean Lean_Wrapper close-modal'}>
      <Quiz className={'lean'} />
    </LeanWrapper>
  );
};
