import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import $ from "jquery"

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


class MainList extends React.Component {

  constructor() {
    super();
    let data = [];
    if (localStorage.books) {
      data = JSON.parse(localStorage.books);
    }
    this.state = {
      data: data
    }
  }

  addItem(e) {

    let data;
    if (!localStorage.books) {
      data = [];
    } else {
      data = JSON.parse(localStorage.books)
    }

    let index = parseInt(e.target.getAttribute("link"));
    let current = this.state.data[index];
    current["status"] = e.target.value;
    let exist = false
    for (let i = 0; i < data.length; i++) {
      if (data[i]["id"] === current["id"]) {
        data[i] = current;
        exist = true;
      }
    }
    if (!exist) {
      data.push(current);
    }
    // alert(e.target.value);
    // data.push(item);
    this.setState({data: data});
    localStorage.books = JSON.stringify(data);

  }


  render() {
    return (
      <div className="main-page">
        <div className="top-green d-flex align-items-center justify-content-center">
          <h3>My Reads</h3>
        </div>
        <div className="open-search">
          <Link to="search">
            <i className="fa fa-plus"></i>
          </Link>
        </div>
        <div className='d-flex flex-column pt-5'>
          <h3>Currently reading</h3>
          <div className='container'>
            <div className='row justify-content-center'>
              {this.state.data.map((dataObj, index) => {
                if (dataObj["status"] === "currentlyReading") {
                  return (
                    <div key={index} className="col-md-2 pb-5 text-black">
                      <div className="books d-flex h-100 flex-column text-center">
                        <div className='h-75 flex-column d-flex'>
                          <img src={dataObj["img"]} alt='asd' className='img-fluid w-100 h-100' />
                          <div className="book-shelf-changer">
                            <select value="move" className='w-100' onChange={this.addItem.bind(this)} link={index}>
                              <option value="move" disabled>Move to...</option>
                              <option value="none">None</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="currentlyReading">Currently Reading</option>

                            </select>
                          </div>

                        </div>

                        <span className='pt-2 d-block text-truncate'>{dataObj["title"]}</span>
                        <span className='text-secondary'>{dataObj['author']}</span>
                      </div>

                    </div>

                  );
                } else {
                  return ("");
                }
              })}
            </div>
          </div>

        </div>
        <div className='d-flex flex-column pt-5'>
          <h3>Wants to read</h3>
          <div className='container'>
            <div className='row justify-content-center'>
              {this.state.data.map((dataObj, index) => {
                if (dataObj["status"] === "wantToRead") {
                  return (
                    <div key={index} className="col-md-2 pb-5 text-black">
                      <div className="books d-flex h-100 flex-column text-center">
                        <div className='h-75 flex-column d-flex'>
                          <img src={dataObj["img"]} alt='asd' className='img-fluid w-100 h-100' />
                          <div className="book-shelf-changer">
                            <select value="move" className='w-100' onChange={this.addItem.bind(this)} link={index}>
                              <option value="move" disabled>Move to...</option>
                              <option value="none">None</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="currentlyReading">Currently Reading</option>

                            </select>
                          </div>

                        </div>

                        <span className='pt-2 d-block text-truncate'>{dataObj["title"]}</span>
                        <span className='text-secondary'>{dataObj['author']}</span>
                      </div>

                    </div>

                  );
                } else {
                  return ("");
                }
              })}
            </div>
          </div>

        </div>
        <div className='d-flex flex-column pt-5'>
          <h3>Read</h3>
          <div className='container'>
            <div className='row justify-content-center'>
              {this.state.data.map((dataObj, index) => {
                if (dataObj["status"] === "read") {
                  return (
                    <div key={index} className="col-md-2 pb-5 text-black">
                      <div className="books d-flex h-100 flex-column text-center">
                        <div className='h-75 flex-column d-flex'>
                          <img src={dataObj["img"]} alt='asd' className='img-fluid w-100 h-100' />
                          <div className="book-shelf-changer">
                            <select value="move" className='w-100' onChange={this.addItem.bind(this)} link={index}>
                              <option value="move" disabled>Move to...</option>
                              <option value="none">None</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="currentlyReading">Currently Reading</option>

                            </select>
                          </div>

                        </div>

                        <span className='pt-2 d-block text-truncate'>{dataObj["title"]}</span>
                        <span className='text-secondary'>{dataObj['author']}</span>
                      </div>

                    </div>

                  );
                } else {
                  return ("");
                }
              })}
            </div>
          </div>

        </div>


      </div>
    );
  }
}


class SearchPage extends React.Component {

  constructor() {
    super();

    this.state = {
      loading: false,
      data: []
    };

  }

  searchUpdated({ target }) {

    this.setState({ data: [], loading: true });
    $.ajax({
      url: "https://openlibrary.org/search.json?q=" + target.value,
      method: "GET",
      error: function () {
      },
      success: function (data) {

        data["docs"].forEach((elem) => {
          let current = {};
          if (elem["author_name"] === undefined) {
            current["author"] = "Not known";
          } else {
            current["author"] = elem["author_name"].join(", ");
          }
          current["title"] = elem["title"];
          current["year"] = elem["first_publish_year"];
          if (elem["cover_i"] === undefined) {
            current["img"] = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Placeholder_book.svg/1200px-Placeholder_book.svg.png"
          } else {
            current["img"] = 'https://covers.openlibrary.org/b/id/' + elem["cover_i"] + '.jpg'
          }

          current["id"] = elem["key"];

          let newData = this.state.data;
          newData.push(current);
          this.setState({ loading: false, data: newData });
        });
        // console.log(data["docs"][]);


      }.bind(this)
    });

  }

  addItem(e) {

    let data;
    if (!localStorage.books) {
      data = [];
    } else {
      data = JSON.parse(localStorage.books)
    }

    let index = parseInt(e.target.getAttribute("link"));
    let current = this.state.data[index];
    current["status"] = e.target.value;
    let exist = false
    for (let i = 0; i < data.length; i++) {
      if (data[i]["id"] === current["id"]) {
        data[i] = current;
        exist = true;
      }
    }
    if (!exist) {
      data.push(current);
    }
    // alert(e.target.value);
    // data.push(item);

    localStorage.books = JSON.stringify(data);

  }

  render() {
    return (
      <div className='search-page vh-100 '>
        <div className='d-flex w-100 main-box'>
          <Link to="/">
            <button className=""><i className="fa fa-arrow-left"></i></button>
          </Link>

          <input placeholder='Search movie by name' onChange={this.searchUpdated.bind(this)} />
        </div>
        {this.state.loading ?
          <div className="text-center h-75 d-flex align-items-center justify-content-center ">
            <div className="spinner-grow" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div> : ""}
        <div className='container pt-5'>
          <div className="row">
            {this.state.data.map((dataObj, index) => {
              return (
                <div key={index} className="col-md-2 pb-5 text-black">
                  <div className="books d-flex h-100 flex-column text-center">
                    <div className='h-75 flex-column d-flex'>
                      <img src={dataObj["img"]} alt='asd' className='img-fluid w-100 h-100' />
                      <div className="book-shelf-changer">
                        <select value="move" className='w-100' onChange={this.addItem.bind(this)} link={index}>
                          <option value="move" disabled>Move to...</option>
                          <option value="none">None</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="currentlyReading">Currently Reading</option>

                        </select>
                      </div>

                    </div>

                    <span className='pt-2 d-block text-truncate'>{dataObj["title"]}</span>
                    <span className='text-secondary'>{dataObj['author']}</span>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default MainPage;
