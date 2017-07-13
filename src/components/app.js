import React, { Component } from 'react';
import SearchBar from '../containers/search_bar';
import ImageItem from '../containers/image_item';
import ImageList from '../containers/image_list';

export default class App extends Component {
  render() {
    return (
      <div>
      	<ImageList />
      	{/*<ImageItem smallImg="http://localhost:3000/1499770790376_paris.jpg" 
      	largeImg="http://localhost:3000/1499770790376_paris-800x600.jpg"/>*/}
      </div>
    );
  }
}
