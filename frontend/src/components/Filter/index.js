import React, { useContext, useState } from "react";
import { Container, Form, InputGroup, FormControl } from "react-bootstrap";
import { GlobalContext } from "../../context/GlobalContext";
import { getLocation } from "../../utils/utils";

const Filter = () => {
  const { getMarketCategory, getMarketName, getMarketLocation } = useContext(
    GlobalContext
  );
  const [name, setName] = useState("");

  const sortByName = () => {
    getMarketName(name);
  };

  const positions = (positions) => {
    console.log(positions);
    getMarketLocation(positions.coords.latitude, positions.coords.longitude);
    // setLat(positions.coords.latitude);
    // setLng(positions.coords.longitude);
  };
  return (
    <React.Fragment>
      <Container>
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <div>
            <p>Category</p>
            <Form.Group controlId="fiter-category">
              <Form.Control
                as="select"
                onChange={(e) => {
                  getMarketCategory(e.target.value);
                  console.log(e.target.value);
                }}
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
          </div>
          <div>
            <p>Name</p>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search by name"
                aria-label="Search by name"
                aria-describedby="basic-addon2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <InputGroup.Append>
                <button
                  className="mp-btn solid search-btn bg-orange"
                  onClick={sortByName}
                >
                  <span className="fas fa-search"></span>
                </button>
              </InputGroup.Append>
            </InputGroup>
          </div>
          <div>
            <button
              className="location-btn"
              type="button"
              onClick={() => getLocation(positions)}
            >
              <i className="fas fa-map-marker-alt"></i> Use Location
            </button>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Filter;
