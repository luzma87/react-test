import React from 'react';

class Home extends React.Component {
    render() {
        return (
            <div className='row margin-top'>
                <div className="col-md-1 col-md-offset-3">
                    Find
                </div>
                <div className="col-md-4">
                    <input type="text" className="form-control"/>
                    <div className="autocomplete-container">

                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
