import React from 'react';
import { useHistory } from 'react-router-dom';
import Panel from '@/components/Panel';

import styles from './index.module.scss';


function Home() {
  const history = useHistory()
  return (
    <div onClick={() => history.push('/other')}>
      <Panel title="饼图">
        <div className={styles.test}>这是饼图</div>
      </Panel>
    </div>
  )
}

export default Home;
