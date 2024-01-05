import React from 'react';

const BoardSize = (props) => {
  const { linChange, colChange, boardLines, boardColumns } = props;

  return (<>
    <div className="textInputs">
      <div className="f2 pr2 inputTitle">Rows:</div>
      <input
        className='f4 pa2 ba textBox'
        type='search'
        placeholder='Type...'
        value={boardLines}
        onChange={linChange}
      />
      <div className="f2 pr2 inputTitle">Columns:</div>
      <input
        className='f4 pa2 ba textBox'
        type='search'
        placeholder='Type...'
        value={boardColumns}
        onChange={colChange}
      />
    </div>
  </>);
}

export default BoardSize;
