import React from "react";
import { Container, Form, InputGroup, FormControl } from "react-bootstrap";

const Filter = () => {
  return (
    <React.Fragment>
      <Container>
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <div>
            <p>Category</p>
            <Form.Group controlId="fiter-category">
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
          </div>
          <div>
            <p>Name</p>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search by name"
                aria-label="Search by name"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <button className="mp-btn solid search-btn bg-orange">
                  <span className="fas fa-search"></span>
                </button>
              </InputGroup.Append>
            </InputGroup>
          </div>
          <div>
            <button className="location-btn" type="button">
              <i className="fas fa-map-marker-alt"></i> Use Location
            </button>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Filter;
