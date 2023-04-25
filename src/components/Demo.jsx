import React, { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

import "../styles/demo.scss";

const Demo = () => {
  const [article, setArticle] = useState({ url: "", summary: "" });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));

      console.log(newArticle);
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="demo">
      {/* Search */}

      <div className="demo__container">
        <form onSubmit={handleSubmit} className="demo__form">
          <img src={linkIcon} alt="link icon" className="demo__link-icon" />

          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            className="demo__input"
            required
          />

          <button type="submit" className="demo__button">
            <p>↵</p>
          </button>
        </form>

        {/* URL History */}
        <div className="demo__histories">
          {allArticles.map((item, index) => (
            <div
              key={index}
              onClick={() => setArticle(item)}
              className="demo__history"
            >
              <div className="demo__copy" onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt="copy icon"
                  className="demo__copy-icon"
                />
              </div>
              <p className="demo__url">{item.url}</p>
            </div>
          ))}
        </div>

        {/* Display Result */}
        <div className="demo__result">
          {isFetching ? (
            <img src={loader} alt="loader" className="demo__loader-icon" />
          ) : error ? (
            <p className="demo__error">
              Well, that wasn't supposed to happen...
              <br />
              <span>{error?.data?.error}</span>
            </p>
          ) : (
            article.summary && (
              <div className="demo__article">
                <h2 className="demo__heading">
                  Article <span>Summary</span>
                </h2>
                <div className="demo__summary-wrapper">
                  <p className="demo__summary">{article.summary}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Demo;
