import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const colorClasses = {
  'control-plane': styles.colorControlPlane,
  'trust-plane': styles.colorTrustPlane,
  'data-plane': styles.colorDataPlane,
  'infrastructure': styles.colorInfrastructure,
  'trust-framework': styles.colorTrustFramework,
  'neutral': styles.colorNeutral,
};

export function Layer({ color = 'neutral', label, detail }) {
  return (
    <div className={clsx(styles.layer, colorClasses[color])}>
      <div className={styles.layerLabel}>{label}</div>
      {detail && <div className={styles.layerDetail}>{detail}</div>}
    </div>
  );
}

export function GroupItem({ label, detail }) {
  return (
    <div className={styles.groupItem}>
      <div className={styles.groupItemLabel}>{label}</div>
      {detail && <div className={styles.groupItemDetail}>{detail}</div>}
    </div>
  );
}

export function LayerGroup({ color = 'neutral', children }) {
  return (
    <div className={clsx(styles.layerGroup, colorClasses[color])}>
      {children}
    </div>
  );
}

export function ArchitectureStack({ title, children }) {
  return (
    <div className={styles.stack}>
      {title && <div className={styles.stackTitle}>{title}</div>}
      <div className={styles.stackLayers}>
        {children}
      </div>
    </div>
  );
}
