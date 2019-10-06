import React from 'react';
import MainPage from './components/MainPage'
import ExpiryDetails from './components/ExpiryDeatils'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//  Router to route based on links
function App() {
  return (
    <Router>
    <div className="App">
      <Route path="/ExpiryDetails" component={ExpiryDetails} />
      <Route exact path="/" component={MainPage} />
    </div>  
    </Router>
  );
}

export default App;
