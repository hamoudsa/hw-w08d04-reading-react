import React, { Component } from 'react';
import './App.css';
import ShowBook from './components/ShowBook';
import ShowForm from './components/ShowForm';

class App extends Component {
  constructor() {
    super()
    this.state = {
      books: [],
      show: '',
      model: false
    }
  }

  createNewBook(book) {

    const url = 'http://myapi-profstream.herokuapp.com/api/fa39e1/books'
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(book)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const updatedShows = this.state.books.concat([data]);
        console.log(updatedShows)
        this.setState({
          books: updatedShows
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  deleteBook(id) {
    const url = `http://myapi-profstream.herokuapp.com/api/fa39e1/books/${id}`
    fetch(url, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      }
    })
    console.log(this.state.books)
  }

  componentDidMount() {
    fetch('http://myapi-profstream.herokuapp.com/api/fa39e1/books')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          books: data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  renderBook(show) {
    return show.map((book, index) => {
      return (
        <ShowBook key={index}
          book={book}
          setCurrentShow={this.setCurrentShow.bind(this)}
          deleteBook={this.deleteBook.bind(this)}
        />
      )
    })
  }

  setCurrentShow(showBook) {
    console.log(showBook)

    this.setState({
      show: showBook
    })
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    })
  }

  render() {
    return (
      <div className="App">

          <button onClick={this.toggleModal.bind(this)}>Add New Book</button>

            {this.state.modal ? <ShowForm createNewBook={this.createNewBook.bind(this)} /> : ''}

            {this.renderBook(this.state.books)}
            <img className="img" src={this.state.show.image} alt="" />

      </div>
          );
        }
      }

      export default App;