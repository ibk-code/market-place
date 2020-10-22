import React, { useEffect, useContext } from "react";
import Seo from "../components/Seo/";
import Navigation from "../components/Navigation";
import MarketCard from "../components/MarketCard";
import Filter from "../components/Filter";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const AdminMarket = () => {
  const { getAllMarket, markets, loading } = useContext(GlobalContext);
  const history = useHistory();

  useEffect(() => {
    const signIn = JSON.parse(window.sessionStorage.getItem("signedIn"));
    if (!signIn || null) {
      history.push("/admin-sign");
    } else {
      getAllMarket();
    }
  }, []);

  let market;
  if (loading) {
    market = <p className="text-center">Loading</p>;
  } else if (markets.length === 0) {
    market = <p className="text-center">No available Market</p>;
  } else {
    market = (
      <div className="all-market">
        {markets.map((e) => (
          <MarketCard admin={true} key={e._id} market={e} />
        ))}
      </div>
    );
  }
  return (
    <React.Fragment>
      <Seo page="Admin Market">
        <header>
          <Navigation />
        </header>
        <main id="main">
          <section className="md-top">
            <Container>
              <div className="d-flex justify-content-between align-items-baseline">
                <h1 className="green md-font">All Markets</h1>
                <Link to="/add-market" className="mp-btn solid bg-orange">
                  <span className="fas fa-plus"></span> Add Market
                </Link>
              </div>
            </Container>
          </section>
          <section className="sm-top">
            <Filter />
          </section>
          <section className="sm-top">
            <Container>{market}</Container>
          </section>
        </main>
      </Seo>
    </React.Fragment>
  );
};

export default AdminMarket;
