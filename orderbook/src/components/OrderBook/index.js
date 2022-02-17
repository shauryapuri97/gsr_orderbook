import React, { useState, useEffect } from 'react';
import './styles.css'

export const OrderBook = ({ selectedProduct }) => {
    
    const [book, setBook ] = useState(null);
    
    useEffect(()=>{
        console.log(selectedProduct);
        if (selectedProduct !== null && selectedProduct !== undefined ) {
            const product = [];
            product.push(selectedProduct.value);
            const subscribe = {
                type: "subscribe",
                product_ids: product,
                channels: ["level2"]
            };
            const ws = new WebSocket('wss://ws-feed-public.sandbox.exchange.coinbase.com');
        
            ws.onopen = () => {
                ws.send(JSON.stringify(subscribe));
            };
            ws.onmessage = (event) => {
                const response = JSON.parse(event.data);
                if(response.type === 'snapshot') {
                    setBook(response);
                } else if(response.type === 'l2update') {
                    //Update Book
                }
            };
            ws.onclose = () => {
                ws.close();
            };
        
            return () => {
                ws.close();
            };
        }
    },[selectedProduct]);

    return (
        <div className="OrderBook-Panel">
            Order Book
        </div>
    );
}