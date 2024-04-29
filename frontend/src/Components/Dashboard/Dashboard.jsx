import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { BarChart } from '@mui/x-charts/BarChart';
import { useGetMonthInfoQuery } from '../../redux/Api/AdminApi';
import { ExpensesForm } from './ExpensesForm';

export const Dashboard = () => {
  const [chartData, setChartData] = useState({names: ["MON 1", "Mon 2"], values: [1, 2], expenses: [1, 2]});
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

  useEffect(() => {
    reload();
  }, []);

  useEffect(() => {
    reload();
  }, [chartData]);

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
            <h3>CHART</h3>
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
    </div>
  )
}
