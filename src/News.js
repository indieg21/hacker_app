import React from 'react'
import MainNews from './components/MainNews'
import PopularNews from './components/PopularNews'
import axios from 'axios'
import { useState, useEffect } from 'react'

const News = () => {
  const [news, setNews] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  useEffect(()=>{
    setIsLoading(true)

    const fetchData = async () => { 
    
      try{const {data} = await axios.get('https://newsapi.org/v2/everything?q=tesla&from=2022-01-21&sortBy=publishedAt&apiKey=3452fb8e835d41329449ae3fee158746') 

      console.log(data)
    
    
    }  
    
    
    catch(err){ console.log (err)} 
    
    
    finally{setIsLoading(false)}
  
  
  } 

  fetchData()
  

  },[])

  



  return (
    <div className='container'>

      <div className='flex-box'>
        <MainNews />
        <PopularNews />

      </div>

    </div>
  )
}

export default News