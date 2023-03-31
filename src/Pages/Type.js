import { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from "react-router-dom";
import { ClientContext } from '../App';
import Header from "../Components/Header";


export default function Type() {
  const {client} = useContext(ClientContext);
  const {typeParam} = useParams();
  const [exercises, setExercises] = useState([])

  const push = ["bench", "dips"];
  const pull = ["pull ups"];
  const leg = ["squat"];

  const filterByType = (name) => {
    if(typeParam === "all") {
      return true;
    } else if(typeParam === "push") {
      if(push.includes(name))
        return true;
    } else if(typeParam === "pull") {
      if(pull.includes(name))
        return true;
    } else if(typeParam === "leg") {
      if(leg.includes(name))
        return true;
    } else {
      return false;
    }

    // if exercise isn't categorized, return true
    if(!push.includes(name) && !pull.includes(name) && !leg.includes(name)) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    if(!client)
      return;

    async function fetchExercises() {
      const {data, error} = await client.from("distinct_name").select().order("name"); 
      // const {data, error} = await client.from("exercises").select("name").order("name");
      if(error) {
        console.log("Type.js failed fetching exercises:", error);
      } else {
        // console.log("exercise data:", data);

        let dataFlat = data.map(d => d.name);
        let dataFiltered = dataFlat.filter(filterByType);
        setExercises(dataFiltered);
      }
    }
    fetchExercises();
  }, [])

  if(!client) {
    return <Navigate to="/login" replace />
  }

  return (
    <div>
      <Header />
      
      <p className="page-title">All {typeParam} exercises</p>
      <ul>
        {exercises.map(e =>
          <li key={e}><Link to={"/exercise/" + e}>{e}</Link></li>
        )}
      </ul>

    </div>
  );
}
    