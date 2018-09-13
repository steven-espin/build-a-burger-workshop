import React, { Component } from 'react';

import AuxComponent from '../../hoc/AuxComponent';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        totalPrice: 2.50, 
        purchaseable: false,
        purchasing: false
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
               return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchaseable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const newPrice = this.state.totalPrice + INGREDIENTS_PRICES[type];

        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
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
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert('You continue!');
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
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients} 
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BurgerControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledIngredients={disabledIngredients}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    purchasing={this.purchaseHandler}/>
            </AuxComponent>
        );
    }
}

export default BurgerBuilder;