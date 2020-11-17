import { Optional } from '@angular/core';
import { faSortAmountDown } from '@fortawesome/free-solid-svg-icons';
import { database } from 'firebase';
import { key } from 'firebase-key';

export class Recipe {

    public recipes = [{
        nombre: String,
        idRecipe: String,
        ingredients: [{
            idIngredient: String,
            amount: Number,
        }]
    }]

    public recipeList = [];
    public ingredients = [];

    constructor() {

    }

    loadRecipes() {
        var ingredientList = [];

        ingredientList = [{
            nombre: 'Mushroom Pizza',
            idRecipe: key(),
            ingredients: [{
                idIngredient: 'Dough',
                amount: 1
            },
            {
                idIngredient: 'Mushroom',
                amount: 1
            },
            {
                idIngredient: 'Tomato',
                amount: 1
            }]
        },{
            nombre: 'Pepperoni Pizza',
            idRecipe: key(),
            ingredients: [{

                idIngredient: 'Dough',
                amount: 1
            },
            {

                idIngredient: 'Pepperoni',
                amount: 1
            },
            {

                idIngredient: 'Tomato',
                amount: 1
            }]
        }];

        this.recipeList = ingredientList;
    }

    getRecipeList(){
        this.loadRecipes();
        var x = []
        x = this.recipeList;
        return x
    }


}