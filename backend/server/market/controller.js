import Market from "./model/marketModel";
import { imageUpload } from "./imageUpload";

const createMarket = (req, res, next) => {
  try {
    console.log(req.files);
    const imgUrl = req.files.map((e) => {
      return process.env.baseUrl + e.path;
    });
    console.log(imgUrl);
    const newMarket = new Market({
      name: req.body.name,
      category: req.body.category,
      "location.lat": req.body.lat,
      "location.lng": req.body.lng,
      images: imgUrl,
      description: req.body.description,
    });

    newMarket.save();

    res.status(200).json({
      error: false,
      message: "The market has been created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: true,
      message: "Something went wrong with your request",
    });
  }
};

const getAllMarket = (req, res) => {
  Market.find({}, "id name category images location description")
    .then((obj) => {
      res.status(200).json({
        error: false,
        message: "All market place",
        market: obj,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: true,
        message: "Could not get all your request",
      });
    });
};

const getMarketByCategory = (req, res) => {
  console.log(req.query.category);
  Market.find(
    { category: req.query.category },
    "_id name category images location description"
  )
    .then((obj) => {
      console.log(obj);
      res.status(200).json({
        error: false,
        message: "Successful",
        market: obj,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: true,
        message: "Your request Failed. Check your request",
      });
    });
};

const getMarketBylocation = (req, res) => {
  Market.find({}, "id name category images location description")
    .then((obj) => {
      console.log(req.query);
      let nearestLocation = obj.filter((e) => {
        return (
          Math.trunc(e.location.lat) === Math.trunc(+req.query.lat) &&
          Math.trunc(e.location.lng) === Math.trunc(+req.query.lng)
        );
      });

      console.log(nearestLocation);

      res.status(200).json({
        error: false,
        message: "Successful",
        market: nearestLocation,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: true,
        message: "Your request Failed. Check your request",
      });
    });
};

const getMarketByName = (req, res) => {
  console.log(req.query);
  Market.find(
    { name: req.query.name },
    "id name category images location description"
  )
    .then((obj) => {
      res.status(200).json({
        error: false,
        message: "Successful",
        market: obj,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: true,
        message: "Your request Failed. Check your request",
      });
    });
};

const updateMarket = (req, res) => {
  Market.findByIdAndUpdate(
    req.body.id,
    { ...req.body.fields },
    { useFindAndModify: false, new: true },
    (err, resp) => {
      if (err) {
        res.status(400).json({
          error: true,
          message: "An error occured updating market",
        });
      } else {
        res.status(200).json({
          error: false,
          message: "updated market",
          market: resp,
        });
      }
    }
  );
};

const removeMarket = (req, res) => {
  Market.findByIdAndDelete(req.body.id, (err, resp) => {
    if (err) {
      res.status(400).json({
        error: true,
        message: "An error occured removing market",
      });
    } else {
      res.status(200).json({
        error: false,
        message: "Market as successfully removed",
      });
    }
  });
};

export {
  createMarket,
  getAllMarket,
  getMarketByCategory,
  getMarketByName,
  getMarketBylocation,
  updateMarket,
  removeMarket,
};
