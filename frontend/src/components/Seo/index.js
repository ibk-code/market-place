import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import SkipToContent from "../A11y/SkipToContent";

class Seo extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>{`Market Place- ${this.props.page}`}</title>
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        <SkipToContent content="main" />
        {this.props.children}
      </React.Fragment>
    );
  }
}

export default Seo;

Seo.propTypes = {
  page: PropTypes.string,
  children: PropTypes.node,
};
