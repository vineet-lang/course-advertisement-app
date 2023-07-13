import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Filter from './components/Filter'
import {apiUrl,filterData} from './data.js';
import Cards from './components/Cards'
import { toast } from 'react-toastify';
import Spininer from './components/Spinner'
// import { useEffect } from 'react';
function App() {
  const[courses,setCourses]=useState(null);
  const [loading,setLoading]=useState(true);
  const [category,setCategory]=useState(filterData[0].title);
  const fetchData=async()=>{
    setLoading(true);
    try{
      const res=await fetch(apiUrl);
      const output=await res.json();
      setCourses(output.data);
      
    }
    catch(error){
      toast.error("Something went wrong");
    }
    setLoading(false);
  }
  useEffect(()=>{    
    fetchData();
  },[]);
  return (
    <div className='min-h-screen flex flex-col bg-black '>
    <div>
      <Navbar/>
    </div>
      <div className='bg-black'>
        <div>
          <Filter
            filterData={filterData}
            category={category}
            setCategory={setCategory}
          />
        </div>
        <div className='w-11/12 max-w-{1200px} mx-auto flex flex-wrap justify-center items-center min-h-[15vh]'>
        {
          loading?(<Spininer/>):(<Cards courses={courses} category={category}/>)
        }      
        </div>
      </div>
      
      
    </div>
  );
}

export default App;
