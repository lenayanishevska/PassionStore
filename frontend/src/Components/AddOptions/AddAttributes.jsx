import React, { useEffect, useState } from 'react'
import { Input } from 'antd';
import axios from "axios";

export const AddAttributes = () => {
    const [attribute, setAttribute] = useState('');
    const [list, setList] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    console.log(attribute);

    const reload = () => {
        setIsLoading(true);
        axios
          .get(`http://localhost:5001/api/shop/products/attributeList`)
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

      const addAttribute = () => {
        axios({
          method: "POST",
          url: "http://localhost:5001/api/shop/attributes/create",
          data: { name: attribute },
        }).then((data) => {
            setAttribute('');
            reload();
        }).catch((error) => {
          alert(error);
        });
      };


  return (
    <div className='add-manufacturer flex-column'>
        <div className="add-manufacturer-input flex-row">
            <div className="manufacturer-input-name flex-column">
                <span className='add-input-name'>Attribute Name:</span>
                <Input placeholder="Attribute" 
                        allowClear 
                        value={attribute}
                        onChange={(e) => setAttribute(e.target.value)}
                    />
            </div>
            <button className='add-options-button' onClick={addAttribute}>Add</button>
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
