export interface IStatisticalCard {
  label: string;
  value?: number | string;
  tipText?: string;
  className?: string;
}

export interface IPieChartData {
  /** 名称 */
  name: string;
  /** 数值 */
  value: number;
}

export interface ITreeData {
  title: string;
  label: string;
  value: number;
  children: ITreeData[];
}

// 筛选器
export interface IFilterParams {
  /** 部门id */
  deptIdList: number[];
  /** 开始时间 */
  startDate: string;
  /** 结束时间 */
  endDate: string;
}

export interface ILineChartData {
  series: number[];
  xaxis: string[];
  xaxisInfo: string[];
}