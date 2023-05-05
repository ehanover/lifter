import "./Type.css"
import { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from "react-router-dom";
import { ClientContext } from '../App';
import Header from "../Components/Header";


export default function Type() {
  const {client} = useContext(ClientContext);
  const {typeParam} = useParams();
  const [exercises, setExercises] = useState([])

  const push = ["bench", "dip", "decline press machine", "incline press", "incline press machine", "lat raise", "military press", "pec fly", "shoulder press", "tricep overhead pull", "tricep pull down", "tricep pull down split"];
  const pull = ["barbell row", "bar pull", "bar pull iso", "bicep curl", "bicep curl machine", "face pull split", "hammer curl", "high row machine", "low row", "low row split", "preacher curl bench", "preacher curl machine", "pull down", "pull down machine", "pull up", "rear delt", "shrug", "straight arm pull down"];
  const leg = ["squat", "calf raise", "deadlift", "hip abduction", "hip adduction", "leg extension", "leg press", "seated leg curl", "split lunge", "split squat machine", "squat"];

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
      const {data, error} = await client.from("name_distinct").select().order("name"); 
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
      <ul id="type-ul">
        {exercises.map(e =>
          <li className="type-li" key={e}><Link className="type-link" to={"/exercise/" + e}>{e}</Link></li>
        )}
      </ul>

    </div>
  );
}
    