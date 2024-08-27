import React, { useState} from "react";
import Container from "../container/Container.js";
import Button from "../button/Button.js";
import "./SearchBar.css";

export default function SearchBar({search,setSearch,setfilterPrio,filterAssigned,setFilterAssigned,employees}) {

  const [activeButton, setActiveButton] = useState('');

  //priority buttons
  const handleClick = (buttonValue) => {
    setfilterPrio(buttonValue);
    setActiveButton(buttonValue);
    // show all button
    if(buttonValue===''){
      setFilterAssigned('');
    }
  };

  return (
    <Container className=" searchbar">
      <Button
        buttontext={"High"}
        className={" alert"}
        value={"priority-high"}
        handleClick={handleClick}
        isActive={activeButton === "priority-high"}
      />
      <Button
        buttontext={"Medium"}
        className={" medium"}
        value={"priority-medium"}
        handleClick={handleClick}
        isActive={activeButton === "priority-medium"}
      />
      <Button
        buttontext={"Low"}
        className={" ok"}
        value={"priority-low"}
        handleClick={handleClick}
        isActive={activeButton === "priority-low"}

      />
      <Button 
        buttontext={"Show All"} 
        value={""}
        handleClick={handleClick}
        isActive={activeButton === ""}
      />
      <SelectEmployees filterAssigned={filterAssigned} setFilterAssigned={setFilterAssigned} employees={employees}/>
      <Search search={search} setSearch={setSearch} />
    </Container>
  );
}

//search input #######################################
function Search({search,setSearch}) {

  //textfeld leeren beim focus
  const handleFocus = () => {
    setSearch('');  
  };

  const handleSearch = (e) => {
    const searchFor = e.target.value.toLowerCase();
    setSearch(searchFor);
  };

  return (
    <div className="search">
      <input
        name="search"
        type="text"
        placeholder="Search..."
        value={search}
        onFocus={handleFocus}
        onChange={handleSearch}
      />
      <svg
        viewBox="0 0 24 24"
        width={24}
        height={24}
        stroke="currentColor"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx={11} cy={11} r={8} />
        <line x1={21} y1={21} x2="16.65" y2="16.65" />
      </svg>
    </div>
  );
}

//mitarbeiter select #######################################
function SelectEmployees({filterAssigned,setFilterAssigned,employees}) {

  const handelAssigned = (e) => {
    setFilterAssigned(e.target.value);
  }

  return (
  <div className="select">
    <select
        value={filterAssigned}
        onChange={handelAssigned}
    >
        <option key='1' value=''>
          Zugewiesen an:
        </option>
        {employees.map(option => (
            <option key={option.id} value={option.title}>
                {option.title}
            </option>
        ))}
    </select>
  </div>
  );
}