import LogoBlack from "./images/CatwikiLogo_black.svg";
import LogoWhite from "./images/CatwikiLogo_white.svg";
import "./App.css";
import "./AppTablet.css";
import "./AppMobile.css";
import React from "react";
import { useEffect } from "react";
import Home from "./Home.js";
import Cat from "./Cat.js";
import Top10 from "./Top10.js";
import Error404 from "./404.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      catData: []
    };
  }

  componentDidMount() {
    fetch(window.location.protocol+'//'+window.location.hostname+":8080/cat-breeds")
    .then(res => res.json())
    .then(data => {
      this.setState(() => ({
        catData: data
      }))
    })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <ScrollToTop />
          <header>
            <Link to="/">
            <img src={LogoBlack} alt="Header Logo" height="40px" />
            </Link>
          </header>
          <Switch>
          <Route exact path="/">
              <Home catData={this.state.catData} />
            </Route>
            <Route path="/cat/:breed">
              <Cat catData={this.state.catData} />
            </Route>
            <Route path="/Top10">
              <Top10 breeds={this.state.catData} />
            </Route>
            <Route path="*">
              <Error404 />
            </Route>
          </Switch>
        <footer>
          <img src={LogoWhite} height="40px" alt="Footer Logo" />
          <p>© created by Lucas - devChallenge.io</p>
        </footer>
        </Router>
      </div>
    );
  }
}

export default App;

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
