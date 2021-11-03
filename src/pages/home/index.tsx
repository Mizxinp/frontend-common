import React from 'react';
import { useHistory } from 'react-router-dom';


function Home() {
  const history = useHistory()
  return (
    <div onClick={() => history.push('/other')}>首页</div>
  )
}

export default Home;
