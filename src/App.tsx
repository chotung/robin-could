import "./App.css";
import StockSummary from "./pages/StockSummary";
import SearchBar from "./components/SearchBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import LiveFeedPage from "./pages/LiveFeedPage";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          {/* <Route path='/'>
						<LiveFeedPage />
					</Route> */}
          <Route path="/">
            <header className="jumbotron jumbotron-fluid">
              <SearchBar />
            </header>
            <main className="App d-flex flex-column h-100 container">
              <StockSummary />
            </main>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
