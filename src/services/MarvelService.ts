

class MarvelService{
  readonly apiBase = 'https://gateway.marvel.com:443/v1/public/';
  readonly apiKey = 'apikey=509faed9d71f3b06f9eeda57040c800a';
  readonly apiLimit = 'limit=9';
  readonly apiOffset = 'offset=210';
  getResource  =async (url:string) =>{
    let res = await fetch(url);

    if (!res.ok) throw new Error(`Could not fetch ${url}, status: ${res.status}`);

    return await res.json();
  }

  getAllCharacters = ()=>{
    const link = `${this.apiBase}characters?${this.apiLimit}&${this.apiOffset}&${this.apiKey}`;
    return this.getResource(link);
  }

  getCharacter = (id:number) =>{
    const link = `${this.apiBase}characters/${id}?${this.apiKey}`;
    return this.getResource(link);
  }
}

export default MarvelService;