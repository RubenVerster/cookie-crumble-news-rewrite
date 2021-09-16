import { useState, useEffect } from 'react';
import axios from 'axios';
import ArticlesList from './components/ArticlesList';
import Header from './components/Header';
import Footer from './components/Footer';
import Pagination from './components/Pagination';
import { IArticle } from './types/';

require('dotenv').config();
const { REACT_APP_ACCESS_KEY } = process.env;
const BASE_URL = `https://newsapi.org/v2/everything?q=keyword&apiKey=${REACT_APP_ACCESS_KEY}`;

const App = () => {
  const [newsArticles, setNewsArticles] = useState<IArticle[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [articlesPerPage] = useState<number>(4);

  const retrieveArticles = async () => {
    try {
      const res = await axios.get(BASE_URL);
      await setNewsArticles(res.data.articles);
    } catch (error) {
      alert(
        `Error retrieving data. API calls might have been reached for the time, or, you are trying to make requests that do not originate from localhost :)`
      );
    }
  };

  useEffect(() => {
    retrieveArticles();
  }, []);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = newsArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <Header />
      <ArticlesList articles={currentArticles} />
      <Pagination
        articlesPerPage={articlesPerPage}
        totalArticles={newsArticles.length}
        paginate={paginate}
      />
      <Footer />
    </>
  );
};

export default App;
