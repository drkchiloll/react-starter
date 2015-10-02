var React = require('react');

var App = React.createClass({
  render : function() { return ( <h1>HELLO WORLD</h1> );}
});

React.render(<App/>, document.querySelector('.container'));
