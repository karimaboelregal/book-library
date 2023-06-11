import '../App.css';
import React from 'react';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import Book from './BookComponent.js';

class MainList extends React.Component {

    constructor(props) {
        super(props);
        let data = [];
        if (localStorage.books) {
            data = JSON.parse(localStorage.books);
        }
        this.state = {
            data: data,
            types: { "Currently Reading": "currentlyReading", "Wants to read": "wantToRead", "Read": "read" }
        }
        this.updateList = this.updateList.bind(this);
    }


    updateList() {
        let data = [];
        if (localStorage.books) {
            data = JSON.parse(localStorage.books);
        }
        this.setState({ data: data });
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
                {Object.keys(this.state.types).map((k, i) => {
                    return (<div key={i} className='d-flex flex-column pt-5'>
                        <h3>{k}</h3>
                        <div className='container'>
                            <div className='row justify-content-center'>
                                {this.state.data.map((dataObj, index) => {
                                    if (dataObj["status"] === this.state.types[k]) {
                                        return <Book key={index} updateList={this.updateList} id={dataObj["id"]} index={index} img={dataObj["img"]} title={dataObj["title"]} author={dataObj["author"]} status={dataObj["status"]} />;

                                    } else {
                                        return ("");
                                    }
                                })}
                            </div>
                        </div>

                    </div>)
                })}
            </div>
        );
    }
}


export default MainList;
