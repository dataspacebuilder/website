import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Image({ src, alt, style, ...props }) {
  const imageUrl = useBaseUrl(src);
  return <img src={imageUrl} alt={alt} style={style} {...props} />;
}
