import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from "./components/Header";
import Teams from "./components/pages/Teams";
import Leagues from "./components/pages/Leagues";
import {TeamsProvider} from "./components/contexts/TeamsContext";
import {LeagueProvider} from "./components/contexts/LeagueContext";
import SubLeagues from "./components/pages/SubLeagues";
import LeagueDetails from "./components/pages/LeagueDetails";
import Cups from "./components/pages/Cups";
import CupDetails from "./components/pages/CupDetails"
import {CupsProvider} from "./components/contexts/CupsContext";

function App() {
    return (
        <TeamsProvider>
            <LeagueProvider>
                <CupsProvider>
                    <Router>
                        <div className="App">
                            <Header/>
                            <Leagues/>
                            <Route exact path="/liga/:league/csapatok" component={Teams}/>
                            <Route exact path="/liga/:league/bajnoksag" component={SubLeagues}/>
                            <Route exact path="/liga/:league/bajnoksag/:subLeague" component={LeagueDetails}/>
                            <Route exact path="/liga/:league/kupak" component={Cups}/>
                            <Route exact path="/liga/:league/kupak/:cup" component={CupDetails}/>
                        </div>
                    </Router>
                </CupsProvider>
            </LeagueProvider>
        </TeamsProvider>
    );
}

export default App;
