import React from 'react';

const PopularNews = ({ article }) => {
  const { title, urlToImage } = article;
  return (
    <div className="card">
      <div className="image">
        <img src={urlToImage} alt={title} />
      </div>
      <div className="hero-text">
        <h5>{title}</h5>
      </div>
    </div>
  );
};
export default PopularNews;