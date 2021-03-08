import logo from './logo.svg';
import './App.css';
import Home from './components/home/Home';
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Cart from './components/cart/Cart';
import Payment from './components/payment/Payment';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route path="/cart" component={() => <Cart />}/>
          <Route path="/pay" component={() => <Payment />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
