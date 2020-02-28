import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import MerchantDashboard from './pages/MerchantDashboard';
import CreateInvoice from './pages/CreateInvoice';
import Login from './pages/Login';

const App = () => {
  return (
    <div>
      <header className="header">
        <div className="headerLinkContainer">
          <Link to={"/"} className="headerLink">
            Aerarium
          </Link>
        </div>
      </header>
      <main className="pageContent">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/users/login' component={Login}/>
          <Route exact path='/merchant-dashboard' component={MerchantDashboard}/>
          <Route exact path='/create-invoice' component={CreateInvoice}/>
        </Switch>
      </main>
    </div>
  )
};

export default App;
