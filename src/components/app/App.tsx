import { Component, useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from "../../resources/img/vision.png";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

export type AppState = {
  charId: number | null;
};

const App = () => {
  const [charId, setCharId] = useState<number | null>(null);
  
  function onCharacterClick(id: number) {
    setCharId(id);
  }

  return (
    <div className="app">
      <AppHeader />
      <main>
        <RandomChar />
        <div className="char__content">
          <CharList onCharacterClick={onCharacterClick} />
          <ErrorBoundary>
            <CharInfo charId={charId} />
          </ErrorBoundary>
        </div>
        <img className="bg-decoration" src={decoration} alt="vision" />
      </main>
    </div>
  );
};

export default App;
