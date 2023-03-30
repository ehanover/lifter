import { useState } from "react";
import "./MyAutocomplete.css";

// https://www.digitalocean.com/community/tutorials/react-react-autocomplete
// https://codesandbox.io/s/8lyp733pj0?file=/src/Autocomplete.jsx

export default function MyAutocomplete(props) {

  const [name, setName] = useState("");
  const hintLimit = 6;

  const childOnNameChange = (e) => {
    let n = e.target.value.toLowerCase();
    setName(n);

    if(props.onNameChange) {
      props.onNameChange(n); // communicate value back to parent via onChange function passed in prop
    }
  }

  const hintOnClick = (hint) => () => setName(hint);

  const matchingHints = () => props.hints.filter((h) => h.toLowerCase().includes(name)).slice(0, hintLimit);
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
      <input type="text" name="autocomplete-text" className="full-parent-width" id="autocomplete-text" onChange={childOnNameChange} value={name}/>

      <div className="hint-grid">
        {matchingHintsGrid()}
      </div>
      
    </div>
  );
}
