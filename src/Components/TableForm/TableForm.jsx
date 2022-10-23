import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import getFetch from '../../Fetching/getFetch';
import '../../SCSS/TableForm/TableForm.scss'
import TableButton from '../TableButton/TableButton';

const characterIdsRange = {
    min: 1,
    max: 826
}

const TableForm = ({handleFormOpen, handleAddCharacter, isCharacterAdded}) => {
    const [inputValue, setInputValue] = useState('');
    const [id, setId] = useState(null);
    const [isWarningDisplayed, setIsWarningDisplayed] = useState(false);
    const inputRef = useRef(null);

    const handleInputValue = ({target : {value}}) => {
        setInputValue(() => {
            const filteredValue = parseInt(value.replace(' ', ''));

            //If input becomes empty, set it manually otherwise filteredValue becomes NaN
            if(!filteredValue) return '';
            if(filteredValue < characterIdsRange.min) return characterIdsRange.min;
            if(filteredValue > characterIdsRange.max) return characterIdsRange.max;

            return value;
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if(!inputValue) return inputRef.current.focus();
        setId(parseInt(inputValue));
    }

    useEffect(
        () => {
            if(!id) return;
            if(isCharacterAdded(id)) return setIsWarningDisplayed(true);

            const onDataLoad = (data) => {
                handleAddCharacter(data);
                handleFormOpen();
            }

            getFetch([id], onDataLoad);

        }, [id, handleAddCharacter, isCharacterAdded, handleFormOpen]
    );


  return ReactDOM.createPortal(
    <div className={`form_wrapper`} onClick={handleFormOpen}>
        <form onClick={(e) => e.stopPropagation()} onSubmit={handleFormSubmit}>
            <label htmlFor='character_id_input'>Type character id from <strong>{characterIdsRange.min}</strong> to <strong>{characterIdsRange.max}</strong>:</label>
            <input 
            id='character_id_input'
            ref={inputRef}
            type={'number'} 
            min={characterIdsRange.min} 
            max={characterIdsRange.max}
            placeholder={'E.g 515'}
            value={inputValue}
            onChange={handleInputValue}
            />
            <div className={`form_warning ${isWarningDisplayed ? `` : 'form_warning_off'}`}>Dude, the character is already added!</div>
            <TableButton text={`Add`}/>
        </form>
    </div>
    //Destination
    , document.getElementById('root')
);
}

export default TableForm