import React, { Component } from 'react';

import AuxComponent from '../../hoc/AuxComponent';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENTS_PRICES = {
    salad: .50,
    bacon: 1.50, 
    cheese: 1.00,
    meat: 1.50
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0, 
            bacon: 0, 
            cheese: 0, 
            meat: 0
        }, 
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const newPrice = this.state.totalPrice + INGREDIENTS_PRICES[type];

        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
    }

    removeIngredientHandler = (type) => {
        const newCount = this.state.ingredients[type] - 1;
        if(newCount < 0) {
            return;
        }
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newCount;

        const newPrice = this.state.totalPrice - INGREDIENTS_PRICES[type];

        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
    }

    render() {
        const disabledIngredients = {
            ...this.state.ingredients
        }
        for(let key in disabledIngredients) {
            disabledIngredients[key] = disabledIngredients[key] <= 0; 
        }

        return (
            <AuxComponent>
                <Burger ingredients={this.state.ingredients}/>
                <BurgerControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledIngredients={disabledIngredients}/>
            </AuxComponent>
        );
    }
}

export default BurgerBuilder;