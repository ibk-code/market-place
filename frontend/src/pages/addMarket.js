import React, { useState, useEffect, useRef, useContext } from "react";
import Seo from "../components/Seo/";
import Navigation from "../components/Navigation";
import { Container, Form, Row, Col } from "react-bootstrap";
import { GlobalContext } from "../context/GlobalContext";
import { useHistory } from "react-router-dom";
import {
  loadScript,
  getUserLat,
  getFormattedAdrr,
  getLocation,
} from "../utils/utils";

const AddMarket = () => {
  const history = useHistory();
  const {
    addMarket,
    setLat,
    setLng,
    setDescription,
    setCategory,
    setName,
  } = useContext(GlobalContext);

  let autoComplete;

  function handleScriptLoad(updateQuery, autoCompleteRef) {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current
    );
    autoComplete.setFields(["address_components", "formatted_address"]);
    autoComplete.addListener("place_changed", () => {
      handlePlaceSelect(updateQuery);
    });
  }

  const handlePlaceSelect = async (updateQuery) => {
    const addressObject = autoComplete.getPlace();
    const query = addressObject.formatted_address;
    updateQuery(query);
    const loc = await getUserLat(query);
    setLat(loc.data.results[0].geometry.location.lat);
    setLng(loc.data.results[0].geometry.location.lng);
  };

  const positions = (positions) => {
    getFormattedAdrr(
      positions.coords.latitude,
      positions.coords.longitude,
      setQuery
    );
    setLat(positions.coords.latitude);
    setLng(positions.coords.longitude);
  };

  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);
  const fileField = useRef(null);

  useEffect(() => {
    const signIn = JSON.parse(window.sessionStorage.getItem("signedIn"));
    if (!signIn || null) {
      history.push("/admin-sign");
    } else {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
        () => handleScriptLoad(setQuery, autoCompleteRef)
      );
    }
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    addMarket(fileField.current);
  };

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
                <Form
                  // action="http://localhost:4000/v1/admin/create"
                  // method="post"
                  // encType="multipart/form-data"
                  onSubmit={submitForm}
                >
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Row className="align-items-center">
                    <Col md={8}>
                      <Form.Group controlId="adress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          name="location"
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
                        onClick={() => getLocation(positions)}
                      >
                        <i className="fas fa-map-marker-alt"></i> Use Location
                      </button>
                    </Col>
                  </Row>
                  <Form.Group controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      as="select"
                      name="category"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="carbs">Carbs</option>
                      <option value="drinks">Drinks</option>
                      <option value="vegetables">Vegetables</option>
                      <option value="fruits">Fruits</option>
                      <option value="dairy">Dairy</option>
                      <option value="frozen">Frozen</option>
                      <option valu="fats">Fats</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      name="description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.File
                      id="image"
                      name="images"
                      label="Upload market image - 3 image max of png/jpg"
                      multiple
                      ref={fileField}
                      accept=".png,.jpg"
                    />
                  </Form.Group>
                  <button className="mp-btn solid bg-orange">Add Market</button>
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
