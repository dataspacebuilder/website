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
import PostCard from '@site/src/components/Guides/PostCard';
import styles from './styles.module.css';

function GuideListPageMetadata(props) {
  const {metadata} = props;
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  // Note: blogDescription/blogTitle come from Docusaurus plugin metadata
  const {blogDescription: guideDescription, blogTitle: guideTitle, permalink} = metadata;
  const isGuideOnlyMode = permalink === '/';
  const title = isGuideOnlyMode ? siteTitle : guideTitle;
  
  return (
    <>
      <PageMetadata title={title} description={guideDescription} />
      <SearchMetadata tag="guide_posts_list" />
    </>
  );
}

// Featured/Hero post component
function FeaturedPost({ post }) {
  if (!post?.metadata) return null;
  
  const { metadata } = post;
  const {
    permalink,
    title,
    description,
    date,
    readingTime,
    frontMatter,
  } = metadata;

  const imageUrl = useBaseUrl(frontMatter?.image || '/img/guide-default.svg');
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

function GuideListPageContent(props) {
  const {metadata, items} = props;
  const [activeTag, setActiveTag] = useState(null);
  
  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set();
    items.forEach(({content}) => {
      content?.metadata?.tags?.forEach((tag) => tagSet.add(tag.label));
    });
    return Array.from(tagSet).sort();
  }, [items]);

  // Filter posts by tag
  const filteredItems = useMemo(() => {
    if (!activeTag) return items;
    return items.filter(({content}) => 
      content?.metadata?.tags?.some((tag) => tag.label === activeTag)
    );
  }, [items, activeTag]);

  // Separate featured post from rest
  const [featuredItem, ...restItems] = filteredItems;
  
  return (
    <Layout>
      <main className={styles.guideMain}>
        <div className={styles.guideHeader}>
          <div className={styles.headerBackground} />
          <div className={styles.headerContent}>
            <h1 className={styles.guideTitle}>Guides</h1>
            <p className={styles.guideSubtitle}>
              Practical guides for building trusted data infrastructure with dataspaces
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
        
        {featuredItem?.content && (
          <FeaturedPost post={featuredItem.content} />
        )}
        
        {restItems.length > 0 && (
          <div className={styles.contentContainer}>
            <h3 className={styles.sectionTitle}>More Articles</h3>
            <div className={clsx('row', styles.guideGrid)}>
              {restItems
                .filter(item => item?.content?.metadata?.permalink)
                .map(({content: GuideContent}) => (
                  <PostCard key={GuideContent.metadata.permalink} post={GuideContent} />
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

// Note: Export name must remain BlogListPage for Docusaurus theme swizzling
export default function BlogListPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(
        // These ThemeClassNames are Docusaurus internals
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>
      <GuideListPageMetadata {...props} />
      <GuideListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
