import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import SearchPage from './Components/SearchPage.js';
import MainList from './Components/MainList';

class MainPage extends React.Component {

  constructor() {
    super();
    this.state = {
      search: false
    }
  }


  render() {
    return (
      <div className="app">

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainList />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}





export default MainPage;
