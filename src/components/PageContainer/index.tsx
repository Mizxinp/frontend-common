import React from 'react'
import { Layout, Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import styles from './index.module.scss';

const { Header } = Layout;

function PageContainer(props: { children: React.ReactChild }) {
  const history = useHistory();
  return (
    <div>
      <Layout>
        <Header>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item onClick={() => history.push('/')}>图表</Menu.Item>
            <Menu.Item onClick={() => history.push('/other')}>其他</Menu.Item>
            <Menu.Item onClick={() => history.push('/test')}>测试demo</Menu.Item>
          </Menu>
        </Header>
      </Layout>
      <div className={styles.container}>
        {props.children}
      </div>
    </div>
  )
}

export default PageContainer
