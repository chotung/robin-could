import { Card, CardBody, CardText, Col, Container, Row } from 'reactstrap';
import './index.css'


export default function StockDetails(props: any) {
	const { dir } = props
	const { afterHours, close, from, high, low, open, preMarket, volume } = props.details

	const renderCols = () => {
		return (
			<>
				<Row>
					<Col className="col-6 p-0 left">
						<CardText>{dir === 'left' ? 'Close' : 'After Hours'}</CardText>
					</Col>
					<Col className="col-6 p-0 right">
						<CardText>{dir === 'left' ? close : afterHours}</CardText>
					</Col>
				</Row>
				<Row>
					<Col className="col-6 p-0 left">
						<CardText>{dir === 'left' ? 'Open' : 'From'}</CardText>
					</Col>
					<Col className="col-6 p-0 right">
						<CardText>{dir === 'left' ? open : from}</CardText>
					</Col>
				</Row>
				<Row>
					<Col className="col-6 p-0 left">
						<CardText>{dir === 'left' ? 'High' : 'PreMarket'}</CardText>
					</Col>
					<Col className="col-6 p-0 right">
						<CardText>{dir === 'left' ? high : preMarket}</CardText>
					</Col>
				</Row>
				<Row>
					<Col className="col-6 p-0 left">
						<CardText>{dir === 'left' ? 'Low' : 'Volume'}</CardText>
					</Col>
					<Col className="col-6 p-0 right">
						<CardText>{dir === 'left' ? low : volume}</CardText>
					</Col>
				</Row>
			</>
		)
	}



	return (
		<CardBody className='py-1 col-md-6'>
			{/* {renderCols()} */}
		</CardBody>
	)
}
