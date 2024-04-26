import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "@mui/material/Select";
import { BarChart } from "@mui/x-charts/BarChart";
import { useGetMonthInfoQuery } from "../../redux/Api/AdminApi";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import ReactPaginate from 'react-paginate';
import "react-paginate/theme/basic/react-paginate.css";
import { current } from "@reduxjs/toolkit";

export const OrderManager = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [list, setList] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const reload = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5001/api/admin/orders?page=${page}&itemPerPage=10&sort=date`)
      .then((response) => {
        setIsError(false);
        setIsLoading(false);
        setList(response.data.data.list);
        setPageCount(response.data.data.pageCount);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    reload();
  }, []);

  useEffect(() => {
    reload();
  }, [page]);

  const completeOrder = (orderId) => {
    axios({
      method: "POST",
      url: "http://localhost:5001/api/admin/updateOrder",
      data: { id: orderId, status: "Completed" },
    })
      .then((data) => {
        reload();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const changePage = ({selected}) => {
    setPage(selected);
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
          {list.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.date}</td>
              <td>{item.total_amount}</td>
              <td>{item.status}</td>
              <td>
                {item.status === "Processing" ? (
                  <button
                    onClick={() => {
                      completeOrder(item.id);
                    }}
                  >
                    Complete ORDER
                  </button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={changePage}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className="react-paginate"
        forcePage={page}
      />
    </div>
  );
};
