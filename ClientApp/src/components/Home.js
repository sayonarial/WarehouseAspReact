import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div
       class="text-center">
        <h1 >Welcome to warehouse!</h1>
        <p>Sign in or register to start managing your items</p>
      </div>
    );
  }
}
