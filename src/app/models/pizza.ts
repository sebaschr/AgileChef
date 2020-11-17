import { Recipe } from './recipe';
import { key } from 'firebase-key';

export class Pizza {
    public name: String;
    public recipeid: String;
    public price:Number
    
    recipeList= [];
    pizzaList = [];
    constructor() {
        
    }

    loadPizzas(){

        var pizzas = [{
            name:"Mushroom Pizza",
            price:6500,
            imgSrc: '../../assets/mushroom_pizza.png',
            recipeID: ''
        },{
            name:"Pepperoni Pizza",
            price:6000,
            imgSrc: '../../assets/pepperoni_pizza.png',
            recipeID: ''
        }]

        for (let i = 0; i < pizzas.length; i++) {
            pizzas[i].recipeID = this.findRecipeID(pizzas[i].name);
        }

        this.pizzaList = pizzas;
        return this.pizzaList
    }

    findRecipeID(name){
        var x = new Recipe();
        this.recipeList = x.getRecipeList();
        var key;
        for (let i = 0; i < this.recipeList.length; i++) {
            if(this.recipeList[i].nombre == name){
                key = this.recipeList[i].idRecipe
            }
            
        }

        return key
    }

    
}

/*
import { key } from 'firebase-key';

export class Ingredient {

    public ingredientName;
    public img = [];
    public price;
    public key;

    public ingredientList = [];
    constructor() {

    }

    loadIngredients() {
        var ingredientList = [
            {
                name: 'Dough',
                images: ['../../assets/dough_1.png', '../../assets/dough_2.png', '../../assets/dough_3.png'],
                price: 200
            },
            {
                name: 'Tomato',
                images: ['../../assets/tomato_1.png', '../../assets/tomato_2.png', '../../assets/tomato_3.png'],
                price: 200
            },
            {
                name: 'Chilli Pepper',
                images: ['../../assets/pepper_1.png', '../../assets/pepper_2.png', '../../assets/pepper_1.png'],
                price: 200
            },
            {
                name: 'Pepperoni',
                images: ['../../assets/pepperoni_1.png', '../../assets/pepperoni_2.png', '../../assets/pepperoni_1.png'],
                price: 200
            },
            {
                name: 'Mushroom',
                images: ['../../assets/shroom_1.png', '../../assets/shroom_2.png', '../../assets/shroom_3.png'],
                price: 200
            }];


        for (let i = 0; i < ingredientList.length; i++) {
            let x =new Ingredient();
            for (let o = 0; o < ingredientList[i].images.length; o++) {
                let name = [];
                name[i] = ingredientList[i].images[o];
                
                x.ingredientName = ingredientList[i].name;
                x.img = name;
                x.price = ingredientList[i].price
                x.key = key();
            }
            this.ingredientList.push(x);
        }
    }
    
    getIngredientList(){
        return this.ingredientList
    }
} */