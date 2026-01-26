import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./styles.module.css";

// Tag color mapping based on your layer colors
const tagColors = {
  'business': '#7C3AED',           // Purple - Trust Framework
  'cloud-providers': '#0D9488',    // Teal - Control Plane
  'market-opportunity': '#10B981', // Green - Trust Plane
  'architecture': '#0D9488',       // Teal
  'implementation': '#F59E0B',     // Orange - Data Plane
  'concepts': '#7C3AED',           // Purple
  'introduction': '#10B981',       // Green
  'technical-leaders': '#1E3A5F',  // Navy - Infrastructure
  'engineering': '#F59E0B',        // Orange
  'getting-started': '#10B981',    // Green
};

const getTagColor = (tag) => tagColors[tag] || '#0D9488';

const FormattedDate = ({ date }) => {
  if (!date) return null;
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return (
    <time className={styles.date} dateTime={dateObj.toISOString()}>
      {dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </time>
  );
};

const ReadingTime = ({ readingTime }) => {
  if (!readingTime) return null;
  return (
    <span className={styles.readingTime}>
      {Math.ceil(readingTime)} min read
    </span>
  );
};

export default function PostCard({ post }) {
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

  const imageUrl = frontMatter?.image || '/img/blog-default.svg';

  return (
    <article className={clsx("col col--6", styles.postCard)}>
      <Link to={permalink} className={styles.cardLink}>
        <div className={styles.card}>
          <div className={styles.imageContainer}>
            <img 
              src={imageUrl} 
              alt={title}
              className={styles.image}
              loading="lazy"
            />
            <div className={styles.imageOverlay} />
          </div>
          
          <div className={styles.content}>
            <div className={styles.meta}>
              <FormattedDate date={date} />
              <ReadingTime readingTime={readingTime} />
            </div>
            
            <h2 className={styles.title}>{title}</h2>
            
            {description && (
              <p className={styles.description}>{description}</p>
            )}
            
            {tags && tags.length > 0 && (
              <div className={styles.tags}>
                {tags.slice(0, 3).map((tag, idx) => (
                  <span 
                    key={idx} 
                    className={styles.tag}
                    style={{ 
                      backgroundColor: `${getTagColor(tag.label)}15`,
                      color: getTagColor(tag.label),
                      borderColor: `${getTagColor(tag.label)}30`,
                    }}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            )}
            
            <div className={styles.readMore}>
              Read article →
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
