import { Demo, Hero } from "./components";
import "./styles.scss";

function App() {
  return (
    <main>
      <div className="main">
        <div className="gradient"></div>
      </div>

      <div className="app">
        <Hero />
        <Demo />
      </div>
    </main>
  );
}

export default App;
