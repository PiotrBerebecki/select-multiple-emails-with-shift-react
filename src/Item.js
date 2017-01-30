import React, { Component } from 'react';

class Item extends Component {
  render() {
    return (
      
      <div className="item">
         <label><input type="checkbox"/></label>
         <p>{this.props.text}</p>
      </div>
      
    );
  } 
}

export default Item;
