import React from "react";
import Seo from "../components/Seo/";
import Navigation from "../components/Navigation";
import { Container, Carousel, Row, Col } from "react-bootstrap";
import MapContainer from "../components/MapContainer";

const MarketDetails = () => {
  return (
    <React.Fragment>
      <Seo>
        <header>
          <Navigation />
        </header>
        <main id="main">
          <section className="md-top">
            <Container>
              <Row>
                <Col md={6}>
                  <Carousel indicators={false} pause="hover">
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src="./asset/img/market.jpg"
                        alt="Market description"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src="./asset/img/market.jpg"
                        alt="Market description"
                      />
                    </Carousel.Item>
                  </Carousel>
                </Col>
                <Col>
                  <div>
                    <article>
                      <p>
                        <b>Name:</b> Adekunle Market
                      </p>
                      <p>
                        <b>Category:</b> Food Stuff
                      </p>
                      <p>
                        <b>Description:</b> <br />
                        <span className="xs-font">
                          is simply dummy text of the printing and typesetting
                          industry. Lorem Ipsum has been the industry's standard
                          dummy text ever since the 1500s, when an unknown
                          printer took a galley of type and scrambled it to make
                          a type specimen book.
                        </span>
                      </p>
                    </article>
                    <MapContainer
                      isMarkerShown
                      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                      loadingElement={<div style={{ height: `100%` }} />}
                      containerElement={<div style={{ height: `400px` }} />}
                      mapElement={<div style={{ height: `100%` }} />}
                    />
                    {/* <div>
                      <Map
                        google={this.props.google}
                        zoom={8}
                        initialCenter={{ lat: 47.444, lng: -122.176 }}
                      />
                    </div> */}
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </Seo>
    </React.Fragment>
  );
};

export default MarketDetails;
