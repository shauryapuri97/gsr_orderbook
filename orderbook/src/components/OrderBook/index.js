import React, { useState, useEffect } from 'react';
import './styles.css'

export const OrderBook = ({ selectedProduct }) => {
    
    const [book, setBook ] = useState(null);
    const [changes, setChanges ] = useState(null);

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
                    setChanges(response.changes)
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

    useEffect(() => {
        if(book !== null) {
            const tempBook = book;
            changes.map(change=> {
                if(change[0] === 'buy') {
                    if(change[2] == 0) {
                        console.log('splicing')
                        tempBook.bids.forEach((e,i)=>{
                            if(e[0] === change[1])
                                tempBook.bids.splice(i, 1)
                        })
                    } else {
                        console.log('changing')
                        tempBook.bids.forEach((e,i)=>{
                            if(e[0] === change[1])
                                tempBook.bids[i] = [change[1], change[2]]
                        })
                    }
                } else if(change[0] === 'sell'){
                    if(change[2] === 0) {
                        console.log('splicing')
                        tempBook.asks.forEach((e,i)=>{
                            if(e[0] === change[1])
                                tempBook.asks.splice(i, 1)
                        })
                    } else {
                        console.log('changing')
                        tempBook.asks.forEach((e,i)=>{
                            if(e[0] === change[1])
                                tempBook.asks[i] = [change[1], change[2]]
                        })
                    }
                }
            })
            setBook(tempBook);
        }
    }, [changes]);

    const orderHead = (title) => (
        <thead>
            <tr>
                <th colSpan="2">{title}</th>
            </tr>
            <tr>
                <th>Amount</th>
                <th>Price</th>
            </tr>
        </thead>
    );
    
    const orderRows = (arr) =>
        arr && arr.sort((a, b) => parseFloat(b[0]) - parseFloat(a[0])) &&
        arr.map((item, index) => index < 10 ? (
        <tr key={index}>
            <td> {item[1]} </td>
            <td> {item[0]} </td>
        </tr>
    ): null);

    return (
        <div className="OrderBook-Panel">
                <table>
                    {orderHead('Bids')}
                    <tbody>{orderRows(book!== null ? book.bids : null)}</tbody>
                </table>
                <table>
                    {orderHead('Asks')}
                    <tbody>{orderRows(book!== null ? book.asks : null)}</tbody>
                </table>
        </div>
    );
}