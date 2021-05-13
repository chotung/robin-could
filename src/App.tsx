import "./App.css";
import StockSummary from "./pages/StockSummary";
// import SearchBar from "./components/SearchBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import LiveFeedPage from "./pages/LiveFeedPage";

const App: React.FC = () => {
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
