import React, { useEffect, useState } from 'react'
import { Input } from 'antd';
import axios from "axios";

export const AddSize = () => {
    const [size, setSize] = useState('');
    const [list, setList] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const reload = () => {
        setIsLoading(true);
        axios
          .get(`http://localhost:5001/api/shop/products/sizeList`)
          .then((response) => {
            setIsError(false);
            setIsLoading(false);
            console.log(response.data.data);
            setList(response.data.data);
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

      const addSize = () => {
        axios({
          method: "POST",
          url: "http://localhost:5001/api/shop/sizes/create",
          data: { name: size },
        }).then((data) => {
            setSize('');
            reload();
        }).catch((error) => {
          alert(error);
        });
      };



  return (
    <div className='add-manufacturer flex-column'>
        <div className="add-manufacturer-input flex-row">
            <div className="manufacturer-input-name flex-column">
                <span className='add-input-name'>Size Name:</span>
                <Input placeholder="Size" 
                        allowClear 
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                    />
            </div>
            <button className='add-options-button' onClick={addSize}>Add</button>
        </div>
        <div className="table add-options-table">
            <table  className="orders-table" >
            <thead>
                <tr>
                <th>#</th>
                <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {list.map((item) => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                </tr>
                ))}
            </tbody>
            </table>
      </div>
    </div>
  )
}
