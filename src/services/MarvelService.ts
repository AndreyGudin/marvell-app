import { Character, CharacterInfo, MarvelResponse } from "./types";


class MarvelService{
  readonly apiBase = 'https://gateway.marvel.com:443/v1/public/';
  readonly apiKey = '509faed9d71f3b06f9eeda57040c800a';
  readonly apiLimit = 9;
  readonly apiOffset = 210;

  getResource  =async (url:string):Promise<MarvelResponse> =>{
    let res = await fetch(url);

    if (!res.ok) throw new Error(`Could not fetch ${url}, status: ${res.status}`);

    return await res.json();
  }

  getAllCharacters = async (offset = this.apiOffset):Promise<CharacterInfo[]>=>{
    const link = `${this.apiBase}characters?limit=${this.apiLimit}&offset=${offset}&apikey=${this.apiKey}`;
    const res = await this.getResource(link);
    return res.data.results.map(this.transformCharacter);
  }

  getCharacter = async (id:number):Promise<CharacterInfo> =>{
    const link = `${this.apiBase}characters/${id}?&apikey=${this.apiKey}`;
    const res = await  this.getResource(link);
    return this.transformCharacter(res.data.results[0])
  }

  readonly transformCharacter = (char:Character):CharacterInfo =>{
    return {
      id:char.id,
      name: char.name,
      description: char.description,
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items
    }
  }
}

export default MarvelService;