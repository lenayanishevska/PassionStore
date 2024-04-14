import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { Chart } from 'primereact/chart';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

export const Dashboard = () => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
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
                <span className='orders-count'>152</span>
                <span className='month'>April 2024</span>
            </div>
            <div className="stat flex-column">
                <h3>New Users</h3>
                <span className='orders-count'>50</span>
                <span className='month'>April 2024</span>
            </div>
            <div className="stat flex-column">
                <h3>Products Sold</h3>
                <span className='orders-count'>400</span>
                <span className='month'>April 2024</span>
            </div>
        </div>
        <div className="statistics-header">
            <h3>CHART</h3>
        </div>
        <div className="expenses-incomes flex-row">
            <div className="chart">
                <Chart type="bar" data={chartData} options={chartOptions}/>
            </div>
            <div className="expences-container flex-column">
                <span>Add New Expence:</span>
                <div className="expence-type flex-column">
                        <FormControl fullWidth sx={{ marginBottom: '20px'}}>
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Age"
                                onChange={handleChange}

                            >
                                <MenuItem value='Salary'>Salary</MenuItem>
                                <MenuItem value='Taxes'>Taxes</MenuItem>
                                <MenuItem value='Marketing'>Marketing</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                label="Amount"
                            />
                        </FormControl>
                </div>
                <button>Add</button>
            </div>
        </div>
    </div>
  )
}
