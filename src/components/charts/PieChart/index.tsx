import React from 'react';
import { Empty } from 'antd';
import ReactECharts, { EChartsOption } from 'echarts-for-react';

import styles from './index.module.scss'
import classNames from 'classnames';

const defaultColor = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']

export const getPieOptions = (data: IPieItem[], options: EChartsOption, name?: string) => {
  const { legend, tooltip, color } = options || {}
  return {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        return `<div><p class="mb-8">${params?.seriesName}</p><p><span class="title-circle" style="background:${params.color}" ></span><span class="mr-6 ml-2">${params.name}:</span><span class="panel_right">${params.data?.value}</span>/<span class="panel_percent">${params?.percent}%</span></p></div>`;
      },
      ...(tooltip || {})
    },
    legend: {
      type: 'scroll',
      pageIconSize: 8,
      right: '10%',
      orient: 'vertical',
      icon: 'circle',
      itemWidth: 14,
      textStyle: {
        width: 125,
        overflow: 'break',
        lineHeight: 14
      },
      padding: [0, 0, 30, 0],
      top: data?.length > 5 ? 40 : 'center',
      ...(legend || {})
    },
    color: color || defaultColor,
    series: [
      {
        name,
        type: 'pie',
        // radius: ['50%', '95%'],
        radius: [38, 77],
        center: ['35%', '50%'],
        itemStyle: {
          borderColor: '#fff',
          borderWidth: data?.length === 0 ? 0 :1
        },
        label: {
          formatter: (params: any) => {
            const { data: item } = params || {};
            return `${item?.name || ''}\n\n${item?.value || 0}`;
          },
          show: false,
          fontSize: 16,
          position: 'center'
        },
        emphasis: {
          focus: 'series',
          label: {
            show: false,
            formatter: '{b}\n\n{c}'
          }
        },
        labelLine: {
          show: true
        },
        data
      }
    ]
  }
};

interface IPieItem {
  name: string;
  value: number;
}

interface IProps {
  pieData: IPieItem[];
  name?: string;
  options?: EChartsOption;
  emptyStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  className?: string
}

function PieChart(props: IProps) {
  const { pieData, name, options, emptyStyle, style, className } = props;
  if (pieData?.length === 0 || !pieData) {
    return (
      <Empty
        description="暂无数据"
        style={{ height: '100%', width: '100%', ...(emptyStyle || {}) }}
      />
    )
  }

  return (
    <div style={{ width: '100%' }} className={classNames(styles.container, className)}>
      <ReactECharts
        option={getPieOptions(pieData || [], options, name)}
        style={{ height: 220, width: 480, ...(style || {}) }}
      />
    </div>
  );
}

export default PieChart;
