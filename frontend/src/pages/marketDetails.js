import React, { useState, useEffect } from "react";
import Seo from "../components/Seo/";
import Navigation from "../components/Navigation";
import { Container, Carousel, Row, Col } from "react-bootstrap";
import MapContainer from "../components/MapContainer";
import { getFormattedAdrr } from "../utils/utils";
import queryString from "query-string";

const MarketDetails = () => {
  const markets = JSON.parse(window.sessionStorage.getItem("markets"));
  const [currMarket, setcurrMarket] = useState(null);
  const [tranAddr, setTranAddr] = useState("");

  const getMarket = async () => {
    const param = queryString.parseUrl(window.location.href);
    let market;
    markets.forEach((e) => {
      if (e._id === param.query.id) {
        market = e;
      } else {
        return;
      }
    });

    const data = await getFormattedAdrr(
      market.location.lat,
      market.location.lng
    );
    setTranAddr(data);

    setcurrMarket(market);
  };

  useEffect(() => {
    getMarket();
  });

  let marketInfo;

  if (currMarket === null) {
    marketInfo = <p className="text-center">Getting Market Details</p>;
  } else {
    marketInfo = (
      <Row>
        <Col md={6}>
          <Carousel indicators={false} pause="hover">
            {currMarket.images.map((e, i) => {
              return (
                <Carousel.Item key={i}>
                  <img
                    className="d-block w-100 c-img"
                    src={e}
                    alt={currMarket.name + "description"}
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Col>
        <Col>
          <div>
            <article>
              <p>
                <b>Name:</b> {currMarket.name}
              </p>
              <p>
                <b>Category:</b> {currMarket.category}
              </p>
              <p className="xs-font">
                {" "}
                <b>Location:</b> <i className="fas fa-map-marker-alt"></i>{" "}
                {tranAddr}
              </p>
              <p>
                <b>Description:</b> <br />
                <span className="xs-font">{currMarket.description}</span>
              </p>
            </article>
            <MapContainer
              lat={currMarket.location.lat}
              lng={currMarket.location.lng}
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
        </Col>
      </Row>
    );
  }

  return (
    <React.Fragment>
      <Seo page="Market Info">
        <header>
          <Navigation />
        </header>
        <main id="main">
          <section className="md-top">
            <Container>{marketInfo}</Container>
          </section>
        </main>
      </Seo>
    </React.Fragment>
  );
};

export default MarketDetails;
