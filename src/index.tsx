import React from "react";
import ReactDOM from "react-dom/client";
import App from './components/app/App';
import MarvelService from './services/MarvelService';

import './style/style.scss';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
 
const marvel = new MarvelService();
marvel.getCharacter(1011052).then(res => console.log(res));

root.render(<App/>);
