import { Container } from "reactstrap"
import "./App.css"
import StockSummary from './pages/StockSummary'

function App() {
  return (
		<Container className='App'>
			<StockSummary />
		</Container>
	)
}

export default App