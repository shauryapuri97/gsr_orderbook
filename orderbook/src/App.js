import React, { useState, useEffect } from 'react';
import { TradingPanel } from './components/Tradingpanel';
import { OrderBook } from './components/OrderBook';
import './App.css';

function App() {

  const [products, setProducts ] = useState([]);
  const [options, setOptions ] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(()=>{
    const headers = {'Accept': 'application/json'}
    try {
      fetch('https://api-public.sandbox.exchange.coinbase.com/products', {headers})
        .then(res => res.json())
        .then(data => setProducts(data))
    } catch (error) {
      console.log("Failed to GET Products ");
      console.log(error);
    }
  },[])

  useEffect(()=>{
    products !== [] && products.map((product)=> {
      if(options && options.some(option => option.label == product.id)) {
        //Do Nothing
      } else {
        setOptions(prevOptions => {
          return [
            ...prevOptions,
            { value: product.id, label: product.id }
          ]
        })
      }
    })
  },[products])

  useEffect(()=> {
    setSelectedProduct(options[0]);
  },[options]);

  const handleChange = (e) => {
    setSelectedProduct(e);
  }

  return (
    <div className="App">
      <div className="App-Header">
        <h1>GSR Crypto Trading</h1>
      </div>
      <div className="App-Body">
        <TradingPanel selectedProduct={selectedProduct} options={options} handleChange={handleChange} />
        <OrderBook selectedProduct={selectedProduct} />
      </div>
    </div>
  );
}

export default App;
