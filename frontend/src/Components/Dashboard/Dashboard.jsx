import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { BarChart } from '@mui/x-charts/BarChart';
import { useGetMonthInfoQuery } from '../../redux/Api/AdminApi';
import { ExpensesForm } from './ExpensesForm';
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export const Dashboard = () => {
  const [chartData, setChartData] = useState({names: ["MON 1", "Mon 2"], values: [1, 2], expenses: [1, 2]});
  const [orderChart, setOrderChart] = useState({names: ["MON 1", "Mon 2"], values: [1, 2]});
  const [orderData, setOrderData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useGetMonthInfoQuery();
  const statistic = data ? data.data : '';
  const income = statistic.totalAmountSum;

  const reload = () => {
    setIsLoading(true);
    axios.get('http://localhost:5001/api/admin/saleChart').then((data) => {
      setIsError(false);
      setIsLoading(false);
      setChartData(data.data.data);
    }).catch((Error) => {
      setIsError(true);
      setIsLoading(false);
    });
  }

  const reloadOrder = () => {
    setIsLoading(true);
    axios.get('http://localhost:5001/api/admin/orderChart').then((data) => {
      setIsError(false);
      setIsLoading(false);
      setOrderChart(data.data.data);
    }).catch((Error) => {
      setIsError(true);
      setIsLoading(false);
    });
  }


  useEffect(() => {
    reload();
  }, []);

  useEffect(() => {
    reloadOrder();
  }, []);


  return (
    <div className='dashboard flex-column'>
        <div className="dashboard-header">
            <h2>DASHBOARD</h2>
        </div>
        <div className="statistics-header">
            <h3>STATISTICS</h3>
        </div>
        <div className="stat-container flex-row">
            <div className="stat flex-column">
                <h3>Orders Count</h3>
                <span className='orders-count'>{statistic.orderCount}</span>
                <span className='month'>{statistic.currentMonth}, {statistic.currentYear}</span>
            </div>
            <div className="stat flex-column">
                <h3>Month Income</h3>
                <span className='orders-count'>{income ? income.toFixed(2): 0}</span>
                <span className='month'>{statistic.currentMonth}, {statistic.currentYear}</span>
            </div>
            <div className="stat flex-column">
                <h3>Products Sold</h3>
                <span className='orders-count'>{statistic.totalProductCount}</span>
                <span className='month'>{statistic.currentMonth}, {statistic.currentYear}</span>
            </div>
        </div>
        <div className="statistics-header">
            <h3>CHARTS</h3>
        </div>
        <div className="expenses-incomes flex-row">
            <div className="chart">
                <BarChart
                    xAxis={[{ scaleType: 'band', data: chartData.names }]}
                    series={[{ data: chartData.values }, { data: chartData.expenses }]}
                    width={800}
                    height={400}
                    colorSet={['#6B292A', '#716D69']}
                />
            </div>
            <ExpensesForm></ExpensesForm>

        </div>

        <div className="order-chart-container">
          <LineChart
            width={800}
            height={350}
            series={[{ data: orderChart.values , label: 'Month Order Count', area: true, showMark:  true }]}
            xAxis={[{ scaleType: 'point', data: orderChart.names }]}
            sx={{
              [`& .${lineElementClasses.root}`]: {
                display: 'none',
              },
            }}
          />
        </div>



    </div>
  )
}
