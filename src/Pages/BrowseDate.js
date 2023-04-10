import "./BrowseDate.css";
import Header from "../Components/Header";
import { ClientContext } from '../App';
import { useContext, useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";


export default function BrowseDate() {
  
  const {client} = useContext(ClientContext);
  const [dateData, setDateData] = useState(null)

  useEffect(() => {
    if(!client) {
      return;
    }

    async function fetchDates() {
      // const {data, error} = await client.from("exercises").select("date, name, max_weight, max_reps, total_sets").limit(100).order("date", {"ascending": false});
      const {data, error} = await client.from("browse_date_sorted").select();
      if(error) {
        console.log("BrowseDate.js failed fetching dates:", error);
      } else {
        console.log("date data length:", data.length);

        let lastDate = data[0].date;
        let lastDateGroup = []
        let dataProcessed = {};
        for(let i=0; i<data.length; i++) {
          if(data[i].date !== lastDate) {
            dataProcessed[lastDate] = lastDateGroup;

            lastDateGroup = [];
            lastDate = data[i].date;
          }
          lastDateGroup.push(data[i]);
        }
        dataProcessed[lastDate] = lastDateGroup;

        // console.log("date data processed:", dataProcessed);
        // console.log("date data processed obj:", Object.entries(dataProcessed));
        setDateData(dataProcessed);
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

      <ul id="date-ul">
        {Object.entries(dateData).map(([date, exercises]) => 
          <li className="date-li" key={date}>
            <span className="date-title">{date}</span>
            {exercises.map((e) => 
              <div key={e.name}>{e.name}, {e.max_weight}x{e.max_reps}, {e.total_sets}s</div>
            )}
          </li>
        )}
      </ul>
      
    </div>
  );
}
    