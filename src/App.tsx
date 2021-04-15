import React, { useEffect } from "react"
import { stockSelector, getStock } from './features/stocks/StockSlice'
import { useSelector, useDispatch } from "react-redux"
import "./App.css"

function App() {
  const dispatch = useDispatch()
	const { stock, loading, errors } = useSelector(stockSelector)

  console.log(stock, loading, errors)

  useEffect(() => {
    dispatch(getStock())
  }, [dispatch])

  return <div className="App">Hello world</div>
}

export default App