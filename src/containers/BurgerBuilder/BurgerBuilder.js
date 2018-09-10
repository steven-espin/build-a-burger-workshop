import React, { Component } from 'react';

import AuxComponent from '../../hoc/AuxComponent';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0, 
            bacon: 0, 
            cheese: 0, 
            meat: 0
        }
    }

    render() {
        return (
            <AuxComponent>
                <Burger ingredients={this.state.ingredients}/>
                <BurgerControls/>
            </AuxComponent>
        );
    }
}

export default BurgerBuilder;