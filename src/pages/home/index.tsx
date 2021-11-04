import Panel from '@/components/Panel';
import PieChart from '@/components/charts/PieChart';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';

import styles from './index.module.scss';

import { mockPieData, mockLineData, mockBarData } from '@/mock/charts'


function Home() {
  return (
    <div>
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
    </div>
  )
}

export default Home;
