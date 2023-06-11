import '../App.css';
import React from 'react';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Book extends React.Component {
    addItem(e) {

        let data;
        if (!localStorage.books) {
            data = [];
        } else {
            data = JSON.parse(localStorage.books)
        }

        let current = this.props;
        let exist = false
        for (let i = 0; i < data.length; i++) {
            if (data[i]["id"] === current.id) {
                data[i]["status"] = e.target.value;
                exist = true;
            }
        }
        if (!exist) {
            let na = { ...current };
            na["status"] = e.target.value;
            data.push(na);
        }
        localStorage.books = JSON.stringify(data);
        if (this.props.updateList !== undefined) {
            this.props.updateList();
        }
    }


    render() {
        return (
            <div key={this.props.index} className="col-md-2 pb-5 text-black">
                <div className="books d-flex h-100 flex-column text-center">
                    <div className='h-75 flex-column d-flex'>
                        <img src={this.props.img} alt='asd' className='img-fluid w-100 h-100' />
                        <div className="book-shelf-changer">
                            <select value="move" className='w-100' onChange={this.addItem.bind(this)} link={this.props.index}>
                                <option value="move" disabled>Move to...</option>
                                <option value="none">None</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="currentlyReading">Currently Reading</option>

                            </select>
                        </div>

                    </div>

                    <span className='pt-2 d-block text-truncate'>{this.props.title}</span>
                    <span className='text-secondary'>{this.props.author}</span>
                </div>

            </div>

        )
    }
}

export default Book;
