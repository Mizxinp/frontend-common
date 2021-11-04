import React from 'react';
import classnames from 'classnames';
import { Empty } from 'antd';
import ReactECharts, { EChartsOption } from 'echarts-for-react';
import { formatNum } from '@/commons/utils/bi';

import styles from './index.module.scss'

export const getPieOptions = (data: IBarItem[], name: string, options: EChartsOption) => {
  const { legend, tooltip, color, grid } = options || {}
  return {
    color: color || ['#0cc5ae', '#349AF9'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      ...(tooltip || {}),
    },
    legend: {
      bottom: '0',
      icon: 'circle',
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 40,
      ...(legend|| {}),
    },
    grid: {
      left: '3%',
      right: '3%',
      bottom: '17%',
      top: 24,
      containLabel: true,
      ...(grid|| {}),
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        data: data?.map(item => item.name),
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          rotate: data?.length > 7 ? 30 : 0,
          width: 40
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [{
      name: name,
      type: 'bar',
      data: data?.map(item => item?.value),
      barMaxWidth: 48,
      itemStyle: {
        normal: {
          label: {
            show: true,
            position: 'top',
            formatter: (item: any) => {
              const value = typeof item?.data === 'number' ? item?.data : item?.data?.value;
              return formatNum(value)
            }
          }
        }
      }
    }]
  }
};

interface IBarItem {
  name: string;
  value: any;
}

interface IProps {
  barData: IBarItem[];
  name: string;
  options?: EChartsOption;
  emptyStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  containerClassName?: string;
  /** 当数据为空时是否展示空状态 */
  showEmpty?: boolean;
}

function BarChart(props: IProps) {
  const { barData, name, options, emptyStyle, style, containerClassName, showEmpty = true } = props;

  if (barData?.length === 0 || !barData) {
    if (showEmpty) {
      return (
        <Empty
          description="暂无数据"
          style={{ height: '100%', width: '100%', ...(emptyStyle || {}) }}
        />
      )
    }
    return null
  }

  return (
    <div style={{ width: '100%' }} className={classnames(styles.container, containerClassName)}>
      <ReactECharts
        option={getPieOptions(barData || [], name, options)}
        style={{ height: 305, width: '100%', ...(style || {}) }}
      />
    </div>
  );
}

export default BarChart;
