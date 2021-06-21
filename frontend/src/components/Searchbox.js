import React, { useState } from 'react';

export const Searchbox = (props) => {
  const [name, setName] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    props.history.push(`/search/name/${name}`);
    setName('');
  };

  return (
    <form className="search" onSubmit={submitHandler}>
      <div className="row">
        <input type="text" name="q" id="q" onChange={(e) => setName(e.target.value)} />

        <button className="lemom" type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
};
