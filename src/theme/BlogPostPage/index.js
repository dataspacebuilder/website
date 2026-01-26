import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { HtmlClassNameProvider, ThemeClassNames } from '@docusaurus/theme-common';
import { BlogPostProvider, useBlogPost } from '@docusaurus/plugin-content-blog/client';
import BlogLayout from '@theme/BlogLayout';
import BlogPostItem from '@theme/BlogPostItem';
import BlogPostPaginator from '@theme/BlogPostPaginator';
import BlogPostPageMetadata from '@theme/BlogPostPage/Metadata';
import TOC from '@theme/TOC';
import styles from './styles.module.css';

// Reading progress bar component
function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className={styles.progressContainer}>
      <div 
        className={styles.progressBar} 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function BlogPostPageContent({ children }) {
  const { metadata, toc } = useBlogPost();
  const { frontMatter } = metadata;
  const imageUrl = frontMatter?.image;

  return (
    <BlogLayout
      toc={
        toc.length > 0 ? (
          <TOC toc={toc} minHeadingLevel={2} maxHeadingLevel={3} />
        ) : undefined
      }
    >
      <ReadingProgressBar />
      
      {/* Hero Image */}
      {imageUrl && (
        <div className={styles.heroImage}>
          <img src={imageUrl} alt={metadata.title} />
          <div className={styles.heroOverlay} />
        </div>
      )}

      <div className={clsx(styles.blogPostContent, imageUrl && styles.hasHeroImage)}>
        <BlogPostItem>{children}</BlogPostItem>
      </div>

      {(metadata.nextItem || metadata.prevItem) && (
        <div className={styles.paginatorWrapper}>
          <BlogPostPaginator nextItem={metadata.nextItem} prevItem={metadata.prevItem} />
        </div>
      )}
    </BlogLayout>
  );
}

export default function BlogPostPage(props) {
  const BlogPostContent = props.content;

  return (
    <BlogPostProvider content={props.content} isBlogPostPage>
      <HtmlClassNameProvider
        className={clsx(
          ThemeClassNames.wrapper.blogPages,
          ThemeClassNames.page.blogPostPage
        )}
      >
        <BlogPostPageMetadata />
        <BlogPostPageContent>
          <BlogPostContent />
        </BlogPostPageContent>
      </HtmlClassNameProvider>
    </BlogPostProvider>
  );
}
