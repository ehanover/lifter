import { useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from "react-router-dom";
import { ClientContext } from '../App';
import Header from "../Components/Header";


export default function Exercise() {
  const {client, setClient} = useContext(ClientContext);
  const {exerciseParam} = useParams();


  if(!client) {
    return <Navigate to="/login" replace />
  }

  return (
    <div>
      <Header />
      
      <p className="page-title">{exerciseParam}</p>

    </div>
  );
}
    