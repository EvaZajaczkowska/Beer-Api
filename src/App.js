import React from "react";
import "./App.css"
import Home from "./components/Home/index";
import About from "./components/About/index.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      itms: []
    };
  }

  componentDidMount() {
    fetch("https://api.punkapi.com/v2/beers/random")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }  


  searchFood = e => {
    e.preventDefault();
    console.log(e.target);
    let dateFromInput = e.target[0].value;
    this.setState({ itms: dateFromInput });
    this.getBeers(dateFromInput);
  };

  getBeers = itms => {
    fetch(`https://api.punkapi.com/v2/beers?food=${itms}`)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
}  

render() {
  const { error, isLoaded} = this.state;
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
  return (
    <Router>
      <div>
        <nav>
          <ul className="nav-links">
            <li>
              <NavLink to="/home" 
               activeStyle={{
                fontWeight: "bold",
                color: "blue"
              }}>Favourite Beers</NavLink>
            </li>
            <li>
              <NavLink to="/about"  activeStyle={{
                fontWeight: "bold",
                color: "blue"
              }}>Beers</NavLink>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/about">
            <About items={this.state.items} searchFood={this.searchFood} />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}}}
    
export default App; 