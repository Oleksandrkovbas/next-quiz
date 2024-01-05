import * as React from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import Link from 'next/link';

const ButtonWrapper = styled.div`
  width: 100%;
  background: #ffe300;
  position: relative;

  &.disabled, a.disabled {
    pointer-events: none;
    background-color: #dfdfdf !important;
    color: #7d7d7d;
  }

  &.loading {
    &:before {
      margin: -13px 0 0 -13px;
      width: 24px;
      height: 24px;
      position: absolute;
      left: 50%;
      top: 50%;
      content: '';
      -webkit-border-radius: 24px;
      -webkit-background-clip: padding-box;
      -moz-border-radius: 24px;
      -moz-background-clip: padding;
      border-radius: 24px;
      background-clip: padding-box;
      border: rgba(255, 255, 255, 0.25) 3px solid;
      border-top-color: #fff;
      animation: animation-rotate 750ms linear infinite;
    }

    span {
      opacity: 0;
    }
  }
`;

export const Button = (props) => {
  const { className, disabled, href, onClick, ...extend } = props;

  const inner = (
    <a
      href={href}
      className={cx('button', { disabled }, className)}
      onClick={onClick}
      {...extend}
    >
      <span>{props.children}</span>
    </a>
  );

  return (
    <ButtonWrapper
      className={cx(className, 'ui-flex Button Button_Wrapper', { disabled })}
    >
      {onClick ? inner : <Link href={href || '#'}>{inner}</Link>}
    </ButtonWrapper>
  );
};

export default Button;
