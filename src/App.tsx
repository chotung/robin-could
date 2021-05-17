import "./App.css";
import StockSummary from "./pages/StockSummary";
// import SearchBar from "./components/SearchBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPolygonTickerDetails } from "./clients/polygon";

// import LiveFeedPage from "./pages/LiveFeedPage";
const App: React.FC = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getPolygonTickerDetails())
	})
	return (
		<div id="App-wrapper">
			<Router>
				<Switch>
					<Route path={`/stock/`}>
						<main className="App d-flex flex-column container">
							<StockSummary />
						</main>
					</Route>
					<Route path="/">
						{/* <header className="jumbotron jumbotron-fluid m-0 py-3">
              <SearchBar />
            </header> */}
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

export default App;
