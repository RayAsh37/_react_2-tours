import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project' //url for providing tours details
function App() {
  const [loading, setLoading] = useState(true) //loading text while content has not ready
  const [tours, setTours] = useState([]) // has the contents returned from the api

  const removeTour = (id) => {
    //remove tour functionality
    const newTours = tours.filter((tour) => tour.id !== id)
    setTours(newTours)
  }

  const fetchTours = async () => {
    setLoading(true) //just extra precaution

    try {
      //to catch any network errors with fetch
      const response = await fetch(url)
      const tours = await response.json()
      console.log(tours)
      setLoading(false)
      setTours(tours)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTours()
  }, []) //run only once at the beginning

  if (loading) {
    //if loading === true display loading component
    return (
      <main>
        <Loading />
      </main>
    )
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className='title'>
          <h2>no tours left</h2>
          <button className='btn' onClick={() => fetchTours()}>
            refresh
          </button>
        </div>
      </main>
    )
  }
  //if loading === false display tours component
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  )
}

export default App
