import React from 'react';
import '../../SCSS/TableButton/TableButton.scss';

const TableButton = ({text, ...attributes}) => {
  return (
    <button className='table_button' {...attributes}>
        {text}
    </button>
  )
}

export default React.memo(TableButton)