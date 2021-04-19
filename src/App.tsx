import { Container } from "reactstrap"
import "./App.css"
import StockSummary from './pages/StockSummary'

function App() {
  return (
		<Container className='App d-flex flex-column h-100'>
			<StockSummary />
		</Container>
	)
}

export default App
