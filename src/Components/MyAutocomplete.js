import { useState } from "react";
import "./MyAutocomplete.css";

// https://www.digitalocean.com/community/tutorials/react-react-autocomplete
// https://codesandbox.io/s/8lyp733pj0?file=/src/Autocomplete.jsx

export default function MyAutocomplete(props) {

  const hintLimit = 6;

  const hintOnClick = (hint) => () => props.onNameChange(hint);

  const matchingHints = () => props.hints.filter((h) => h.toLowerCase().includes(props.nameValue)).slice(0, hintLimit);
  const matchingHintsGrid = () => {
    if(!props.hints)
      return;

    let mh = matchingHints();
    if(mh.length <= 1) {
      return;
    } else {
      return mh.map((h) => <span key={h} className="hint-item" onClick={hintOnClick(h)}>{h}</span>);
    }
  }


  return (
    <div>
      <input type="text" name="autocomplete-text" className="full-parent-width" id="autocomplete-text" onChange={props.onNameChange} value={props.nameValue}/>

      <div className="hint-grid">
        {matchingHintsGrid()}
      </div>
      
    </div>
  );
}
