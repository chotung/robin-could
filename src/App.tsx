import React, { useEffect } from "react"
// import { photosSelector, getPhotos } from "./features/photos/PhotoSlice"
import { stockSelector } from './features/stocks/StockSlice'
import { useSelector, useDispatch } from "react-redux"
import "./App.css"

function App() {
  const dispatch = useDispatch()
	const { stock, loading, errors } = useSelector(stockSelector)
  // const { photos, loading, errors } = useSelector(photosSelector)

  console.log(stock, loading, errors)

  useEffect(() => {
    // dispatch()
  }, [dispatch])

  return <div className="App">Hello world</div>
}

export default App