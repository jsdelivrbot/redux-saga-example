import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {searchSth} from '../actions/index';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
    }

    onFormSubmit(event) {
        event.preventDefault();
        this.props.searchSth(this.state.term)
    }

    onInputChange(event) {
        this.setState({term: event.target.value})
    }

    renderData(films, error) {

        if(error) {
            return (
                <div>No film data found.</div>
            )
        }else {
            return (
                films.map(this.renderFilm)
            )
        }
    }

    renderFilm(film, index){
            return (
                <div key={index}>{film.director}</div>
            )
    }

    render() {
        return (
            <div>
                <form onSubmit={(event) => this.onFormSubmit(event)} className='input-group'>
                    <input type="text" placeholder='Give a search input'
                           className='form-control'
                           onChange={(event) => this.onInputChange(event)}
                    />
                    <span className='input-group-btn'>
                    <button type='submit' className='btn btn-secondary'>Search</button>
                </span>
                </form>
                <div>
                    {this.renderData(this.props.films, this .props.error)}
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({searchSth: searchSth}, dispatch);
}

function mapStateToProps(state) {
    console.log('App component films: ',  state.films)
    return {
        films: state.fetchedFilms.films,
        error: state.fetchedFilms.error
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)