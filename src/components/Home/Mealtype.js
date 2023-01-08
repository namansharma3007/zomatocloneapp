import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MealTypeItem extends Component {
    render() {
        const { name, content, image } = this.props.item
        return (
            <Link className="col-sm-12 col-md-12 col-lg-4" to={`/filter/${name}`}>
                <div className="tileContainer">
                    <div className="tileComponent1">
                        <img src={require('../../' + image)} height="150" width="140" />
                    </div>
                    <div className="tileComponent2">
                        <div className="componentHeading">
                            {name}
                        </div>
                        <div className="componentSubHeading">
                            {content}
                        </div>
                    </div>
                </div>
            </Link>

        )
    }
}