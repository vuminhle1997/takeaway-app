import './App.css';
import Home from './components/home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Cart from './components/cart/Cart';
import Payment from './components/payment/Payment';
import React, { useState, useEffect } from 'react';
import { IFaunaProduct, ItemObject, ProductData, ProductObject, IFaunaResponse, IBill } from './utils/types';
import { Receipt } from '@material-ui/icons';
import ReceiptPage from './components/receipt/ReceiptPage';

function App() {
  const [bill, setBill] = useState<IBill>()
  const [hasBill, sethasBill] = useState<boolean>(false)

  useEffect(() => {
    checkBillCookie()
  }, [])

  const checkBillCookie = async() => {
    const config: RequestInit = {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/**"
        }
    }
    const promise = await fetch("/api/payment", config)

    if (promise.ok) {
        const fr: IFaunaResponse<IBill> = await promise.json()

        setBill(fr.data)
        sethasBill(true)
    } else {
        sethasBill(false)
    }
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={() => <Home hasBill={hasBill} bill={bill} />} />
          <Route path="/cart" component={() => <Cart />}/>
          <Route path="/pay" component={() => <Payment />} />
          <Route path="/receipt" component={() => <ReceiptPage bill={bill} />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
