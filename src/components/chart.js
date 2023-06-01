import dynamic from 'next/dynamic';
import { styled } from '@mui/material/styles';

/**
 * Importing ApexCharts as a dynamic module to avoid server-side rendering.
 * @typedef {import('react-apexcharts').default} ApexChartType
 */

const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => null
});

/**
 * A styled ApexCharts component.
 * @typedef {import('@mui/material').StyledComponentProps<'ApexChartType'>} ChartProps
 * @typedef {import('react').FunctionComponent<ChartProps>} ChartType
 */

export const Chart = styled(ApexChart)``;
