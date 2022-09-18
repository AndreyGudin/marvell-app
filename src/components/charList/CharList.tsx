import "./charList.scss";
import { Component, ReactNode } from "react";

import MarvelService from "../../services/MarvelService";
import { CharacterInfo } from "../../services/types";
import Spinner from "../spinner/Spinner";
import { isThisTypeNode } from "typescript";

type CharactersState = {
  char: CharacterInfo[];
  loading: boolean;
  error: boolean;
  newItemsLoading: boolean;
  offset: number;
  charEnded: boolean;
};

type CharListProps = {
  onCharacterClick: (id:number) => void;
}

class CharList extends Component<CharListProps> {
  api = new MarvelService();
  itemRefs: HTMLElement [] = [];
  state: CharactersState = {
    char: [] as CharacterInfo[],
    loading: true,
    error: false,
    newItemsLoading:false,
    offset: 210,
    charEnded: false
  };

  constructor(props: CharListProps) {
    super(props);
  }

  setRef = (ref: HTMLElement | null) => {this.itemRefs.push(ref as HTMLElement)}

  focusOnItem = (id: number) => {
    this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
    this.itemRefs[id].classList.add('char__item_selected');
    this.itemRefs[id].focus();
  }

  onRequest = (offset?:number) => {
    this.onCharListLoading();
    this.api.getAllCharacters(offset)
        .then(this.onCharLoaded)
        .catch(this.onError)
  }

  updateCharacters = async () => {
    const res = await this.api.getAllCharacters();
    this.setState({ char: res , loading: false});
  };

  onCharListLoading = () => {
    this.setState({
      newItemsLoading: true
    })
  }

  onCharLoaded = (newCharList: CharacterInfo[]) => {
    let end = false;
    if (newCharList.length < 9){
      end = true;
    }


    this.setState(({char,offset}:CharactersState)=>({
      char: [...char,...newCharList],
      loading: false,
      newItemsLoading: false,
      offset: offset + 9,
      charEnded: end
    }))
  }

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  componentDidMount() {
    this.onRequest();
  }

  renderItems = (char: CharacterInfo[]) => {
    const items = char.map((item, i) => {
    let imgStyle = {'objectFit':'cover'};
    if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
      imgStyle = {'objectFit':'fill'};
    }
      return (
        <li onClick={()=>{
              this.props.onCharacterClick(item.id as number);
              this.focusOnItem(i);
            }} 
            onKeyPress={(e) => {
              if (e.key === ' ' || e.key === "Enter"){
                this.props.onCharacterClick(item.id as number);
                this.focusOnItem(i);
              }
            }}
            key={item.id} 
            className="char__item"
            tabIndex={0}
            ref={this.setRef}>
          <img style={imgStyle as {}} src={item.thumbnail} alt={item.name} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    return (
      <ul className="char__grid">
        {items}
      </ul>
    )
   }

  render(): ReactNode {
    const { char, loading, newItemsLoading,offset, charEnded } = this.state;

    return (
      <div className="char__list">
        <ul className="char__grid">
          {loading ? temp() : this.renderItems(char)}
        </ul>
        <button 
          className="button button__main button__long"
          disabled={newItemsLoading}
          onClick={()=>this.onRequest(offset)}
          style={{'display': charEnded ? 'none' : 'block'}}>
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
