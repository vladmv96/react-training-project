import React, { Component } from 'react';
import './App.css';
import Form from './Form.js';
import Accounts from './Accounts.js';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import setUpStore from './store'
import Projects from './Projects.js';
import Tickets from './Tickets.js';
<<<<<<< HEAD
=======
import CreateTicket from './CreateTicket.js';
>>>>>>> 5ec78a79afe9323f91feb9795078ec89c008e990

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      store: null
    }
  }


  componentWillMount = () => {
    const store = setUpStore();
    this.setState({ store });
    store.subscribe(this.localStorageChange);
  };

  localStorageChange = () => {
    const jsonStore = JSON.stringify(this.state.store.getState());
    localStorage.setItem('storeState', jsonStore);
  }


  render() {

    if (!this.state.store) return null

    return (
      <Provider store={this.state.store}>
        <div className="App">

          <BrowserRouter>
            <Switch>
              <Route path='/login' component={Form} />
              <Route path='/accounts' component={Accounts} />
              <Route path='/projects' component={Projects} />
              <Route path='/tickets' component={Tickets} />
<<<<<<< HEAD
=======
              <Route path='/newticket' component={CreateTicket} />
>>>>>>> 5ec78a79afe9323f91feb9795078ec89c008e990
            </Switch>
          </BrowserRouter>

        </div>
      </Provider>
    );
  }
}

export default App;
