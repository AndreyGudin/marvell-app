import "./charList.scss";
import { useEffect, useRef, useState } from "react";

import MarvelService from "../../services/MarvelService";
import { CharacterInfo } from "../../services/types";
import Spinner from "../spinner/Spinner";

type CharListProps = {
  onCharacterClick: (id: number) => void;
};

const CharList = (props: CharListProps) => {
  const api = new MarvelService();
  const itemRefs = useRef<HTMLElement[]>([] as HTMLElement[]);
  const [char, setChar] = useState<CharacterInfo[]>([] as CharacterInfo[]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [newItemsLoading, setNewItemsLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(210);
  const [charEnded, setCharEnded] = useState<boolean>(false);

  //const setRef = (ref: HTMLElement | null) => {itemRefs.push(ref as HTMLElement)}

  const focusOnItem = (id: number) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  const onRequest = (offset?: number) => {
    onCharListLoading();
    api.getAllCharacters(offset).then(onCharLoaded).catch(onError);
  };

  const updateCharacters = async () => {
    const res = await api.getAllCharacters();
    setChar(res);
    setLoading(false);
  };

  function onCharListLoading() {
    setNewItemsLoading(true);
  }

  function onCharLoaded(newCharList: CharacterInfo[]) {
    let end = false;
    if (newCharList.length < 9) {
      end = true;
    }
    setChar([...char, ...newCharList]);
    setLoading(false);
    setNewItemsLoading(false);
    setOffset((offset) => offset + 9);
    setCharEnded(end);
  }

  function onError() {
    setLoading(false);
    setError(true);
  }

  useEffect(() => {
    onRequest();
  }, []);

  const renderItems = (char: CharacterInfo[]) => {
    const items = char.map((item, i) => {
      let imgStyle = { objectFit: "cover" };
      if (
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "fill" };
      }
      return (
        <li
          onClick={() => {
            props.onCharacterClick(item.id as number);
            focusOnItem(i);
          }}
          onKeyPress={(e) => {
            if (e.key === " " || e.key === "Enter") {
              props.onCharacterClick(item.id as number);
              focusOnItem(i);
            }
          }}
          key={item.id}
          className="char__item"
          tabIndex={0}
          ref={(el) => (itemRefs.current[i] = el as HTMLElement)}
        >
          <img style={imgStyle as {}} src={item.thumbnail} alt={item.name} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{items}</ul>;
  };

  return (
    <div className="char__list">
      <ul className="char__grid">{loading ? temp() : renderItems(char)}</ul>
      <button
        className="button button__main button__long"
        disabled={newItemsLoading}
        onClick={() => onRequest(offset)}
        style={{ display: charEnded ? "none" : "block" }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

const temp = () => {
  let items = [];
  for (let i = 0; i < 8; i += 1) {
    items.push(
      <li key={i} className="char__item">
        <Spinner />
      </li>
    );
  }
  return items;
};

export default CharList;
