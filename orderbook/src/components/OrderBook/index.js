import React, { useState, useEffect } from 'react';
import './styles.css'

export function OrderBook ({ selectedProduct }) {

    const [asks, setAsks ] = useState({});
    const [bids, setBids ] = useState({});

    useEffect(()=>{
        if (selectedProduct !== null && selectedProduct !== undefined ) {
            setAsks({});
            setBids({});

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
                let tempAsk = {};
                let tempBid = {};
                if(response.type === 'snapshot') {

                    response.asks.forEach(([price, amount]) => (tempAsk[price] = parseFloat(amount)));
                    response.bids.forEach(([price, amount]) => (tempBid[price] = parseFloat(amount)));

                    setAsks(tempAsk);
                    setBids(tempBid);
                    
                } else if(response.type === 'l2update') response.changes.forEach(change => {
                    const [action, price, amount] = change;
                    const parsed = parseFloat(amount);

                    if (action == "buy") {
                        if(parsed)
                            setBids(bids => {return { ...bids, [price]: parsed }})
                        else {
                            const newBids = {...bids}
                            delete newBids[price]
                            setBids(newBids);
                        }
                    } else {
                        if(parsed)
                            setAsks(asks => {return { ...asks, [price]: parsed }})
                        else {
                            const newAsks = {...asks}
                            delete newAsks[price]
                            setAsks(newAsks);
                        }
                    }
                });
            };
            ws.onclose = () => {
                ws.close();
            };
        
            return () => {
                ws.close();
            };
        }
    },[selectedProduct]);

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
        arr && arr.map((item, index) => index < 10 ? (
        <tr key={index}>
            <td> {item[1]} </td>
            <td> {item[0]} </td>
        </tr>
    ): null);

    const objToArr = (obj) => {
        return Object.entries(obj).map(([pr, am]) => [parseFloat(pr), am]).sort((a, b) => b[0] - a[0]);
    }

    return (
        <div className="OrderBook-Panel">
                <table id="bidtable">
                    {orderHead('Bids')}
                    <tbody>{orderRows(objToArr(bids))}</tbody>
                </table>
                <table id="asktable">
                    {orderHead('Asks')}
                    <tbody>{orderRows(objToArr(asks))}</tbody>
                </table>
        </div>
    );
}

export const MemoziedOrderBook = React.memo(OrderBook);