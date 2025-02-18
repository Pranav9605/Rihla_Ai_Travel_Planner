
import axios from 'axios'
import './App.css'
import TravelPlanner from './components/fetchIt'
import { useEffect, useState } from 'react'

function App() {

  const [home,setHome] = useState("")

  useEffect(()=>{
   Home() 
  },[])

  async function Home(params) {
    const {data} = await axios.get("http://localhost:8000/")
    console.log(data,'data');
    setHome(data.message)
    return data
  }

  return (
    <>
   <h1>hello world</h1>
   {/* <ItineraryDisplay/> */}
   {/* {home} */}
  
  <TravelPlanner/>
    </>
  )
}

export default App
