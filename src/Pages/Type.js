import { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from "react-router-dom";
import { ClientContext } from '../App';
import Header from "../Components/Header";


export default function Type() {
  const {client, setClient} = useContext(ClientContext);
  const {typeParam} = useParams();
  const [exercises, setExercises] = useState([])

  useEffect(() => {
    setExercises(["aa", "bb", "cc"])
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
    