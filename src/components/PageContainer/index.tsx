import React from 'react'
import { Layout, Menu } from 'antd';
import styles from './index.module.scss';

const { Header, Content, Footer } = Layout;

function PageContainer(props: { children: React.ReactChild }) {
  return (
    <div>
      <Layout>
        <Header>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item>图表</Menu.Item>
            <Menu.Item>其他</Menu.Item>
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
