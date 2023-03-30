import Header from "../Components/Header";
import { ClientContext } from '../App';
import { useContext, useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";


export default function BrowseDate() {
  
  const {client, setClient} = useContext(ClientContext);
  const [dateData, setDateData] = useState(null)

  useEffect(() => {
    if(!client) {
      return;
    }

    async function fetchDates() {
      // https://supabase.com/docs/reference/javascript/select
      const {data, error} = await client.from("exercises").select("date").order("date");
      if(error) {
        console.log("error:", error);
      } else {
        console.log("data:", data);
        setDateData(data);
      }
    }
    fetchDates();

  }, [])

  if(!client) {
    return <Navigate to="/login" replace />
  }

  if(!dateData) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <Header />
      
      <p className="page-title">Browse by Date</p>
      
    </div>
  );
}
    