import { useCallback, useState } from 'react';

export type FileInfoType = {
  fileLink: string;
  fileType: string;
  fileSize: number;
  fileName: string;
};

export interface IUseFileReader {
  fileInfo: FileInfoType;
  isLoaded: boolean;
  isVisiblePreviewFile: boolean;
  uniqueKeyInput: number;
  setFileInfo: (fileInfo: FileInfoType) => void;
  handleSetIsVisiblePreview: () => void;
  handleDeleteFile: () => void;
  handleResetUniqueKey: () => void;
}

const initialFileInfoState = {
  fileLink: '',
  fileType: '',
  fileSize: 0,
  fileName: '',
};

export const useFileReader = (): [IUseFileReader, (file: File) => void] => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [fileInfo, setFileInfo] = useState<FileInfoType>(initialFileInfoState);
  const [isVisiblePreviewFile, setIsVisiblePreviewFile] = useState<boolean>(false);
  const [uniqueKeyInput, resetUniqueKeyInput] = useState<number>(Date.now());

  const loadFile = useCallback((file: File) => {
    const reader = new FileReader();
    setIsVisiblePreviewFile(false);

    reader.onload = function () {
      setFileInfo({
        fileLink: reader.result as string,
        fileType: file.type,
        fileSize: file.size,
        fileName: file.name,
      });
      setIsLoaded(true);
      setIsVisiblePreviewFile(true);
    };

    reader.readAsDataURL(file);
  }, []);

  const handleSetIsVisiblePreview = useCallback(() => {
    setIsVisiblePreviewFile(!isVisiblePreviewFile);
  }, [isVisiblePreviewFile]);

  const handleDeleteFile = useCallback(() => {
    setFileInfo(initialFileInfoState);
    setIsVisiblePreviewFile(false);
  }, []);

  const handleResetUniqueKey = useCallback(() => {
    resetUniqueKeyInput(Date.now());
  }, []);

  return [
    {
      fileInfo,
      isLoaded,
      isVisiblePreviewFile,
      uniqueKeyInput,
      setFileInfo,
      handleSetIsVisiblePreview,
      handleDeleteFile,
      handleResetUniqueKey,
    },
    loadFile,
  ];
};
