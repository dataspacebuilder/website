import React from 'react';
import { PageMetadata } from '@docusaurus/theme-common';
// Note: useBlogPost is a Docusaurus plugin hook
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import useBaseUrl from '@docusaurus/useBaseUrl';

// Note: Export name must remain BlogPostPageMetadata for Docusaurus theme swizzling
export default function BlogPostPageMetadata() {
  const { metadata } = useBlogPost();
  const { title, description, date, tags, authors, frontMatter } = metadata;
  const { keywords, image } = frontMatter;
  const imageUrl = useBaseUrl(image);
  
  return (
    <PageMetadata
      title={title}
      description={description}
      keywords={keywords}
      image={imageUrl}
    >
      <meta property="og:type" content="article" />
      <meta property="article:published_time" content={date} />
      {tags.length > 0 && (
        <meta property="article:tag" content={tags.map((t) => t.label).join(', ')} />
      )}
      {authors.length > 0 && (
        <meta property="article:author" content={authors.map((a) => a.name).join(', ')} />
      )}
    </PageMetadata>
  );
}
