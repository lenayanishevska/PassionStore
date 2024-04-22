import React, { useState, useRef } from 'react'
import './ProductDetail.css'
import { useParams } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { useGetProductByIdQuery } from '../../redux/Api/ProductsApi.js';
import { useSelector} from 'react-redux';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { InputNumber } from 'primereact/inputnumber';
import { useNavigate } from 'react-router-dom';
import { useAddProductToCartMutation } from '../../redux/Api/OderApi.js';

export const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [sizeId, setSizeId] = useState(null);
  const [visible, setVisible] = useState(false);

  const toastBC = useRef(null);
  const refs = {
    description: useRef(null),
    brand: useRef(null),
    material: useRef(null),
  };
  const navigate = useNavigate();
  const { productId } = useParams();
  const user = useSelector(state => state.userLogin.userInfo);
  const [addProductToCart] = useAddProductToCartMutation();

  const { data, error, isLoading } = useGetProductByIdQuery({ productId: productId });
  const product = data ? data.data : '';

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const name = product.product.name.toUpperCase();
  const image = 'http://localhost:5001/' + product.product.image_url;
  const sizes = product.options;
  const attribetes = product.attributes;

  const clear = () => {
    toastBC.current.clear();
    setVisible(false);
  }

  const navigateLogIn = () => {
    clear();
    navigate('/login');
  }

  const handleAddToCart = async () => {
    if(user) {
      if(sizeId) {
        console.log("user: ", user.id, " quantity: ", quantity, " size: ", sizeId, "product: ", product.id);
        const body = { productId, quantity, sizeId };
        const res = await addProductToCart({ body, userId: user.id }).unwrap();
        navigate('/cart');
      }
      else {
        console.log("Choose size, please!")
      }
    }
    else {
      if (!visible) {
        setVisible(true);
        toastBC.current.clear();
        toastBC.current.show({
            severity: 'success',
            summary: 'Please, Log In to add product to cart!',
            sticky: true,
            content: (props) => (
                <div className="toast-add-to-cart" style={{ flex: '1' }}>
                    <div className="toast-add-cart-text">{props.message.summary}</div>
                    <Button className="toast-add-cart-button" label="Log In" severity="success" onClick={navigateLogIn}></Button>
                </div>
            )
        });
    }
    }
  }

  return (
    <div className='product-detail-page flex-row'>

      {/* Image Slider */}
      <div className="product-images ">
        <Slide>
              <div className="each-slide-effect">
                  <div style={{ 'backgroundImage': `url(${image})` }}>
                  </div>
              </div>
        </Slide>
      </div>


      <div className="product-info flex-column">

        <div className="product-header flex-row">

          <h2>{name}</h2>
          <div className="product-price">
            $ {product.product.price}
          </div>

        </div>

        <hr />

        <div className="product-info-details flex-column">

          <div className="options-container flex-column">

            <div className="colors flex-column">

              <h3>COLOR</h3>

              <div className="color-options flex-row">
                <p>Beige</p>
              </div>
  
            </div>

            <div className="sizes flex-column">

              <h3>SIZE</h3>


              <div className="size-options flex-row">
                {sizes.map((size, index) => {
                  return (
                    <div className='size' key={size.id} onClick={() => {setSizeId(size.id)}} style={{background: sizeId === size.id ? 'var(--beige-color)' : 'inherit'}}>{size.value}</div>
                  )
                })}
              </div>

            </div>

          </div>
          <input type="number" name="quantity" id="quantity" min="0" value={quantity} onChange={(e) => {setQuantity(e.target.value)}}/>

          <button className='add-to-cart-button' onClick={handleAddToCart}>Add to cart</button>

        </div>

        <Toast ref={toastBC} position="top-center" className={visible ? "toast-custom" : ""} onRemove={clear} />
        <hr />

        <div className="product-attribes flex-column">
          <Panel ref={refs.description} header="DESCRIPTION" toggleable collapsed={true}>
              <p className="m-0">
                {product.product.description}
              </p>
          </Panel>
        </div>

        <hr />

        <div className="product-attribes flex-column">
          <Panel ref={refs.brand} header="BRAND" toggleable collapsed={true}>
              <p className="m-0">
                {product.product.Manufacturer.name}
              </p>
          </Panel>
        </div>

        <hr />

        <div className="product-attribes flex-column">
          <Panel ref={refs.material} header="MATERIAL" toggleable collapsed={true}>
              <p className="m-0">
                {product.product.Manufacturer.name}
              </p>
          </Panel>
        </div>

        <hr />

      </div>

      <div className="recommended-po-mozluvosti"></div>
    </div>
  )
}
