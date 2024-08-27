import { useState, useEffect } from 'react';

//custom hook -> export default function useApi #################################
//changed -> auf welche änderung soll ich warten? default nur einmal aufrufen mit []
//set changed defalt ='' -> export default setEffect(() => { fetchData(); }, []
//changed = changed' -> neu aufrufen mit [change]################################
//set changed -> export default seEffect(() => { fetchData(); }, [change]
// ##############################################################################

export default function useApi(url,changed='') {
    const [data, setData] = useState([]);
    //set load to false on load ############
    const [load, setLoad] = useState(false);
    //try to load data from url#############
    const fetchData = async () => { 
      try {
        const response = await fetch(url); 
        const result = await response.json();
        //set data and -> load to true
        //set data##########################
        setData(result); 
        //set load to true #################
        setLoad(true); 

        //error ############################
      } catch (error) {
          console.error('Error fetching data:', error); 
          //error data not loading #########
          //set load to false ##############
          setLoad(false); 
      }
    };
    //return load (true or false) and data ####
    useEffect(() => { fetchData(); }, [changed]);
    return([load, data]);
  }