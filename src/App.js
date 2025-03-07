import { useEffect, useState } from "react";
import CardDetail from "./components/CardDetail";
import Cards from "./components/Cards";
import "./App.css";

function App() {
  const [characters, setCaracters] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchCharacters(page);
  }, [page]);

  const fetchCharacters = async (page) => {
    let res = await fetch("https://swapi.dev/api/people/?page=${page}");
    let data = await res.json();
    setCaracters(data.results);
  };

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
    setSelectedCharacter(null);
  };

  const handleBack = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      setSelectedCharacter(null);
    }
  };

  return (
    <div className="App">
      <h1>Star Wars Characters</h1>
      <div className="main-container ">
        <div>
          <Cards
            characters={characters}
            onCharacterClick={fetchCharacterDetails}
          />
        </div>
        <button onClick={handleBack} disabled={page === 1}>
          BACK
        </button>
        <button onClick={handleNext}>NEXT</button>
      </div>
    </div>
  );
}

export default App;
