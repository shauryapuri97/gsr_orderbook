import React, { useState, useEffect } from 'react';
import { TradingPanel } from './components/Tradingpanel';
import { OrderBook } from './components/OrderBook';
import './App.css';

function App() {

  const [products, setProducts ] = useState([]);
  const [options, setOptions ] = useState([]);

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
  },[products])

  return (
    <div className="App">
      <div className="App-Header">
        <h2>GSR Order Book</h2>
      </div>
      <div className="App-Body">
        <TradingPanel />
        <OrderBook />
      </div>
    </div>
  );
}

export default App;
