export function convertFileSize(size: number): string {
  if (size > 100000) {
    return `${(size / 1024 ** 2).toFixed(1)} MB`;
  } else {
    return `${(size / 1024).toFixed(1)} KB`;
  }
}
