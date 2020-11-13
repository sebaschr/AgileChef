import { Optional } from '@angular/core';
import { faSortAmountDown } from '@fortawesome/free-solid-svg-icons';
import { database } from 'firebase';
import { key } from 'firebase-key';
import { Ingredient } from './ingredient';

export class Recipe {

    public ingredients = [{
        nombre: String,
        ingredients: [{
            idRecipe: key,
            idIngredient: String,
            amount: Number,
        }]
    }]

    public recipeList = [];

    constructor() {

    }

    loadRecipes() {
        var ingredientList = [];

        ingredientList = [{
            nombre: 'Mushroom Pizza',
            ingredients: [{
                idRecipe: key(),
                idIngredient: 'Dough',
                amount: 1
            },
            {
                idRecipe: key(),
                idIngredient: 'Mushroom',
                amount: 1
            },
            {
                idRecipe: key(),
                idIngredient: 'Tomato',
                amount: 1
            }]
        },{
            nombre: 'Pepperoni Pizza',
            ingredients: [{
                idRecipe: key(),
                idIngredient: 'Dough',
                amount: 1
            },
            {
                idRecipe: key(),
                idIngredient: 'Pepperoni',
                amount: 1
            },
            {
                idRecipe: key(),
                idIngredient: 'Tomato',
                amount: 1
            }]
        }];

        this.recipeList = ingredientList;
    }

    getRecipeList(){
        return this.recipeList;
    }


}