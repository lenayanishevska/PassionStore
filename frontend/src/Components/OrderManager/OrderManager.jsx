import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "@mui/material/Select";
import { BarChart } from "@mui/x-charts/BarChart";
import { useGetMonthInfoQuery } from "../../redux/Api/AdminApi";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const OrderManager = () => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const statistic = data ? data.data : "";

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:5001/api/admin/orders")
      .then((data) => {
        setIsError(false);
        setIsLoading(false);
        setData(data.data.data);
      })
      .catch((Error) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  const completeOrder = (orderId) => {
    alert('COMPLE ' + orderId);
  }

  return (
    <div className="dashboard flex-column">
      <div className="dashboard-header">
        <h2>ORDERS</h2>
      </div>

      <table>
        <thead>
          <tr>
            <td>#</td>
            <td>Date</td>
            <td>Total amount</td>
            <td>Status</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (<tr>
            <td>{item.id}</td>
            <td>{item.date}</td>
            <td>{item.total_amount}</td>
            <td>{item.status}</td>
            <td>
              {item.status === 'Processing' ? (
                <button onClick={() => {completeOrder(item.id)}}>Complete ORDER</button>
              ) : null}
            </td>
          </tr>))}
          
        </tbody>
      </table>
    </div>
  );
};
