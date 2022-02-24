import React from 'react'

const SearchBar = ({article}) => {
  const { title, publishedAt, author, urlToImage, description, url } = article;
  return (
    <div className="card">
      <div className="image">
        <img src={urlToImage} alt={title} />
      </div>
      <div className="hero-text">
        <h2>{title}</h2>
        <p>
          <span>{publishedAt}</span> <span>{author}</span>
        </p>
        <p>{description}</p>
        <a href={url} target="_blank" rel="noopener noreferrer">
          News Details
        </a>
      </div>
    </div>
  );
}

export default SearchBar