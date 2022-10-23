import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'

const EditSvg = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><path fill="#626262" d="M41.974 6.025a6.907 6.907 0 0 0-9.768 0L8.038 30.198a6.007 6.007 0 0 0-1.572 2.758L4.039 42.44a1.25 1.25 0 0 0 1.52 1.521l9.487-2.425a6.007 6.007 0 0 0 2.76-1.572l24.168-24.171a6.907 6.907 0 0 0 0-9.768Zm-8 1.768a4.407 4.407 0 0 1 6.233 6.232L38 16.232L31.768 10l2.206-2.207ZM30 11.768L36.232 18L16.038 38.196a3.507 3.507 0 0 1-1.611.918l-7.443 1.903l1.904-7.442c.156-.61.473-1.166.917-1.61L30 11.768Z"/></svg>
const DeleteSvg = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="gray" d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8L2.146 2.854Z"/></svg>


const TableRow = ({id, image, name, species, status, handleRemoveCharacter}) => {
  const [characterDetails, setCharacterDetails] = useState({name, species, status});
  const [isEditable, setIsEditable] = useState(false);
  const nameInputRef = useRef(null);

  const handleCharacterDetails = ({target : {name, value}}) => setCharacterDetails(state => ({...state, [name] : value}));
  const handleEditable = () => setIsEditable(state => !state);
  const removeCharacter = () => handleRemoveCharacter(id);

  useEffect(
    () => {
      if(!isEditable) return;

      nameInputRef.current.focus();
    }, [isEditable]
  );

  return (
    <div className={`table_row character ${isEditable ? 'table_row_editable' : ''}`}>
        <div className='table_cell character_id'>{id}</div>
        <img className='table_cell character_avatar' src={image} alt={`${name}_avatar`}/>
        {Object.keys(characterDetails).map((key, index) => 
          <input 
          ref={index === 0 ? nameInputRef : undefined}
          type='text'
          key={key} 
          className={`table_cell character_${key} ${key === 'status' && characterDetails[key].toLowerCase() === 'dead' ? 'character_status_dead' : ''}`} 
          name={key} 
          disabled={!isEditable}
          value={characterDetails[key]} 
          placeholder={`${key} unset`}
          onChange={handleCharacterDetails}/>)
        }
        <div className='character_actions'>
            <button 
            className='character_actions_btn character_actions_edit_btn' 
            type='button'
            onClick={handleEditable}>{EditSvg}</button>
            <button 
            className='character_actions_btn character_actions_delete_btn' 
            type='button'
            onClick={removeCharacter}
            >{DeleteSvg}</button>
        </div>
    </div>
  )
}

export default React.memo(TableRow);