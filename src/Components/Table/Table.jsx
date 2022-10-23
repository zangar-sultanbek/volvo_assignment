import React, { useCallback } from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import getFetch from '../../Fetching/getFetch';
import '../../SCSS/Table/Table.scss'
import TableButton from '../TableButton/TableButton';
import TableForm from '../TableForm/TableForm';
import TableRows from '../TableRows/TableRows';

const tableHeaders = ['ID', 'Character', 'Full name', 'Species', 'Status', 'Actions'];
const charactersToFetch = [69, 2, 401, 300, 1];

const Table = () => {
    const [characters, setCharacters] = useState([]);
    const [error, setError] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const charactersMemoSorted = useMemo(
        () => [...characters].sort((a, b) => a?.id - b?.id), [characters]
    );

    const handleRemoveCharacter = useCallback(
        (id) => setCharacters(state => state.filter(character => character.id !== id))
        , []
    );
    const handleAddCharacter = useCallback(
        (newCharacter) => setCharacters(state => [newCharacter, ...state,]), []
    );
    const handleFormOpen = useCallback(
        () => setIsFormOpen(state => !state), []
    )
    const isCharacterAdded = useCallback(
        idToCheck => charactersMemoSorted.some(character => character.id === idToCheck), [charactersMemoSorted]
    );

    useEffect(
        () => {
            const onDataLoad = (data) => setCharacters(data);
            const onError = (e) => setError(e.message);

            getFetch(charactersToFetch, onDataLoad, onError);
        }
        , []
    );

    if(error) return <h1>UNPREDICTED ERROR: {error}</h1>

    

  return (
    <>
        <div className='table'>
            <div className="table_headers">
                {tableHeaders.map(header => <div className='table_cell' key={header}>{header}</div>)}
            </div>
            {characters.length
            ? <TableRows characters={charactersMemoSorted} handleRemoveCharacter={handleRemoveCharacter}/>
            : <div className='table_empty_warning'>Add some characters!</div>}
            <TableButton text={`Add a character`} onClick={handleFormOpen} type='button'/>
            
            {/*Conditional rendering instead of display:none, because TableForm has a lot of states that need to be resetted on unmount*/}
            {isFormOpen
            &&
            <TableForm 
            isFormOpen={isFormOpen} 
            handleFormOpen={handleFormOpen} 
            handleAddCharacter={handleAddCharacter}
            isCharacterAdded={isCharacterAdded}/>}
        </div>
        
    </>
  )
}

export default Table