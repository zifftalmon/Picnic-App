import React, { Component } from 'react';

class SearchLocation extends Component {
    render() {
        return (
            <div>
                <form>
                    <input type='text' placeholder='search for a location'/>
                    <input type='submit' value='search'/>
                </form>
            </div>
        );
    }
}

export default SearchLocation;