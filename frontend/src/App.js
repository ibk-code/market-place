import React, { Suspense, lazy } from "react";
import "./sass/main.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const Home = lazy(() => import("./pages/home"));
const AdminSignIn = lazy(() => import("./pages/adminSignIn"));
const AddMarket = lazy(() => import("./pages/addMarket"));
const AdminMarket = lazy(() => import("./pages/admin-market"));
const MarketDetails = lazy(() => import("./pages/marketDetails"));

// let feeds = new News();

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Suspense fallback={<div>Loading....</div>}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/admin-sign" exact component={AdminSignIn} />
              <Route path="/add-market" exact component={AddMarket} />
              <Route path="/admin-market" exact component={AdminMarket} />
              <Route path="/market-info" exact component={MarketDetails} />
            </Switch>
          </Suspense>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
