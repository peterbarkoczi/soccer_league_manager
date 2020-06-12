import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import Teams from "./components/pages/Teams";
import Leagues from "./components/pages/Leagues";
import {TeamsProvider} from "./components/contexts/TeamsContext";
import {LeagueProvider} from "./components/contexts/LeagueContext";
import SubLeagues from "./components/pages/SubLeagues";

function App() {
    return (
        <TeamsProvider>
            <LeagueProvider>
                <Router>
                    <div className="App">
                        <Header/>
                        <Route exact path="/csapatok" component={Teams}/>
                        <Route exact path="/bajnoksag" component={Leagues}/>
                        <Route exact path="/bajnoksag/:leagueName" component={SubLeagues}/>
                    </div>
                </Router>
            </LeagueProvider>
        </TeamsProvider>
    );
}

export default App;
