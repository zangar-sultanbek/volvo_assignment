const url = `https://rickandmortyapi.com/api/character/`;

const getCharacter = charactersArr => url + charactersArr.join(',');

export default getCharacter;