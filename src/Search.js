  
import React, { Component } from 'react'
import List from './List';
import request from 'superagent';
import './Home.css';

export default class Search extends Component {
    // initialize state
    state = { 
        resState: [], 
    }

    handleSearch = async (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const data = await request.get(`${process.env.REACT_APP_DB_URL}/search?search=${this.state.input}`)
        console.log(data);
        this.setState({
            resState: data.body,
            loading: false
        });
    }

    render() {

        return (
            <div className="searchDiv">
                <form onSubmit={this.handleSearch}>
                  
                  <input className="input" value={this.state.input} onChange={(e) => this.setState({ input: e.target.value })} />
                  <button className="button" disabled={this.state.loading}>Search!</button>
                  
                </form>
                  {
                    this.state.loading 
                    ? "loading!!"
                    : <List 
                    resState={this.state.resState} user={this.props.user}/> 

                  }  
              
            </div>
        )
    }
}
 






