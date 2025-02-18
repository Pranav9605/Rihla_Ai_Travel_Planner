import axios from 'axios'
// Example using fetch
export default async function fetchItinerary(travelQuery) {
    const response = await axios.get("http://127.0.0.1:8000")
    // const data = await response.json();
    console.log(response,'data is showiung success');
    
    return data;
  }