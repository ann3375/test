import React from 'react';
import classNames from 'classnames';
import { Wrapper } from '../../atoms/Wrapper';
import { ButtonIcon } from '../../molecules/ButtonIcon';
import { FileBlock } from '../../molecules/FileBlock';
import { ColorType, IconName } from '../../atoms/Icon/types/types';
import { ButtonType } from '../../atoms/Button/types/types';
import { IUseFileReader } from '../../../hooks/useFileReader';

import './filePreview.scss';

interface IFilePreview {
  handleDeletePreviewFile: () => void;
  previewFileState: IUseFileReader;
}

export const FilePreview: React.FC<IFilePreview> = ({
  previewFileState,
  handleDeletePreviewFile,
}) => {
  const { isVisiblePreviewFile, fileInfo, handleSetIsVisiblePreview } = previewFileState;

  return (
    <Wrapper
      className={classNames('preview', {
        preview_active: isVisiblePreviewFile,
      })}
    >
      <Wrapper className="preview__wrapper" flex>
        <FileBlock file={fileInfo} className="preview__file" />

        <Wrapper className="preview__buttons">
          <ButtonIcon
            className={'preview__button'}
            type={ButtonType.button}
            iconName={IconName.closeCircleIcon}
            color={ColorType.primary}
            onClick={handleSetIsVisiblePreview}
          />

          <ButtonIcon
            className={'preview__button'}
            type={ButtonType.button}
            iconName={IconName.deleteIcon}
            color={ColorType.error}
            onClick={handleDeletePreviewFile}
          />
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
};
