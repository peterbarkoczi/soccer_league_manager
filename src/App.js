import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import Teams from "./components/pages/Teams";
import Leagues from "./components/pages/Leagues";
import {TeamsProvider} from "./components/contexts/TeamsContext";
import {LeagueProvider} from "./components/contexts/LeagueContext";
import SubLeagues from "./components/pages/SubLeagues";
import LeagueDetails from "./components/pages/LeagueDetails";
import Cups from "./components/pages/Cups";

function App() {
    return (
        <TeamsProvider>
            <LeagueProvider>
                <Router>
                    <div className="App">
                        <Header/>
                        <Leagues />
                        <Route exact path="/csapatok" component={Teams}/>
                        <Route exact path="/liga/:league/" component={SubLeagues}/>
                        <Route exact path="/liga/:league/:subLeague" component={LeagueDetails}/>
                        <Route exact path="/kupak" component={Cups}/>
                    </div>
                </Router>
            </LeagueProvider>
        </TeamsProvider>
    );
}

export default App;
