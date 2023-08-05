import "./App.css";
import { useEffect, useState } from "react";

function Quote({ author, content }) {
  return (
    <article>
      <span>
        {content} - {author}
      </span>
    </article>
  );
}

function App() {
  const [quotes, setQuotes] = useState([]);
  const [newQuote, setNewQuote] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/quotes")
      .then((res) => res.json())
      .then((result) => setQuotes(result.quotes));
  }, []);

  const mapQuotes = () => {
    return quotes.map((quote) => (
      <li key={quote.id}>
        <Quote author={quote.author} content={quote.quote} />
      </li>
    ));
  };

  const createQuote = () => {
    setQuotes([
      ...quotes,
      { id: quotes.length, author: "You", quote: newQuote },
    ]);
    setNewQuote("");
  };

  return (
    <div className="App">
      <section>
        <ol>{mapQuotes()}</ol>
      </section>

      <section>
        <label>Quote name</label>
        <input
          value={newQuote}
          onChange={(event) => setNewQuote(event.target.value)}
        />
        <button onClick={createQuote}>Add quote</button>
      </section>
    </div>
  );
}

export default App;
