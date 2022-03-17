import React from 'react';
import {BrowserRouter as Router,  Switch,
    Route} from "react-router-dom";
import Campaign from "./pages/Campaign";
import Addcampaign from "./pages/Addcampaign";
import Editcampaign from "./pages/Editcampaign";
import NotFound from "./pages/NotFound";

function App() {
    return (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={Campaign}/>
                <Route exact path="/add-campaign" component={Addcampaign}/>
                <Route exact path="/edit-campaign/:id" component={Editcampaign}/>
                <Route component={NotFound}/>
            </Switch>
        </div>

    </Router>
  );
}

export default App;
