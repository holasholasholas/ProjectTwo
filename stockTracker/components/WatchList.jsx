import React from "react";
import { useEffect, useState } from "react";
// import '../src/watchList.css';

const AIRTABLE_API_KEY = `${import.meta.env.VITE_AIRTABLE_API_KEY}`;

const Watchlist = ({ watchlist }) => {
  const [savedStocks, setSavedStocks] = useState([]);

  async function fetchAirtable() {
    const url = `https://api.airtable.com/v0/appnbMRdyW6jkWQGB/Table%201`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
      return json;
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    const getData = async () => {
      const airtableData = await fetchAirtable();

      setSavedStocks(airtableData.records);
    };
    getData();
  }, []);

  return (
    <>
      {savedStocks.map((items) => (
        <li key={items.id}> {items.fields.symbol} {items.fields.price} {items.fields.changePercent}</li>
      ))}
    </>
  );
};

export default Watchlist;
