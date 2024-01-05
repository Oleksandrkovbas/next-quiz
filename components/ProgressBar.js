import * as React from 'react';
import styled from 'styled-components';
import appConfig from '../config';

const ProgressBarWrapper = styled.div`
  display: block;
  background-color: #ddd;
  height: 20px;
  position: relative;
  width: 100%;
  border-radius: 100px;
  background: rgba(216, 216, 216, 0.28);
  border: 1px solid rgba(155, 155, 155, 0.2);

  .progress {
    color: white;
    min-width: 40px;
    height: 19px;
    background-color: ${appConfig.theme.primaryColor};
    border-radius: 100px 0 0 100px;
    margin: -0.2px;
    position: absolute;
    text-align: center;
    width: 0%;
    top: -1px;
    left: -1px;
    right: -1px;
    transition: all 0.25s ease;
  }
`;

export const ProgressBar = (props) => {
  const { progress } = props;

  return (
    <ProgressBarWrapper className={'ProgressBar ProgressBar_Wrapper'}>
      <div className="progress" style={{ width: `${progress}%` }}>
        <span>{progress}%</span>
      </div>
    </ProgressBarWrapper>
  );
};
