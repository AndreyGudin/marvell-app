import {useEffect, useState } from "react";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import MarvelService from "../../services/MarvelService";
import { CharacterInfo } from "../../services/types";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

export type RandomCharState = {
  char: CharacterInfo | null;
  loading: boolean;
  error: boolean;
};

const RandomChar = ()=> {
  const [character,setChar] = useState<CharacterInfo | null>({ name: "", description: "", thumbnail: "", homepage: "", wiki: "" })
  const [isLoading,setLoading] = useState<boolean>(true);
  const [isError,setError] = useState<boolean>(false);
  const marvelService = new MarvelService();

  const onCharLoaded = (char: CharacterInfo) => {
    if (char.description.length === 0)
      char.description = "Character doesn't have a description";
    setChar(char);
    setLoading(false);
  };

  const onCharLoading = () => {setLoading(true);}

  const onError = () => {
    setLoading(false);
    setError( true);
  };

  const updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    onCharLoading();
    marvelService
      .getCharacter(id)
      .then(onCharLoaded)
      .catch(onError);
  };

  useEffect(()=>{
    updateChar();
  },[])


    const errorMessage = isError ? <ErrorMessage/> : null;
    const spinner = isLoading ? <Spinner/> : null;
    const content = !(isLoading || isError) ? <View char={character as CharacterInfo}/> : null;

    return (
      <div className="randomchar">
        {errorMessage}
        {spinner}
        {content}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button className="button button__main">
            <div onClick={updateChar} className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
}

const View = ({ char }: { char: CharacterInfo }) => {
  const { name, description, thumbnail, homepage, wiki } = char;
  let imgStyle = {'objectFit':'cover'};
  if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
    imgStyle = {'objectFit':'fill'};
  }
  return (
    <div className="randomchar__block">
      <img
        src={thumbnail as string}
        alt="Random character"
        className="randomchar__img"
        style={imgStyle as {}}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
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
  );
};

export default RandomChar;
