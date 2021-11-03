import React from 'react';
import { useHistory } from 'react-router-dom';
import Panel from '../../components/Panel';


function Home() {
  const history = useHistory()
  return (
    <div onClick={() => history.push('/other')}>
      <Panel title="饼图">
        这是饼图
      </Panel>
    </div>
  )
}

export default Home;
