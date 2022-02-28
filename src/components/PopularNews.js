import React, { useEffect, useState } from "react";
import axios from "axios";

const PopularNews = ({ searchInput }) => {
  const [popularNews, setPopularNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchPopularNews = async () => {
    try {
      const { data } = await axios.get(
        "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=5c4d0fedb56340bb8a3298e9ccdb2e11"
      );
      setPopularNews(data.articles);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    console.log(popularNews);
    fetchPopularNews();
  }, [searchInput]);

  return (
    <>
      {popularNews.map((e) => {
        return (
          <div key={e.title} className="card">
            <div className="image">
              <img src={e.urlToImage} alt={e.title} />
            </div>
            <div className="hero-text">
              <h5>{e.title}</h5>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default PopularNews;
