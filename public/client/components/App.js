import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      happy: true
    }
  }

  render() {
    return (
      <div>
        <h1> hello world </h1>
      </div>
    )
  }
}

export default App;
