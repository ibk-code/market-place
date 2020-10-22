import React, { createContext, useState } from "react";
import { instance } from "../axios";
import { useHistory } from "react-router-dom";

const GlobalContext = createContext();

const GlobalProvider = (props) => {
  const history = useHistory();
  const [markets, setMarkets] = useState([]);
  const [signedIn, setSignedIn] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("Carbs");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [description, setDescription] = useState("");

  const adminSignIn = async (data) => {
    try {
      const response = await instance({
        method: "post",
        url: "/auth/login",
        data,
      });
      setSignedIn(true);
      window.sessionStorage.setItem("token", response.data.token);
      window.sessionStorage.setItem("signedIn", true);
      console.log(response);
      history.push("/admin-market");
    } catch (error) {
      setSignedIn(false);
    }
  };

  const addMarket = async (files) => {
    let formData = new FormData();
    const filesLength = files.files.length;
    for (var i = 0; i < filesLength; i++) {
      console.log(files.files[i]);
      formData.append("images", files.files[i]);
    }
    formData.append("name", name);
    formData.append("category", category);
    formData.append("lat", lat);
    formData.append("lng", lng);
    formData.append("description", description);
    try {
      const response = await instance({
        method: "post",
        url: "/admin/create",
        data: formData,
        headers: { "content-type": "multipart/form-data" },
      });
      console.log(response);
      history.push("/admin-market");
    } catch (error) {}
  };

  const getAllMarket = async () => {
    try {
      setLoading(true);
      const response = await instance({
        method: "get",
        url: "/admin/all",
      });
      console.log(response.data.market);
      setMarkets(response.data.market);
      window.sessionStorage.setItem(
        "markets",
        JSON.stringify(response.data.market)
      );
      setLoading(false);
    } catch (error) {}
  };

  const getMarketCategory = async (val) => {
    console.log(val);
    try {
      setLoading(true);
      const response = await instance({
        method: "get",
        url: `/admin/category?category=${val}`,
      });
      console.log(response.data.market);
      setMarkets(response.data.market);
      setLoading(false);
    } catch (error) {}
  };

  const getMarketName = async (val) => {
    console.log(val);
    try {
      setLoading(true);
      const response = await instance({
        method: "get",
        url: `/admin/name?name=${val}`,
      });
      console.log(response.data.market);
      setMarkets(response.data.market);
      setLoading(false);
    } catch (error) {}
  };

  const getMarketLocation = async (lat, lng) => {
    console.log(lat, lng);
    try {
      setLoading(true);
      const response = await instance({
        method: "get",
        url: `/admin/location?lat=${lat}&lng=${lng}`,
      });
      console.log(response.data.market);
      setMarkets(response.data.market);
      setLoading(false);
    } catch (error) {}
  };

  const deleteMarket = async (id) => {
    try {
      // setLoading(true);
      const response = await instance({
        method: "delete",
        url: `/admin/delete`,
        data: {
          id,
        },
      });
      if (!response.error) {
        getAllMarket();
      }
    } catch (error) {}
  };

  return (
    <GlobalContext.Provider
      value={{
        adminSignIn,
        addMarket,
        setName,
        setCategory,
        setLat,
        setLng,
        loading,
        setDescription,
        getAllMarket,
        getMarketCategory,
        deleteMarket,
        getMarketLocation,
        getMarketName,
        markets,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
