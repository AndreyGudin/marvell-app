import "./charList.scss";
import { Component, ReactNode } from "react";

import MarvelService from "../../services/MarvelService";
import { CharacterInfo } from "../../services/types";
import Spinner from "../spinner/Spinner";

type CharactersState = {
  char: CharacterInfo[];
  loading: boolean;
  error: boolean;
};

type CharListProps = {
  onCharacterClick: (id:number) => void;
}

class CharList extends Component<CharListProps> {
  api = new MarvelService();
  state: CharactersState = {
    char: [] as CharacterInfo[],
    loading: true,
    error: false,
  };

  constructor(props: CharListProps) {
    super(props);
  }

  updateCharacters = async () => {
    const res = await this.api.getAllCharacters();
    console.log(res);
    this.setState({ char: res , loading: false});
  };

  componentDidMount() {
    this.updateCharacters();
  }

  renderItems = (char: CharacterInfo[]) => {
    return char.map((item) => {
    let imgStyle = {'objectFit':'cover'};
    if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
      imgStyle = {'objectFit':'fill'};
    }
      return (
        <li onClick={()=>this.props.onCharacterClick(item.id as number)} key={item.id} className="char__item">
          <img style={imgStyle as {}} src={item.thumbnail} alt={item.name} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });;
   }

  render(): ReactNode {
    const { char, loading } = this.state;

    return (
      <div className="char__list">
        <ul className="char__grid">
          {loading ? temp() : this.renderItems(char)}
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



export default CharList;
