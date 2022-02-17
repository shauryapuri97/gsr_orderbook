import { TradingPanel } from './components/Tradingpanel';
import { OrderBook } from './components/OrderBook';
import './App.css';

function App() {
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
