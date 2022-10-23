import React from 'react'
import TableRow from '../TableRow/TableRow'

const TableRows = ({characters, handleRemoveCharacter}) => {
  return (
    <div className='table_rows'>
        {characters.map(character => 
        <TableRow 
        key={character?.id} 
        {...character} 
        handleRemoveCharacter={handleRemoveCharacter}
        />)}
    </div>
  )
}

export default TableRows