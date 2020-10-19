import React from "react";

const MarketCard = ({ admin }) => {
  return (
    <React.Fragment>
      <div className="market-card shadow">
        <img src="./asset/img/market.jpg" alt="market desc" />
        <div className="market-info">
          <p className="bold sm-font green">Adekunle Market</p>
          <p className="xs-font">
            <b>Category:</b> {`Food Stuff`}
          </p>
          <p className="xs-font">
            {" "}
            <i className="fas fa-map-marker-alt"></i> Adekunle Lagos, Nigeria
          </p>
          <div className="d-flex justify-content-between">
            {admin && (
              <div>
                <button>
                  <span className="fas fa-trash"></span>
                </button>
                <button className="ml-4">
                  <span className="far fa-edit"></span>
                </button>
              </div>
            )}
            <button className="mp-btn">View</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MarketCard;
