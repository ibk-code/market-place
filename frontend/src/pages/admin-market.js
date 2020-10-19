import React from "react";
import Seo from "../components/Seo/";
import Navigation from "../components/Navigation";
import MarketCard from "../components/MarketCard";
import Filter from "../components/Filter";
import { Container, Form, Row, Col } from "react-bootstrap";

const AdminMarket = () => {
  return (
    <React.Fragment>
      <Seo>
        <header>
          <Navigation />
        </header>
        <main id="main">
          <section className="md-top">
            <Container>
              <div className="d-flex justify-content-between align-items-baseline">
                <h1 className="green md-font">All Markets</h1>
                <button className="mp-btn solid bg-orange">
                  <span className="fas fa-plus"></span> Add Market
                </button>
              </div>
            </Container>
          </section>
          <section className="sm-top">
            <Filter />
          </section>
          <section className="sm-top">
            <Container>
              <div className="all-market">
                <MarketCard admin={true} />
              </div>
            </Container>
          </section>
        </main>
      </Seo>
    </React.Fragment>
  );
};

export default AdminMarket;
