import { useEffect, useState } from 'react';
import { Empty } from 'antd';
import PropTypes from 'prop-types'
import ReactECharts, { EChartsOption } from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';
import { isEmpty } from 'lodash';

/**
 * 
 * @see https://codesandbox.io/s/lxljr76vp7?file=/index.js:176-186
 */

 const chinaMapData = require('echarts/map/json/china.json')
// 动态获取省份地图数据
const getProvinceMapData = (name: string) => import(`echarts/map/json/province/${name}.json`)

interface IMapItem {
    name: string;
    value: any;
}
interface IOption {
    data: IMapItem[],
    title?: string;
    dataName?: string;
    options?: EChartsOption;
    mapType?: string;
}
const getMapOptions = (params: IOption) => {
    const { data, title, options, dataName, mapType } = params || {};
    const { legend, visualMap, tooltip, series, toolbox } = options || {};
    const numberArr = data?.map(item => item.value) || [10];
    const max = Math.max.apply(null, numberArr)

    return {
        title: {
            text: title,
            subtext: '',
            left: 'center',
        },
        tooltip: {
            trigger: 'item',
            ...(tooltip || {}),
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: [dataName],
            textStyle: {
                fontSize: 22,
            },
            ...(legend || {}),
        },
        visualMap: {
            min: 0,
            max,
            left: 'left',
            top: 'bottom',
            inRange: {
                color: ['#f9f9f9', '#09AAAB'],
            },
            calculable: true,
            precision: 0, // 小数点后几位数字
            textStyle: {
                fontSize: 18,
            },
            ...(visualMap || {}),
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                dataView: { show: false, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: false },
            },
            ...(toolbox || {}),
        },
        series: [
            {
                name: dataName,
                type: 'map',
                mapType,
                roam: true, // 缩放
                // label: { show: true },
                emphasis: {
                    label: {
                        show: true,
                    },
                },
                data,
                ...(series || {}),
            },
        ],
        color: ['#72b3c6', '#72c6ab', '#d6ab69', '#9ba6b2', '#728bc6', '#85a360', '#adac83', '#a37d60', '#d66f69'],
    }
}

interface IProps {
    mapData: IMapItem[];
    name?: string;
    options?: EChartsOption;
    emptyStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    containerClassName?: string;
    /** 当数据为空时是否展示空状态 */
    showEmpty?: boolean;
    mapType?: string;
    dataName?: string;
  }

function ChinaMapView(props: IProps) {
    const { options, mapData, mapType, dataName } = props;
    const [isMapRegistered, setIsMapRegistered] = useState<boolean>(false)

    useEffect(() => {
        if (mapType && mapType !== 'china') {
            getProvinceMapData(mapType)
                .then((mapData) => {
                    echarts.registerMap(mapType, mapData)
                    setIsMapRegistered(true);
                })
                .catch(() => console.log('地图数据加载未完成'))
        } else {
            echarts.registerMap('china', chinaMapData)
            setIsMapRegistered(true);
        }
    }, [mapType])

  if (isEmpty(mapData)) {
    return (
      <Empty
        description="暂无数据"
        style={{ height: '100%', width: '100%' }}
      />
    )
  }
    if (!isMapRegistered) return null;
  return (
    <div style={{ width: '100%' }}>
      <ReactECharts option={getMapOptions({ data: mapData, options, mapType, dataName })} notMerge style={{ height: 305 }} />
    </div>
  );
}

export default ChinaMapView

ChinaMapView.defaultProps = {
    data: [],
    title: '',
    dataName: '数据',
    mapType: 'china',
}
ChinaMapView.propTypes = {
    /** 数据信息： [{ name, value }] 对应 [{ 地区名， 值 }]*/
    data: PropTypes.arrayOf(PropTypes.shape({
        provinceCode: PropTypes.any,
        name: PropTypes.string,
        value: PropTypes.number,
    })),
    /** 图表标题*/
    title: PropTypes.string,
    /** 显示在地图上的数据名称，鼠标悬停在省份上时显示的内容*/
    dataName: PropTypes.string,
    /** 地图类型*/
    mapType: PropTypes.oneOf([
        'china',
        'beijing',
        'tianjin',
        'behei',
        'shanxi',
        'neimenggu',
        'liaoning',
        'jilin',
        'heilongjiang',
        'shanghai',
        'jiangsu',
        'zhejiang',
        'anhui',
        'fujian',
        'jiangxi',
        'shandong',
        'henan',
        'hubei',
        'hunan',
        'guangdong',
        'guangxi',
        'hainan',
        'chongqing',
        'sichuan',
        'guizhou',
        'yunnan',
        'xizang',
        'shanxi1',
        'gansu',
        'qinghai',
        'ningxia',
        'xinjiang',
        'taiwan',
        'xianggang',
        'anmen',
    ]),
}
