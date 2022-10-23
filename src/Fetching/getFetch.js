import getCharacter from "./getCharacter";
//Could be a custom hook but the implementations of fetching differ a lot in table & tableform
const getFetch = (charactersToFetch, onLoad, onError) => {
    const fetchCharacter = async () => {
        const res = await fetch(getCharacter(charactersToFetch));
        const data = await res.json();

        onLoad(data);
    }

    try{
        fetchCharacter();
    }
    catch(e){
        console.error(`ERROR ON FETCHING: ${e.message}`);
        if(onError) onError();
    }
}

export default getFetch;