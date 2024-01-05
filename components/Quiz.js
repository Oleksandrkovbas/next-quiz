import * as React from 'react';
import styled from 'styled-components';
import cx from 'classnames';

import { ProgressBar } from '../components/ProgressBar';
import appConfig from '../config';
import { useAppState } from '../components/Context';
import EmailStep from '../components/EmailStep';
import { onBrowser } from '../helpers/onBrowser';

const QuestionWrapper = styled.div`
  box-shadow: 0 6px 28px 0 rgba(0, 0, 0, 0.27);
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 100%;
  padding: 23px;
  background-color: #fff;
  position: relative;

  .close-modal {
    display: none;
  }

  &.lean {
    box-shadow: none;
    background-image: none;
    padding: 35px 20px;
    display: block;
    margin-right: auto;
    margin-left: auto;
    max-width: 100%;
    width: 100%;

    @media screen and (max-width: 991px) {
      height: 100%;
    }

    @media screen and (min-width: 992px) {
      max-width: 770px;
      width: 100%;
      padding: 33px 45px 10px;
    }

    .close-modal {
      display: block;
      float: right;
      font-size: 18px;
      font-weight: bold;
      position: absolute;
      top: 7px;
      right: 10px;
      background-color: #ccc;
      color: #fff;
      cursor: pointer;
      width: 24px;
      height: 24px;
      text-align: center;
      line-height: 21px;
      border-radius: 50%;
      z-index: 9;
    }
  }

  @media screen and (min-width: 1024px) {
    background-image: url('/quiz/learning-type/static/triangle.svg');
  }
`;

const Title = styled.div`
  font-size: 1.4em;
  word-break: break-word;
  line-height: 1.3em;
  letter-spacing: 0;
  font-weight: 400;
  text-align: center;
  color: #666666;
  margin-top: 15px;
  width: 100%;
  justify-content: center;

  @media screen and (min-width: 992px) {
    font-size: 26px;
    margin-top: 13px;
    margin-bottom: 10px;
  }

  &.email-step {
    span {
      line-height: 1.1;
      font-size: 20px;
      margin-top: -6px;
      @media screen and (min-width: 992px) {
        font-size: 34px;
        line-height: 1.45;
        margin-top: auto;
      }
    }
  }
`;

const Form = styled.div`
  display: block;
  width: 100%;

  @media screen and (min-width: 992px) {
    padding: 14px 0;
    &.email-step {
      padding: 14px 0;
    }
  }
`;

const OptionsWrapper = styled.div.attrs({
  className: 'ui-flex Question_OptionsWrapper',
})`
  width: 100%;
  margin-top: 20px;
  @media screen and (min-width: 992px) {
    margin-top: 27px;
  }
`;

const OptionItem = styled.p`
  color: #666666;
  position: relative;
  user-select: none;

  @media screen and (max-width: 991px) {
    margin-bottom: 10px;
  }

  label {
    cursor: pointer;
    word-break: break-word;
    padding-left: 35px;
    font-size: 15px;

    &:before {
      border: 2px solid ${appConfig.theme.primaryColor};
      border-radius: 50%;
      content: ' ';
      position: absolute;
      left: 0;
      top: 0;
      margin: 4px;
      width: 16px;
      height: 16px;
      z-index: 0;
      transition: 0.28s ease;
    }
  }
`;

const Loading = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 0 1 auto;
  flex-basis: 100%;
  max-width: 100%;
  max-height: max-content;
  background-image: url('/quiz/learning-type/static/loading-results.svg');
  padding-top: 150%;
  background-repeat: no-repeat;
  &:not(.loading) {
    position: absolute;
    pointer-events: none;
    opacity: 0;
  }
`;

export default ({ className }) => {
  const [state, setState] = useAppState();

  const {
    currentQuestionData,
    currentQuestion,
    hasMoreQuestions,
    progress,
  } = state;

  const isEmailStep = !!currentQuestionData.customComponentProps;
  const title = currentQuestionData.title;
  const options = currentQuestionData.options;
  const ready = useDelay(isEmailStep);

  function onSelect(option) {
    setState(`results.${currentQuestion}`, option.profile);

    if (hasMoreQuestions) {
      setState('currentQuestion', currentQuestion + 1);
    }
  }

  const emailStepClassName = isEmailStep ? 'email-step ' : ' ';
  const showLoading = isEmailStep && !ready;

  return (
    <QuestionWrapper
      className={cx('ui-flex Question Question_Wrapper', className)}
    >
      <span
        id="close-modal"
        className="close-modal"
        onClick={function (event) {
          event.preventDefault();
          emitCloseModalEvent();
        }}
      >
        &times;
      </span>

      <Loading className={showLoading ? 'loading' : ''} />

      {isEmailStep && !ready ? null : (
        <>
          <ProgressBar progress={progress} />

          <Form className={emailStepClassName}>
            <Title className={emailStepClassName + ' ui-flex Question_Title'}>
              <span dangerouslySetInnerHTML={{ __html: title }} />
            </Title>

            {isEmailStep ? (
              <EmailStep />
            ) : (
              <OptionsWrapper>
                {options.map((option, key) => {
                  return (
                    <OptionItem
                      key={key + option.text}
                      className={'ui-flex Question_OptionItem'}
                      onClick={() => {
                        onSelect(option);
                      }}
                    >
                      <label
                        dangerouslySetInnerHTML={{ __html: option.text }}
                      />
                    </OptionItem>
                  );
                })}
              </OptionsWrapper>
            )}
          </Form>
        </>
      )}
    </QuestionWrapper>
  );
};

function useDelay(start) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(
    function () {
      if (!start) return;
      setTimeout(function () {
        setReady(true);
      }, 2000);
    },
    [start]
  );

  return ready;
}

function emitCloseModalEvent() {
  if (window.parent) {
    window.parent.postMessage('closeQuizModal', '*');
  }
}

onBrowser(function () {
  window.addEventListener('click', function (ev) {
    if (ev.target.classList && ev.target.classList.contains('close-modal')) {
      emitCloseModalEvent();
    }
  });
});

// ABA id 1 BBA id 2 KBA id 3
