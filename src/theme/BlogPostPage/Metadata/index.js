import React from 'react';
import { PageMetadata } from '@docusaurus/theme-common';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';

export default function BlogPostPageMetadata() {
  const { metadata } = useBlogPost();
  const { title, description, date, tags, authors, frontMatter } = metadata;
  const { keywords, image } = frontMatter;
  
  return (
    <PageMetadata
      title={title}
      description={description}
      keywords={keywords}
      image={image}
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
