import classNames from 'classnames';
import React, { useState } from 'react';
import { FileInfoType } from '../../../hooks/useFileReader';
import { convertFileSize } from '../../../utils/covertFileSize';
import { truncateFileName } from '../../../utils/truncateFileName';
import { Typography } from '../../atoms/Typography';
import { TypographyTypeStyle } from '../../atoms/Typography/types/types';
import { Wrapper } from '../../atoms/Wrapper';
import { SUPPORTED_FORMATS } from '../../organism/MessageForm/constants/constants';
import { Spinner } from '../Spinner';

import './fileBlock.scss';

interface IFileBlock {
  file: FileInfoType;
  handleImageClick?: (fileLink: string) => void;
  className?: string;
}

export const FileBlock: React.FC<IFileBlock> = ({ file, className, handleImageClick }) => {
  const classProps = classNames('file-block', {
    [`${className}`]: className,
  });

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <Wrapper className={classProps}>
      {!isLoaded ? (
        <Wrapper className="file-block__spinner">
          <Spinner />
        </Wrapper>
      ) : (
        <Wrapper flex align="center" className="file-block__info">
          <Typography className="file-block__filename" variant={TypographyTypeStyle.p1}>
            {truncateFileName(file.fileName)}
          </Typography>

          <Typography className="file-block__size" variant={TypographyTypeStyle.p2}>
            {convertFileSize(file.fileSize)}
          </Typography>
        </Wrapper>
      )}

      {SUPPORTED_FORMATS.IMAGE.includes(file.fileType) && (
        <img
          className="file-block__image"
          src={file.fileLink}
          onClick={() => handleImageClick && handleImageClick(file.fileLink)}
          onLoad={() => setIsLoaded(true)}
        />
      )}

      {SUPPORTED_FORMATS.VIDEO.includes(file.fileType) && (
        <video controls className="file-block__video" onLoadedData={() => setIsLoaded(true)}>
          <source src={file.fileLink} type={file.fileType} />
        </video>
      )}

      {SUPPORTED_FORMATS.AUDIO.includes(file.fileType) && (
        <audio controls className="file-block__audio" onLoadedData={() => setIsLoaded(true)}>
          <source src={file.fileLink} type={file.fileType} />
        </audio>
      )}
    </Wrapper>
  );
};
