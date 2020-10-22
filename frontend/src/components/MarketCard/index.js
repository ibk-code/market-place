import React, { useState, useEffect, useContext } from "react";
import { getFormattedAdrr } from "../../utils/utils";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

const MarketCard = ({ admin, market, removeMarket }) => {
  const [tranAddr, setTranAddr] = useState("");
  const { deleteMarket } = useContext(GlobalContext);

  const getLocation = async () => {
    const data = await getFormattedAdrr(
      market.location.lat,
      market.location.lng
    );
    setTranAddr(data);
  };

  useEffect(() => {
    getLocation();
  });

  return (
    <React.Fragment>
      <div className="market-card shadow">
        <img src={market.images[0]} alt="market desc" />
        <div className="market-info">
          <p className="bold sm-font green">
            <b>Name:</b> {market.name}
          </p>
          <p className="xs-font">
            <b>Category:</b> {market.category}
          </p>
          <p className="xs-font">
            {" "}
            <i className="fas fa-map-marker-alt"></i> {tranAddr}
          </p>
          <div className="d-flex justify-content-between">
            {admin && (
              <div>
                <button onClick={(e) => deleteMarket(market._id)}>
                  <span className="fas fa-trash"></span>
                </button>
              </div>
            )}
            <Link to={`/market-info?id=${market._id}`}>View</Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MarketCard;
