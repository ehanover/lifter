import "./Entry.css"
import { useEffect, useState, useContext } from "react";
import Header from "../Components/Header";
import MyAutocomplete from "../Components/MyAutocomplete";
import { ClientContext } from '../App';
import { Navigate } from "react-router-dom";


export default function Entry() {

  const {client} = useContext(ClientContext);
  const [hints, setHints] = useState(null);

  const [name, setName] = useState("");
  const [maxWeight, setMaxWeight] = useState("");
  const [maxWeightReps, setMaxWeightReps] = useState("");
  const [totalSets, setTotalSets] = useState("");
  const [date, setDate] = useState("");


  const trim = (s) => s.replace(/^\s+|\s+$/g, '');

  useEffect(() => {
    if(!client)
      return;
    
    let currentDate = new Date();
    setDate(currentDate.toISOString().slice(0, 10));

    async function getHints() {
      // distinct_name is a "view" that aliases to "select distinct name from exercises"
      // see https://github.com/orgs/supabase/discussions/3294#discussioncomment-1374282
      const {data, error} = await client.from("distinct_name").select(); 
      if(error) {
        console.log("Entry.js failed fetching hints:", error);
      } else {
        setHints(data.map(d => d.name));
      }
    }
    getHints();
  }, [])

  const submit = () => {
    // check if name is novel or not (can use hints array) - warn user if novel
    // if(!hints.includes(name)) {
    //   console.log("novel exercise name detected");
    // }

    async function insert(newrow) {
      // console.log("inserting data:", data);
      const {data, error} = await client.from('exercises').insert(newrow);
      if(error) {
        console.log("Entry.js failed inserting new row:", error);
      } else {
        setName("");
        setMaxWeight("");
        setMaxWeightReps("");
        setTotalSets("");
      }
    }
    insert({
      date:date, name:trim(name.toLowerCase()), max_weight:maxWeight, max_reps:maxWeightReps, total_sets:totalSets
    });
  }


  if(!client) {
    return <Navigate to="/login" replace />
  }

  return (
    <div>
      <Header />

      <p className="page-title">Enter New</p>

      <div>
        <label htmlFor="autocomplete-text">Name: </label>
        <br/>
        <MyAutocomplete hints={hints} onNameChange={(e) => setName(e.target.value)} nameValue={name}/>

        <table>
          <tbody>
            <tr>
              <td><label htmlFor="maxWeight">Max weight: </label></td>
              <td className="entry-column"><input type="text" name="maxWeight" inputMode="numeric" maxLength={5} size={4} onChange={(e) => setMaxWeight(e.target.value)} value={maxWeight}/></td>
            </tr>
            <tr>
              <td><label htmlFor="maxWeightReps">Reps with max weight: </label></td>
              <td className="entry-column"><input type="text" name="maxWeightReps" inputMode="numeric" pattern="\d*" maxLength={3} size={4} onChange={(e) => setMaxWeightReps(e.target.value)} value={maxWeightReps}/></td>
            </tr>
            <tr>
              <td><label htmlFor="totalSets">Total sets: </label></td>
              <td className="entry-column"><input type="text" name="totalSets" inputMode="numeric" pattern="\d*" maxLength={3} size={4} onChange={(e) => setTotalSets(e.target.value)} value={totalSets}/></td>
            </tr>
            <tr>
              <td><label htmlFor="date">Date: </label></td>
              <td className="entry-column"><input type="date" name="date" onChange={(e) => setDate(e.target.value)} value={date}/></td>
            </tr>
          </tbody>
        </table>

        <br/>
        <input type="button" value="Submit" onClick={submit}/>

      </div>
    </div>
  );
}
