import React from 'react';
import classNames from 'classnames';

import './mainContainer.scss';

interface IMainContainer {
  page?: string;
}

export const MainContainer: React.FC<IMainContainer> = ({ children, page }) => {
  const classProps = classNames('main-container', {
    [`${page}-page__main-container`]: page,
  });

  return <main className={classProps}>{children}</main>;
};
