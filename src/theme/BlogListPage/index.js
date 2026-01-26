import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import Link from '@docusaurus/Link';
import PostCard from '@site/src/components/Blog/PostCard';
import styles from './styles.module.css';

function BlogListPageMetadata(props) {
  const {metadata} = props;
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink} = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

// Featured/Hero post component
function FeaturedPost({ post }) {
  const {
    metadata: {
      permalink,
      title,
      description,
      date,
      readingTime,
      tags,
      frontMatter,
    },
  } = post;

  const imageUrl = useBaseUrl(frontMatter?.image || '/img/blog-default.svg');
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return (
    <Link to={permalink} className={styles.featuredLink}>
      <article className={styles.featuredPost}>
        <div className={styles.featuredImageContainer}>
          <img 
            src={imageUrl} 
            alt={title}
            className={styles.featuredImage}
          />
          <div className={styles.featuredOverlay} />
        </div>
        <div className={styles.featuredContent}>
          <div className={styles.featuredBadge}>Latest</div>
          <h2 className={styles.featuredTitle}>{title}</h2>
          <p className={styles.featuredDescription}>{description}</p>
          <div className={styles.featuredMeta}>
            <time dateTime={dateObj.toISOString()}>
              {dateObj.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className={styles.featuredDot}>·</span>
            <span>{Math.ceil(readingTime)} min read</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

// Tag filter component
function TagFilters({ tags, activeTag, onTagClick }) {
  return (
    <div className={styles.tagFilters}>
      <button
        className={clsx(styles.tagButton, !activeTag && styles.tagButtonActive)}
        onClick={() => onTagClick(null)}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          className={clsx(styles.tagButton, activeTag === tag && styles.tagButtonActive)}
          onClick={() => onTagClick(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

function BlogListPageContent(props) {
  const {metadata, items} = props;
  const [activeTag, setActiveTag] = useState(null);
  
  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set();
    items.forEach(({content}) => {
      content.metadata.tags?.forEach((tag) => tagSet.add(tag.label));
    });
    return Array.from(tagSet).sort();
  }, [items]);

  // Filter posts by tag
  const filteredItems = useMemo(() => {
    if (!activeTag) return items;
    return items.filter(({content}) => 
      content.metadata.tags?.some((tag) => tag.label === activeTag)
    );
  }, [items, activeTag]);

  // Separate featured post from rest
  const [featuredItem, ...restItems] = filteredItems;
  
  return (
    <Layout>
      <main className={styles.blogMain}>
        <div className={styles.blogHeader}>
          <div className={styles.headerBackground} />
          <div className={styles.headerContent}>
            <h1 className={styles.blogTitle}>Blog</h1>
            <p className={styles.blogSubtitle}>
              Insights on dataspaces, trusted data sharing, and the evolving data economy
            </p>
          </div>
        </div>

        <div className={styles.filtersSection}>
          <TagFilters 
            tags={allTags} 
            activeTag={activeTag} 
            onTagClick={setActiveTag} 
          />
        </div>
        
        {featuredItem && (
          <FeaturedPost post={featuredItem.content} />
        )}
        
        {restItems.length > 0 && (
          <div className={styles.contentContainer}>
            <h3 className={styles.sectionTitle}>More Articles</h3>
            <div className={clsx('row', styles.blogGrid)}>
              {restItems.map(({content: BlogPostContent}) => (
                <PostCard key={BlogPostContent.metadata.permalink} post={BlogPostContent} />
              ))}
            </div>
          </div>
        )}
        
        <div className={styles.contentContainer}>
          <BlogListPaginator metadata={metadata} />
        </div>
      </main>
    </Layout>
  );
}

export default function BlogListPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>
      <BlogListPageMetadata {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
