import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import Teams from "./components/pages/Teams";
import {TeamsProvider} from "./components/contexts/TeamsContext";

function App() {
    return (
        <TeamsProvider>
            <Router>
                <div className="App">
                    <Header/>
                    <Route exact path="/csapatok" component={Teams}/>
                </div>
            </Router>
        </TeamsProvider>
    );
}

export default App;
