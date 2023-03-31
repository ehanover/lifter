import "./Exercise.css"
import { useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from "react-router-dom";
import { ClientContext } from '../App';
import Header from "../Components/Header";


export default function Exercise() {
  const {client} = useContext(ClientContext);
  const {exerciseParam} = useParams();
  const [instances, setInstances] = useState(null);


  useEffect(() => {
    async function fetchInstances() {
      const {data, error} = await client.from("exercises").select("date, total_sets, max_weight, max_reps").eq("name", exerciseParam).order("date");
      if(error) {
        console.log("Exercise.js error fetching instances:", error);
      } else {
        // console.log("instance data:", data);
    
        setInstances(data);
      }
	  }
	  fetchInstances();
  }, [])

  if(!client) {
	  return <Navigate to="/login" replace />
  }

  if(!instances) {
	  return <p>Loading...</p>
  }

  return (
    <div>
      <Header />
      
      <p className="page-title">{exerciseParam}</p>
      <table>
        <tbody>
          {instances.map(e => 
            <tr key={e.date} className="exercise-row">
              <td>{e.date}</td>
              <td>{e.max_reps}x{e.max_weight}</td>
              <td>{e.total_sets}s</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
}
	