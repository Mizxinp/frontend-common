import Panel from '@/components/Panel';
import PieChart from '@/components/charts/PieChart';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import ChinaMap from '@/components/charts/ChinaMap';
import { Button } from 'sparrow-ui';

import styles from './index.module.scss';

import { mockPieData, mockLineData, mockBarData, chinaMapData } from '@/mock/charts'


function Home() {
  return (
    <div className={styles.page}>
      <Button btnType="danger">jjjjjjjj</Button>
      <Panel title="饼图">
        <div className={styles.content}>
          <PieChart pieData={mockPieData} className={styles.card} />
          <PieChart pieData={mockPieData} className={styles.card} />
        </div>
      </Panel>
      <Panel title="折线图">
        <LineChart lineData={mockLineData} lineName="数据" />
      </Panel>
      <Panel title="柱状图">
        <BarChart barData={mockBarData} name="一周数据" />
      </Panel>
      <Panel title="中国地图">
        <ChinaMap mapData={chinaMapData} />
      </Panel>
    </div>
  )
}

export default Home;
