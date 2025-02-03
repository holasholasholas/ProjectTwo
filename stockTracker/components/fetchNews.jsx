import { useState, useEffect } from "react";

const FetchNews = ({ ticker })  => {

  const [news, setNews] = useState([]); 
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(null); 

  const VITE_NEWS_APIKEY =`${import.meta.env.VITE_NEWS_APIKEY}`

useEffect(() => {
    
    if (ticker) {
      const fetchNews = async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(
            `https://api.marketaux.com/v1/news/all?filter_entities=true&limit=3&published_after=2025-01-27T03:26&api_token=${VITE_NEWS_APIKEY}&symbols=${ticker}`
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
          setNews([]); 
          setLoading(false);
        }
      };

      fetchNews();
    }
  }, [ticker]); 
return (
    <div>
        <h3>Related News</h3>
        

    {news.length > 0 && (
        <ul>
          {news.map((item) => (
            <li key={item.uuid}>
              <a href={item.url}>
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    
    </div>

    
)

  
};

export default FetchNews;