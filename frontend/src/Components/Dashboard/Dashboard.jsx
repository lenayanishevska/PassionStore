import React, { useState } from 'react'
import './Dashboard.css'
import Select from '@mui/material/Select';
import { BarChart } from '@mui/x-charts/BarChart';
import { useGetMonthInfoQuery } from '../../redux/Api/AdminApi';
import { ExpensesForm } from './ExpensesForm';

export const Dashboard = () => {
    const { data } = useGetMonthInfoQuery();
    const statistic = data ? data.data : '';


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
                <span className='orders-count'>{statistic.totalAmountSum}</span>
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
                    xAxis={[{ scaleType: 'band', data: ['Jan', 'Feb', 'Mar','Apr','May','Jun','Jul', 'Aug', 'Sep','Oct','Nov','Des'] }]}
                    series={[{ data: [100, 600, 300, 700, 500, 300, 400, 200, 500, 400, 1000, 800] }, { data: [200, 500, 600, 800, 500, 1000, 300, 600, 400, 700, 1000, 900] }]}
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
