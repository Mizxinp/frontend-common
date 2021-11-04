import ReactECharts from 'echarts-for-react';
import { Empty } from 'antd';
import { ILineChartData } from '@/interface/charts';
import { isEmpty } from 'lodash';
import echartsTheme from '@/hooks/useEchartsRegisterTheme/theme';
import './index.scss';

function xaxisTimeInfo (data: ILineChartData, index: number) {
  return (data?.xaxisInfo?.[index] && `<span class="title-l">(${data.xaxisInfo[index]})</span>`) || '';
};

function getXaxisInfoIndex(data: ILineChartData, xValue: string) {
  return data?.xaxis?.findIndex(item => item === xValue) || 0;
};

export const getLineOptions = (data: ILineChartData, options: any, dataName: string, dataZoomShow = false) => {
  const { tooltip } = options || {};
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#454546',
      textStyle: {
        color: '#fff' // 设置文字颜色
      },
      show: true,
      axisPointer: {
        type: 'line', // 默认为直线，可选为：'line' | 'shadow'
        label: {
          show: true,
          interval: 0
        }
      },
      formatter: (params: any) => {
        let headerHtml = '';
        let totleCount = 0;
        let tooltipTitle = '';
        const line = `<div class="title-line"></div>`;
        params.forEach((item: any, index: number) => {
          // x轴名称
          tooltipTitle = item.axisValue;
          // Y轴名称
          const text = item.data;
          // 标题圆颜色
          const circleColor = item.color;
          totleCount += text;
          headerHtml +=
            `<span class="title-circle" style="background:${circleColor}" ></span>` +
            `<span class="title-font">${dataName}:</span>` +
            `<span class="title-test">${text.toLocaleString()}</span>` +
            '</br>';
        });

        headerHtml =
          `<div class=""><span class="title-l">${tooltipTitle.toLocaleString()}</span>` +
          '</br>' +
          xaxisTimeInfo(data, getXaxisInfoIndex(data, tooltipTitle)) +
          line +
          headerHtml +
          '</div>';
        return headerHtml;
      },
      ...(tooltip || {}),
    },
    legend: {
      data: [dataName],
      bottom: 0,
      icon: 'circle',
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 40
    },
    grid: {
      left: '3%',
      right: '3%',
      bottom: dataZoomShow ? '35%' : '17%',
      height: dataZoomShow ? '60%' : '70%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data?.xaxis,
      axisTick: {
        show: false
      },
      axisLabel: {
        show: true,
      }
    },
    yAxis: {
      type: 'value'
    },
    dataZoom: [
      {
        start: 0,
        end: 100,
        show: false
      }
    ],
    series: [
      {
        name: dataName,
        type: 'line',
        data: data?.series,
        areaStyle: {}
      }
    ]
  };
  return option;
};

interface IProps {
  /** 图表的options配置项 */
  options?: { [key: string]: object };
  /** 图表数据 */
  lineData: ILineChartData,
  /** 图表名称 */
  lineName: string;
}

function LineChart(props: IProps) {
  const { options, lineData, lineName } = props;
  if (isEmpty(lineData)) {
    return (
      <Empty
        description="暂无数据"
        style={{ height: '100%', width: '100%' }}
      />
    )
  }
  return (
    <div style={{ width: '100%' }}>
      <ReactECharts option={getLineOptions(lineData, options, lineName)} notMerge theme={echartsTheme.theme} style={{ height: 305 }} />
    </div>
  );
}

export default LineChart;
