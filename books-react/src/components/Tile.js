import React from 'react';

const Tile = (props) => {
    return (
        <div className="book" onMouseOver={() => { props.setCurrentShow(props.book) }}>

            <button onClick={() => { props.deleteBook(props.book.id) }}>X</button>
            <h2>Title: {props.book.title}</h2>
            
            <h2>Author: {props.book.author}</h2>
            <h2>Release Date: {props.book.release_date}</h2>
        </div>
    )
}
export default Tile;