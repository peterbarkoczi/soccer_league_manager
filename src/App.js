import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from "./components/Header";
import Teams from "./components/pages/team/Teams";
import Location from "./components/pages/location/Location";
import {DataPackProvider} from "./components/contexts/DataPackContext";
import Leagues from "./components/pages/league/Leagues";
import LeagueDetails from "./components/pages/league/LeagueDetails";
import Cups from "./components/pages/cup/Cups";
import CupDetails from "./components/pages/cup/CupDetails"
import {CupProvider} from "./components/contexts/CupContext";
import TeamDetails from "./components/pages/team/TeamDetails";
import {MatchProvider} from "./components/contexts/MatchContext";
import Player from "./components/pages/player/Player";

function App() {
    return (
        <DataPackProvider>
            <CupProvider>
                <MatchProvider>
                    <Router>
                        <div className="App">
                            <Header/>
                            <Route exact path="/" component={Location}/>
                            <Route exact path="/:locationName/csapatok" component={Teams}/>
                            <Route exact path="/:locationName/csapat/:team" component={TeamDetails}/>
                            <Route exact path="/:locationName/bajnoksag" component={Leagues}/>
                            <Route exact path="/:locationName/bajnoksag/:league" component={LeagueDetails}/>
                            <Route exact path="/:locationName/kupak" component={Cups}/>
                            <Route exact path="/:locationName/kupak/:cupName" component={CupDetails}/>
                            <Route exact path="/:locationName/jatekos/:player" component={Player}/>
                        </div>
                    </Router>
                </MatchProvider>
            </CupProvider>
        </DataPackProvider>
    );
}

export default App;
