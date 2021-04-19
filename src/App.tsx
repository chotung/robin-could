import { Container } from "reactstrap"
import "./App.css"
import StockSummary from './pages/StockSummary'
import SearchBar from './components/SearchBar'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import SearchPage from "./pages/SearchPage";


function App() {
  return (
		<div>
			<Router>
				<Switch>
					<Route path='/stock/AAPL'>
						{/* <header className='jumbotron jumbotron-fluid'>
							Logo
							<SearchBar />
						</header> */}
						<main className='App d-flex flex-column h-100 container'>
							<StockSummary />
						</main>
					</Route>
					<Route path='/'>
						<SearchPage/>
					</Route>
				</Switch>
			</Router>
		</div>
	)
}

export default App
