import { useEffect } from 'react';
import * as echarts from 'echarts';
import echartsTheme from './theme';

export default function useEchartsRegisterTheme() {
  useEffect(() => {
    echarts.registerTheme(echartsTheme.themeName, echartsTheme.theme);
  }, []);
}
