import React, { useEffect, useState } from 'react'
import { Input } from 'antd';
import axios from "axios";

export const AddManufacturer = () => {
    const [manufacturer, setManufacturer] = useState('');
    const [list, setList] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const reload = () => {
        setIsLoading(true);
        axios
          .get(`http://localhost:5001/api/shop/products/manufacturerList`)
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

      const AddManufacturer = () => {
        axios({
          method: "POST",
          url: "http://localhost:5001/api/shop/manufacturers/create",
          data: { name: manufacturer },
        }).then((data) => {
            setManufacturer('');
            reload();
        }).catch((error) => {
          alert(error);
        });
      };


  return (
    <div className='add-manufacturer flex-column'>
        <div className="add-manufacturer-input flex-row">
            <div className="manufacturer-input-name flex-column">
                <span className='add-input-name'>Manufacturer Name:</span>
                <Input placeholder="Manufacturer" 
                        allowClear 
                        value={manufacturer}
                        onChange={(e) => setManufacturer(e.target.value)}
                    />
            </div>
            <button className='add-options-button'  onClick={AddManufacturer} >Add</button>
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
