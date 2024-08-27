import React, { useState, useEffect } from "react";
import "./assets/css/main.css";
import useApi from "./customhooks/useApi.js";
import SearchBar from "./components/searchbar/SearchBar.js";
import Tickets from "./components/tickets/Tickets.js";

export default function App() {
  const [search, setSearch] = useState("");
  const [filterPrio, setfilterPrio] = useState("");
  const [filterAssigned, setFilterAssigned] = useState("");
  const [status, setStatus] = useState("");

  const localhost = "http://localhost:10024";
  const [ticketsLoading, ticketsData] = useApi(localhost + "/tickets/",status);
  const [employeesLoading, employeesData] = useApi(localhost + "/mitarbeiter/");
 
  if (ticketsLoading) {
    // console.log(ticketsData);
  }
  if (employeesLoading) {
     // console.log(employeesData);
  }

  return (
    <>
      <div className="maincontainer">
        <main>
          <SearchBar search={search} setSearch={setSearch} setfilterPrio={setfilterPrio} filterAssigned={filterAssigned} setFilterAssigned={setFilterAssigned} employees={employeesData}/>
          <Tickets data={ticketsData} search={search} filterPrio={filterPrio} filterAssigned={filterAssigned} setStatus={setStatus}/> 
        </main>
      </div>
    </>
  );
}
