declare module '*.svg' {
  const url: import('next').StaticImageData | string;
  export default url;
}

declare module '@bullebrowser/brand-tokens/logo.svg' {
  const url: import('next').StaticImageData;
  export default url;
}
declare module '@bullebrowser/brand-tokens/wordmark.svg' {
  const url: import('next').StaticImageData;
  export default url;
}
declare module '@bullebrowser/brand-tokens/wordmark-light.svg' {
  const url: import('next').StaticImageData;
  export default url;
}
