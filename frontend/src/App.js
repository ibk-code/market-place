import React, { Suspense, lazy } from "react";
import "./sass/main.scss";
import { GlobalProvider } from "./context/GlobalContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const Home = lazy(() => import("./pages/home"));
const AdminSignIn = lazy(() => import("./pages/adminSignIn"));
const AddMarket = lazy(() => import("./pages/addMarket"));
const AdminMarket = lazy(() => import("./pages/admin-market"));
const MarketDetails = lazy(() => import("./pages/marketDetails"));

// let feeds = new News();

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Suspense fallback={<div>Loading....</div>}>
          <Switch>
            <GlobalProvider>
              <Route path="/" exact component={Home} />
              <Route path="/admin-sign" component={AdminSignIn} />
              <Route path="/add-market" component={AddMarket} />
              <Route path="/admin-market" component={AdminMarket} />
              <Route path="/market-info" component={MarketDetails} />
            </GlobalProvider>
          </Switch>
        </Suspense>
      </Router>
    </React.Fragment>
  );
};

export default App;
