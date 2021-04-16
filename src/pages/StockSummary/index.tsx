import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { stockSelector, getStock } from '../../reducers/stocks/StockSlice'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment';
// import { extendMoment } from 'moment-range';
// const moment = extendMoment(Moment);

interface OpenPrice {
	v: number;
	vw: number;
	o: number;
	c: number;
	h: number;
	l: number;
	t: number;
	n: number;
}

export default function StockSummary() {
	const dispatch = useDispatch()
	const { stock, loading, errors } = useSelector(stockSelector)
	useEffect(() => {
		dispatch(getStock())

	},[dispatch])
	
	const createGraph = () => {
		const formattedStock = stock.results.map((stockObj:any) => {
			return { open: stockObj.o, time: stockObj.t	 }
		})

		formattedStock.sort((a:any, b:any) => {
			return a.time - b.time
		})
		// rename the variables
		const openPriceArr = formattedStock.map((s:any) => s.open)
		// format time
		const timeArr = formattedStock.map((t:any) => t.time)

		const data = {
			labels: timeArr,
			datasets: [{
				label: stock.ticker,
				backgroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgb(255, 99, 132)',
				data: openPriceArr,
			}]
		}

		const options = {
			responsive: true
		}


		return (
			<Line data={data} options={options} />
		)
	}

	return (
		<>
			<div>
				{stock.status ? createGraph() : null }			
			</div>
		</>
	)
}
