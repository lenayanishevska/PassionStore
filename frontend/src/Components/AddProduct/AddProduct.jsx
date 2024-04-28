import React, { useRef } from 'react';
import "./AddProduct.css"
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;
const props = {
  name: 'file',
  multiple: true,
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};


export const AddProduct = () => {
  return (
    <div className='add-product flex-column'>
        <span className='add-product-header'>ADD PRODUCT</span>
        <div className="add-product-container flex-row">
            <div className="main-product-info flex-column">
                <span>Main Info</span>
                <div className="file-upload">
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                        banned files.
                        </p>
                    </Dragger>  
                </div>

            </div>
            <div className="additional-product-info flex-column">
                <div className="add-product-sizes">

                </div>
                <div className="add-product-attributes">

                </div>
                <button>Add Product</button>
            </div>
        </div>
    </div>
  )
}
