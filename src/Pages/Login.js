import { createClient } from '@supabase/supabase-js'
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClientContext } from '../App';


export default function Login() {

  const {client, setClient} = useContext(ClientContext);
  const navigate = useNavigate();

  const [domain, setDomain] = useState("");
  const [anonID, setAnonID] = useState("");

  useEffect(() => {
    setClient(null);
  }, [])

  useEffect(() => {
    console.log("client update:", client);
    
    if(client)
      navigate("/browse_date");
  }, [client])

  const onSubmit = () => {
    let supabase = createClient(domain, anonID);
    // console.log("Created supabase instance:", supabase);

    setClient(supabase);
  }

  return (
    <div>
      <p className="page-title">Login</p>

      <br/>
      <label htmlFor="domain">Domain:</label>
      <input type="text" name="domain" className="full-parent-width" onChange={e => setDomain(e.target.value)} value={domain}/>
      <br/>

      <label htmlFor="anonid">Anon ID:</label>
      <input type="text" name="anonid" className="full-parent-width" onChange={e => setAnonID(e.target.value)} value={anonID}/>
      <br/>

      <br/>
      <input type="button" value="Submit" onClick={onSubmit}/>
    </div>
  );
}
