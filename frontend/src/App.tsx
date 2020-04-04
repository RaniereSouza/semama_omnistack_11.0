import React from 'react';

// import Header from './components/Header';
import Footer from './components/Footer';

import Routes from './routes';

import './app.css';

type AppState = {
  // counter : number
};

class AppContainer extends React.Component<{}, AppState> {

  constructor (props : {}) {

    super(props);

    this.state = {
      // counter: 0
    }

    // this.increment = this.increment.bind(this);
  }

  /* increment (event: React.MouseEvent) {
    this.setState({counter: this.state.counter + 1});
  } */

  render () {
    return (
      <App 
        // counter={this.state.counter}
        // increment={this.increment}
      />
    );
  }
}

type AppProps = {
  // counter   : number,
  // increment : React.MouseEventHandler
};

const App = (props : AppProps) => {
  return (
    <>
      {/* <Header>
        Contador: {props.counter}
      </Header> */}
      <main>
        {/* <button onClick={props.increment} >Incrementar</button> */}
        <Routes />
      </main>
      <Footer />
    </>
  );
}

export default AppContainer;
