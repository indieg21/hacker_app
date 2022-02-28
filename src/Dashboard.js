import React from "react";
import MainNews from "./components/MainNews";
import PopularNews from "./components/PopularNews";
import axios from "axios";
import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";

// the 1st is the variable and the 2nd is the function ex news , setNews
const Dashboard = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchInput, setSearchInput] = useState("russia");

  useEffect(() => setSearchInput(searchInput), [searchInput]);

  const fetchMainNews = async () => {
    try {
      const { data } = await axios.get(
        "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=5c4d0fedb56340bb8a3298e9ccdb2e11",
        { params: { q: searchInput } }
      );

      setNews(data.articles);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    fetchMainNews();
  }, [searchInput]);

  useEffect(() => {
    fetchMainNews();
  }, [searchInput]);

  // 1st div is the main container the entire page
  // 2nd div is the main news container that has the 1st article section (repeat this for PopularNews Div)

  return (
    <div className="container">
      <div className="header">
        <h1>Hacker News</h1>

        <form className="search-form">
          <input
            placeholder="Search news"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </form>
      </div>

      <div className="flex-box">
        {searchInput === "" ? ( // testing if there is search data is or no (if/else statement ===? ):( )
          <div className="main-news">
            <h1>Main News</h1>

            {isLoading ? (
              <p>News is Loading....</p>
            ) : (
              news.map((article) => (
                <MainNews key={article.url} article={article} />
              ))
            )}
          </div>
        ) : (
          <div className="main-news">
            <h1>Search Result</h1>

            {isLoading ? ( // we only need curly brackets if we are passing a js variable
              <p>News is Loading....</p>
            ) : (
              news.map((article) => (
                <SearchBar key={article.url} article={article} />
              ))
            )}
          </div>
        )}

        <div className="popular-news">
          <h1>Popular News</h1>

          <PopularNews searchInput={searchInput} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
