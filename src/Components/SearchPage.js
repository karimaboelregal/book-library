import '../App.css';
import React from 'react';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import Book from './BookComponent.js';

class SearchPage extends React.Component {

  constructor() {
    super();

    this.state = {
      loading: false,
      data: []
    };

  }




  async searchUpdated({ target }) {

    this.setState({ data: [], loading: true });
    const response = await fetch("https://openlibrary.org/search.json?title=" + target.value);
    const jsonData = await response.json();
    console.log(jsonData);
    jsonData["docs"].forEach((elem) => {
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
                  return <Book key={index} id={dataObj["id"]} index={index} img={dataObj["img"]} title={dataObj["title"]} author={dataObj["author"]} status={dataObj["status"]} />;
                })}
          </div>
        </div>
      </div>
    )
  }
}


export default SearchPage;
