import { useState } from "react";

const FetchNews = ({ ticker }) => {
  const [news, setNews] = useState([]); 
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(null); 

  const fetchNews = async () => {
    setLoading(true); 
    setError(null); 

    try {
      
      const res = await fetch(
        `https://api.marketaux.com/v1/news/all?filter_entities=true&limit=3&published_after=2025-01-27T03:26&api_token=0IqXjtXDF4XuAKsC15buTITFvyIUl7t9xsfz5li7&symbols=${ticker}`
      );

      
      if (!res.ok) {
        throw new Error("Unable to fetch news data");
      }

      
      const data = await res.json();

      
      if (data.data && Array.isArray(data.data)) {
        setNews(data.data); 
      } else {
        throw new Error("Invalid data format");
      }
    } catch (err) {
      setError(err.message); 
    } finally {
      setLoading(false); 
    }
  };

}