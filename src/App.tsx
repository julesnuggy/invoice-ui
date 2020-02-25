import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import Home from './Pages/Home';
import MerchantDashboard from './Pages/MerchantDashboard';

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
      <body className="pageContent">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/merchant-dashboard' component={MerchantDashboard}/>
        </Switch>
      </body>
    </div>
  )
};

export default App;
