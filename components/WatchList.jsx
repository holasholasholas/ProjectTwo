import React from "react";
import { useEffect, useState } from "react";
// import '../src/watchList.css';

const AIRTABLE_API_KEY = `${import.meta.env.VITE_AIRTABLE_API_KEY}`;

const Watchlist = ({ watchlist, savedStocks,setSavedStocks }) => {
  

  async function fetchAirtable() {
    const url = `https://api.airtable.com/v0/appnbMRdyW6jkWQGB/Table`;
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


  // syncs with airtable when new info added to watchlist
  useEffect(() => {
    const getData = async () => {
      const airtableData = await fetchAirtable();
      console.log(airtableData.records) 
      // airtable.records is an array of records( a recipe of an object)
      // convert this to an array of stocks( another recipe of an object)
      const stocks = airtableData.records.map( record => record.fields);
      setSavedStocks(stocks); // this shape
    };
    getData();
  }, []);


// [ {}, {}, {}] of savedStocks
// what is th shape of stock
// {} what are the keys of him what is the type of the values
// there is a mismatch
// map is looping through each stock
// taking stock and passing it as props to <li/>



// map, filter and reduce and classic for loop
// const Stock = {
//   fields: { id: 'aapl', symbol: 'blah', changePercent: 69}
// }

 
  return (
    <>
      {savedStocks.map((stock) => (
        <li key={stock.id}> {stock.symbol} {stock.price} {stock.changePercent}</li>
      ))}
    </>
  );
};

export default Watchlist;
