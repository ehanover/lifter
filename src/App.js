import "./App.css";
import React, { useState } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Entry from "./Pages/Entry";
import BrowseDate from "./Pages/BrowseDate";
import BrowseType from "./Pages/BrowseType";
import Type from "./Pages/Type";
import Exercise from "./Pages/Exercise";

export const ClientContext = React.createContext(null); // https://stackoverflow.com/a/69675545

export default function App() {

  const [clientState, setClientState] = useState(null);

  return (
    <ClientContext.Provider value={{ client: clientState, setClient: setClientState }}>
      <HashRouter>
        <Routes>
          <Route exact path="/entry" element={<Entry />} />
          <Route exact path="/browse_type" element={<BrowseType />} />
          <Route exact path="/browse_date" element={<BrowseDate />} />
          <Route exact path="/type/:typeParam" element={<Type />} />
          <Route exact path="/exercise/:exerciseParam" element={<Exercise />} />
          <Route exact path="/" element={<Login />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </ClientContext.Provider>
  );
}
