import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { stockSelector, getStockInAggragateRange, getFinancials, setDailyOpenClose } from '../../reducers/stocks/StockSlice'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment';
import StockDetails from '../../components/StockDetails'
import { Card, CardBody, Container, Row, Col } from 'reactstrap';
import StockHeader from '../../components/StockHeader';

export default function StockSummary() {
	const dispatch = useDispatch()
	const { stock, financials, daily, loading, errors } = useSelector(stockSelector)

	// console.log(financials);

	useEffect(() => {
		dispatch(getStockInAggragateRange())
		dispatch(getFinancials())
		dispatch(setDailyOpenClose())
	},[dispatch])
		// .startOf('hour').format('h:mm:ss a')
	const formatData = () => {
		const formattedStock = stock.results.map((stockObj: any) => {
			const { o, c, h, l, v, vw, t, n } = stockObj
			const time = moment(t)
			const stockObjectInAggregatedWindow = {
				time,
				open: o,
				close: c,
				highest: h,
				lowest: l,
				volume: v,
				volumeWeightedAvgPrice: vw,
				numberOfTransactionInRange: n
			}
			return stockObjectInAggregatedWindow
		})

		formattedStock.sort((a: any, b: any) => {
			return a.time - b.time
		})
		// rename the variables
		const openPriceArr = formattedStock.map((s: any) => s.open)
		// format time
		const timeArr = formattedStock.map((t: any) => t.time)
		return { open: openPriceArr, time:timeArr }
	}

	const createGradient = (canvas:any) => {
		const ctx = canvas.getContext("2d")
		const gradient = ctx.createLinearGradient(0, 0, 100, 100);
		gradient.addColorStop(1, ' rgb(0,250,154, 0.3)')
		ctx.fillStyle = gradient

		const { open, time } = formatData()

		const data = {
			labels: time,
			datasets: [{
				label: stock.ticker,
				backgroundColor: gradient,
				borderColor: ' rgb(0,250,154)',
				data: open,
			}]
		}
		const options = {
			scales: {
				xAxes: [{
					type: 'time',
					time: {
						unit: 'hour'
					},
					distribution: 'series',
					bounds: 'ticks',
  				ticks: {
						autoSkip: true,
						source: 'data',
					}
				}]
			},
			responsive: true,
			title: {
				display: true,
			},
			legend: {
				display: false
			},
		}
		return { data, options}
	}


	const createGraph = () => {
		const canvas = document.createElement('canvas')
		const { data, options } = createGradient(canvas)

		return (
			<Container className='graph' style={{ background: '#242424'}}>
				<Line data={data} options={options} />
			</Container>
		)
	}


	return (
		<>
			<section id="stock__summary">
				<StockHeader ticker={stock.ticker}/>
				{stock.status ? createGraph() : null }	
				<section className="stock-information-group container">
					<Row>
						<Col className="col-12 flex-row py-1 p-0" >
							<Card className='flex-md-row'>	
								{/* <StockDetails details={daily} dir={'left'} />
								<StockDetails details={daily} dir={'right'} /> */}
							</Card>
						</Col>
					</Row>
				</section>
			</section>
		</>
	)
}
