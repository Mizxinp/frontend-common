import React from 'react'
import styles from './index.module.scss';

function PageContainer(props: { children: React.ReactChild }) {
  return (
    <div className={styles.container}>
      {props.children}
    </div>
  )
}

export default PageContainer
