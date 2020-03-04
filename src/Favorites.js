import React, { Component } from 'react';
import request from 'superagent';
import ResidencyCard from './ResidencyCard';
import { getFavorites } from './api';

export default class Favorites extends Component {
    state = {
        data: [],
        shortData: [],
        hardData: [{
            program_name: "A Blade of Grass Fellowship",
            address: "81 Prospect Street",
            city: "Brooklyn",
            state: "NY",
            zip_code: 11201,
            country: "USA",
            continent: "North America",
            phone_num: "6469450860",
            email: "info@abladeofgrass.org",
            art_medium: "ANY",
            img_url: "http://www.abladeofgrass.org/wp-content/themes/abog/inc-img/logo.svg",
            link_url: "http://www.abladeofgrass.org/fellowship-program/#how-to-apply",
            description: "social change/better future focused, comes with $20k",
            is_grant: true
        }]
    }
    
        
    async componentDidMount() {
        // const result = await this.getFavoritesLocal();
        const result = await getFavorites();
        this.setState({ data: result });
        this.setState({ shortData: result.slice(0, 3) });    
    }

    handleFavorite = async (passedItem) => {
        const URL = `${process.env.REACT_APP_DB_URL}/api/me/favorites/`;
        const newObj = {
            user_id: passedItem.userId,
            name: passedItem.name,
        }
        const result = await request.post(URL, newObj);
        this.setState({ data: result.body });
    }

    handleDelete = async (passedId) => {
        const URL = `${process.env.REACT_APP_DB_URL}/me/favorites/:${passedId}`;

        const result = await request.delete(URL);
        this.setState({ data: result.body });
    }

    handleSearch = async () => {
        const URL = `${process.env.REACT_APP_DB_URL}/search?query=${this.state.inputValue}`;
        const result = await request.get(URL);
        this.setState({ data: result.body });
    }

    // getUser = () => {
    //     console.log('Getting user');
    //     const user = JSON.parse(localStorage.getItem('user'));
    //     this.setState({ 
    //       userName: user.display_name, 
    //       userToken: user.token,
    //       userId: user.id 
    //     });
    //   }
    
      // Make sure user info is loaded into state for authorization use before making API calls
    //   componentWillMount() {
    //     this.getUser();
    //   }

    render() {
        return (
            <div>
                <h3>Favorites</h3>
                <div className='card-container'>
                <ul className='residency-list'>
                    {this.state.shortData.map(item => <ResidencyCard item={item} key={item.id} />)}
                </ul>
                </div>
            </div>
        )
    }
}
