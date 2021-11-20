import React, { LegacyRef } from 'react';
import classNames from 'classnames';

import './wrapper.scss';

export interface IWrapper {
  children?: React.ReactNode;
  className?: string;
  flex?: boolean;
  column?: boolean;
  row?: boolean;
  align?: 'center' | 'flex-start';
  refBlock?: LegacyRef<HTMLDivElement> | undefined;
  onClick?: () => void;
}

export const Wrapper: React.FC<IWrapper> = ({
  className,
  children,
  flex,
  row,
  align,
  column,
  refBlock,
  ...props
}) => {
  const classProps = classNames('', {
    ['wrapper_flex']: flex,
    ['wrapper_flex_column']: column,
    ['wrapper_flex_row']: row,
    [`wrapper_flex_align_${align}`]: align,
    [`${className}`]: className,
  });
  return (
    <div ref={refBlock} className={classProps} {...props}>
      {children}
    </div>
  );
};
