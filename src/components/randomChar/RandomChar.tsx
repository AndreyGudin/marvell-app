import { Component, ReactNode } from "react";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import MarvelService from "../../services/MarvelService";
import { CharacterInfo } from "../../services/types";

type RandomCharState = {
  char: CharacterInfo
}

class RandomChar extends Component {
  constructor(props:[]){
    super(props);
    this.updateChar();
  }


  state:RandomCharState = {
    char: {name: '',
      description: '',
      thumbnail: '',
      homepage: '',
      wiki: '',}
  }

  marvelService = new MarvelService();

  onCharLoaded = (char:CharacterInfo) =>{
    if (char.description.length === 0) char.description = "Character doesn't have a description";
    this.setState({char});
  }

  updateChar = () =>{
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.marvelService
        .getCharacter(id)
        .then(this.onCharLoaded);
  }

  render(): ReactNode {
    const {name,description,thumbnail,homepage,wiki} = this.state.char;
  
    return (
      <div className="randomchar">
        <div className="randomchar__block">
          <img src={thumbnail as string} alt="Random character" className="randomchar__img" />
          <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
              {description}
            </p>
            <div className="randomchar__btns">
              <a href={homepage as string} className="button button__main">
                <div className="inner">homepage</div>
              </a>
              <a href={wiki as string} className="button button__secondary">
                <div className="inner">Wiki</div>
              </a>
            </div>
          </div>
        </div>
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button className="button button__main">
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

export default RandomChar;
