import React, { useState, useEffect, useRef } from "react";
import Seo from "../components/Seo/";
import Navigation from "../components/Navigation";
import { Container, Form, Row, Col } from "react-bootstrap";
import axios from "axios";

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current
    // { types: ["(cities)"], componentRestrictions: { country: "ng" } }
  );
  autoComplete.setFields(["address_components", "formatted_address"]);
  autoComplete.addListener("place_changed", () => {
    handlePlaceSelect(updateQuery);
    // const place = autoComplete.getPlace();
    // console.log(place);
  });
}

const getUserLat = async (address) => {
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
  let response = await axios({
    method: "get",
    url: url,
  });

  console.log(response);
};

async function handlePlaceSelect(updateQuery) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
  console.log(query);
  getUserLat(query);
}

const AddMarket = () => {
  const getLocation = () => {
    if (window.navigator) {
      let route = window.navigator.geolocation.getCurrentPosition(positions);
      console.log(route);
    }
  };

  const getFormattedAdrr = async (lat, lng) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;

    const response = await axios({
      method: "get",
      url: url,
    });
    setQuery(response.data.results[0].formatted_address);
    console.log(response);
  };

  const positions = (positions) => {
    console.log(positions);
    getFormattedAdrr(positions.coords.latitude, positions.coords.longitude);
  };

  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  return (
    <React.Fragment>
      <Seo page="Add Market">
        <header>
          <Navigation />
        </header>
        <main>
          <section>
            <Container>
              <div className="add-form shadow">
                <Form>
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                  <Row className="align-items-center">
                    <Col md={8}>
                      <Form.Group controlId="adress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          ref={autoCompleteRef}
                          onChange={(event) => setQuery(event.target.value)}
                          placeholder="Enter a City"
                          value={query}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <button
                        className="location-btn"
                        type="button"
                        onClick={getLocation}
                      >
                        <i className="fas fa-map-marker-alt"></i> Use Location
                      </button>
                    </Col>
                  </Row>
                  <Form.Group controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select">
                      <option value="carbs">Carbs</option>
                      <option value="drinks">Drinks</option>
                      <option value="vegetables">Vegetables</option>
                      <option value="fruits">Fruits</option>
                      <option value="dairy">Dairy</option>
                      <option value={"meat & fish"}>{"meat & fish"} </option>
                      <option valu="fats">Fats</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" as="textarea" />
                  </Form.Group>
                  <Form.Group>
                    <Form.File
                      id="image"
                      label="Upload market image - 3 image max of png/jpg"
                      multiple
                      accept=".png,.jpg"
                    />
                  </Form.Group>
                </Form>
              </div>
            </Container>
          </section>
        </main>
      </Seo>
    </React.Fragment>
  );
};

export default AddMarket;
