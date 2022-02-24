import React from 'react'
import MainNews from './components/MainNews'
import PopularNews from './components/PopularNews'
import axios from 'axios'
import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'


// the 1st is the variable and the 2nd is the function ex news , setNews
const News = () => {
  const [news, setNews] = useState([])
  const [popular, setPopular] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [searchInput, setSearchInput] = useState("")
  const [query, setQuery] = useState("")

  const handleSubmit = (event)=> {
    event.preventDefault();
    
    setQuery(searchInput);}


  useEffect(()=>{
    setIsLoading(true)

    const fetchMainNews = async () => { 

      try {
        const { data } = await axios.get(
          'https://newsapi.org/v2/everything?domains=wsj.com&apiKey=38e977d804fc4990b9186852b9ebd011', {params: {q:query}});

        console.log(data.articles);
        setNews(data.articles);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchPopular = async () => { 

      try {
        const { data } = await axios.get(
          'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=38e977d804fc4990b9186852b9ebd011');

        console.log(data.articles);
        setPopular(data.articles);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };


    fetchMainNews()
    fetchPopular()
  

  },[query])

  

// 1st div is the main container the entire page
// 2nd div is the main news container that has the 1st article section (repeat this for PopularNews Div)

  return (
    <div className='container'> 
      <div className='header'>
       <h1>Hacker News</h1>

       <form className="search-form" onSubmit={handleSubmit}>
          <input
            placeholder="Search news"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <button type="submit">Submit</button>
        </form>




        </div>

      <div className='flex-box'>
       
      
      {query === '' ? ( // testing if there is search data is or no (if/else statement ===? ):( )
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


        <div className='popular-news'> 
        <h1>Popular News</h1>

        {isLoading ? (
              <p>News is Loading....</p>
            ) : (
              popular.map((article) => (
                <PopularNews key={article.url} article={article} />
              ))
            )}




        </div>
     
     

      </div>

    </div>
  )
}

export default News