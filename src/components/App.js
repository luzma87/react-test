import React from 'react';
import Home from './Home';
import Login from './Login';

class App extends React.Component {
  render() {
    return (
      <div className="wrapper">
          <section className="container">
              {this.props.children || <Login />}
              {/*<Login />*/}
          </section>
      </div>
    )
  }
}

export default App;
