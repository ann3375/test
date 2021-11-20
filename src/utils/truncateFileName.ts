export function truncateFileName(fileName: string): string {
  if (fileName.length > 80) {
    return fileName.slice(0, 80) + '..' + fileName.slice(fileName.lastIndexOf('.'));
  }
  return fileName;
}
