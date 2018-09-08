import React, { Component } from 'react';

import AuxComponent from '../../hoc/AuxComponent';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    render() {
        return (
            <AuxComponent>
                <Burger />
                <div>Build Controls</div>
            </AuxComponent>
        );
    }
}

export default BurgerBuilder;