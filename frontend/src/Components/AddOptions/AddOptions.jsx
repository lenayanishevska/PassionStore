import React from 'react'
import "./AddOptions.css"
import { AddManufacturer } from './AddManufacturer'
import { AddAttributes } from './AddAttributes'
import { AddSize } from './AddSize'
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { saveAs } from 'file-saver';
import axios from "axios";

export const AddOptions = () => {
    const handleExport = () => {
        axios({
          url: 'http://localhost:5001/api/admin/exportCSV',
          method: 'GET',
          responseType: 'blob', // Вказуємо, що очікуємо тип відповіді "blob"
        })
          .then((response) => {
            const blob = new Blob([response.data], { type: 'text/csv' }); // Створюємо Blob об'єкт з отриманих даних
            saveAs(blob, 'products.csv'); // Завантажуємо файл з типом "text/csv"
          })
          .catch((error) => {
            console.error('Error while exporting:', error);
            // Обробка помилки, якщо щось пішло не так
          });
      };
  return (
    <div className='add-options flex-column'>
        <span className='add-product-header add-options-header'>ADD OPTIONS</span>
        <div className="flex-row">
                <span>Export Products in CSV: </span>
                <Button type="primary" shape="round" icon={<DownloadOutlined />} onClick={handleExport} />
        </div>
        <div className="options-containers flex-row">
            <AddManufacturer/>
            <AddAttributes></AddAttributes>
            <AddSize></AddSize>
        </div>


    </div>
  )
}
