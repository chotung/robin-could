import React, { useEffect } from "react"
import { stockSelector, getStock } from './reducers/stocks/StockSlice'
import { useSelector, useDispatch } from "react-redux"
import "./App.css"
import StockSummary from './pages/StockSummary'

function App() {
  const dispatch = useDispatch()
	const { stock, loading, errors } = useSelector(stockSelector)

  // console.log(stock, loading, errors)

  useEffect(() => {
    // dispatch(getStock())
  }, [dispatch])


  return (
		<div className="App">
			<StockSummary />
		</div>
	)
}

export default App