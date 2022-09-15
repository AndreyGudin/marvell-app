import "./charList.scss";
import { Component, ReactNode } from "react";
import abyss from "../../resources/img/abyss.jpg";
import MarvelService from "../../services/MarvelService";
import { CharacterInfo } from "../../services/types";
import Spinner from "../spinner/Spinner";

type CharactersState = {
  char: CharacterInfo[];
  loading: boolean;
  error: boolean;
};

class CharList extends Component {
  api = new MarvelService();
  state: CharactersState = {
    char: [] as CharacterInfo[],
    loading: true,
    error: false,
  };

  constructor(props: {}) {
    super(props);
  }

  updateCharacters = async () => {
    const res = await this.api.getAllCharacters();
    console.log(res);
    this.setState({ char: res , loading:false});
  };

  componentDidMount() {
    this.updateCharacters();
  }

  render(): ReactNode {
    const { char, loading } = this.state;

    return (
      <div className="char__list">
        <ul className="char__grid">
          {loading ? temp() : characters(char)}
        </ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

const temp = () => {
  let items = [];
  for (let i = 0; i < 8; i += 1) {
    items.push(
      <li key={i} className="char__item">
        <Spinner/>
      </li>
    );
  }
  return items;
};

const characters = (char: CharacterInfo[]) => { 
  return char.map((item) => {
    return (
      <li key={item.id} className="char__item">
        <img src={item.thumbnail} alt={item.name} />
        <div className="char__name">{item.name}</div>
      </li>
    );
  });;
 }

export default CharList;
