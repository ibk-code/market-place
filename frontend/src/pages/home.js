import React, { useEffect, useContext } from "react";
import Seo from "../components/Seo/";
import Navigation from "../components/Navigation";
import MarketCard from "../components/MarketCard";
import Filter from "../components/Filter";
import { Container } from "react-bootstrap";
import { GlobalContext } from "../context/GlobalContext";

const Home = () => {
  const { getAllMarket, markets, loading } = useContext(GlobalContext);

  useEffect(() => {
    getAllMarket();
    // console.log(markets);
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
          <MarketCard admin={false} key={e._id} market={e} />
        ))}
      </div>
    );
  }
  return (
    <React.Fragment>
      <Seo page="Home">
        <header>
          <Navigation />
          <div className="banner">
            <Container>
              <h1 className="pd-top">
                Welcome <br />
                To The <br />
                MarketPlace
              </h1>
            </Container>
          </div>
        </header>
        <main id="main">
          <section className="md-top">
            <Container>
              <div className="d-flex justify-content-between align-items-baseline">
                <h2 className="green md-font">All Markets</h2>
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

export default Home;
