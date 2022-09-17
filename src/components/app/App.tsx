import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from "../../resources/img/vision.png";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

export type AppState = {
  charId: number | null
}

class App extends Component {

  state:AppState = {
    charId: null
  }

  onCharacterClick = (id:number)=>{
    this.setState({charId: id})
  }

  render() {
    return (
      <div className="app">
        <AppHeader />
        <main>
          <RandomChar />
          <div className="char__content">
            <CharList onCharacterClick={this.onCharacterClick}/>
            <ErrorBoundary>
              <CharInfo charId={this.state.charId}/>
            </ErrorBoundary> 
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    );
  }
}

export default App;
