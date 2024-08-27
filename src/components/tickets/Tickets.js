import React, { useState,useMemo } from "react";
import './Tickets.css';

export default function Tickets({data,search,filterPrio,filterAssigned,setStatus}) {
    
    //toggle box -> set id ##############################
    const [openTicketId, setOpenTicketId] = useState(null);
    
    //priority button ###################################
    const filteredPrioData=data.filter((e) =>
        e.priority.includes(filterPrio)
    );

    data=filteredPrioData;

     //zugewiesen an select ##############################
     const filteredAssignedData=data.filter((e) =>
        e.zugewiesen.includes(filterAssigned)
    );

    data=filteredAssignedData;

    //filter search data #################################
    const filteredSearchData=filteredAssignedData.filter((e) =>
        //search and return -> ohne {}
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.aufgabe.toLowerCase().includes(search.toLowerCase()) ||
        e.priority.toLowerCase().includes(search.toLowerCase()) ||
        e.status.toLowerCase().includes(search.toLowerCase()) ||
        e.zugewiesen.toLowerCase().includes(search.toLowerCase())
    );

    if(search!==''){
        data=filteredSearchData;
    }
  
    return(
    <div className='tickets'>
        {
        data.length
        ? data.map((entry) => (
            <Ticket  key={entry.id} entry={entry} openTicketId={openTicketId} setOpenTicketId={setOpenTicketId}setStatus={setStatus} />
        ))
        : <h2>No results found</h2>
        }
     </div>
    );
};

//ticket ##############################################

function Ticket({entry,openTicketId,setOpenTicketId,setStatus}) {

    //toggle box
    const isOpen = openTicketId === entry.id;
    const toggleDescription = () => {
        if (!isOpen) {
            setOpenTicketId(entry.id); 
        } 
        else{
            setOpenTicketId(false);
        }
        
    };
    //format date #######################################
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
      };
    //formate date to 08.07.2024 15:44:59 -> useMemo
    const date = useMemo(() => formatDate(entry.date), [entry.date]);

    //update ticketstatus ###############################
    const updateStatus = async (status,id) => {
        
        //console.log(status, id);
        const localhost = "http://localhost:10024";
        const url=`${localhost}/api/${status}/${id}/`;
        try {
            const response = await fetch(url, {
                method: 'GET',
            });
            if (response.ok) {
                console.log(`New Status: ${status} ${id}`);
                setStatus(status+id);
            }
        }// end try
        catch (err) {
            console.error(`Fetch problem: ${err.message}`);
        }// end catch

    }
    return(
        <div className={`ticket ${entry.priority}`}>
            <div className='date'>
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
                    <rect x={3} y={4} width={18} height={18} rx={2} ry={2} />
                    <line x1={16} y1={2} x2={16} y2={6} />
                    <line x1={8} y1={2} x2={8} y2={6} />
                    <line x1={3} y1={10} x2={21} y2={10} />
                </svg> 
                {date}
            </div>
            <div className='status'>Status: <span className={`sps${entry.status==='in-progress' ? ' in-progress' :''}`}>{entry.status}</span>  // {entry.zugewiesen}</div>
            <div className={`ticketheader${isOpen ? ' open' : ''}`} onClick={toggleDescription}>
                <h2>{entry.title}</h2>
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
                    <line x1={12} y1={5} x2={12} y2={19} />
                    <polyline points="19 12 12 19 5 12" />
                </svg>
            </div>
            {isOpen &&
                <>
                    <div className="description" dangerouslySetInnerHTML={{ __html: entry.aufgabe }} />
                    <button onClick={() => updateStatus('inprogress',entry.id)}>Set Ticket: In Progress</button>
                    <button onClick={() => updateStatus('closed', entry.id)}>Close Ticket</button>
                </> 
            }
            
        </div> 
    );
};