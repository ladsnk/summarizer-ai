import React from "react";
import { logo } from "../assets";
import "../styles/hero.scss";

const Hero = () => {
  return (
    <header className="hero">
      <nav className="hero__nav">
        <img src={logo} alt="summarise logo" className="hero__logo" />

        <button
          type="button"
          onClick={() => window.open("https://github.com/ladsnk/")}
          className="hero__button"
        >
          GitHub
        </button>
      </nav>

      <h1 className="hero__heading">
        Summarize Articles with <br /> <span>OpenAI GPT-4</span>
      </h1>
      <h2 className="hero__description">
        Simplify your reading with Summize, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries
      </h2>
    </header>
  );
};

export default Hero;
