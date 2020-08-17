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

function App() {
    return (
        <DataPackProvider>
            <CupProvider>
                <Router>
                    <div className="App">
                        <Header/>
                        <Route exact path="/" component={Location}/>
                        <Route exact path="/liga/:league/csapatok" component={Teams}/>
                        <Route exact path="/liga/:league/csapatok/:csapat" component={TeamDetails}/>
                        <Route exact path="/liga/:league/bajnoksag" component={Leagues}/>
                        <Route exact path="/liga/:league/bajnoksag/:subLeague" component={LeagueDetails}/>
                        <Route exact path="/liga/:league/kupak" component={Cups}/>
                        <Route exact path="/liga/:league/kupak/:cup" component={CupDetails}/>
                    </div>
                </Router>
            </CupProvider>
        </DataPackProvider>
    );
}

export default App;
