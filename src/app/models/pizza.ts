import { Recipe } from './recipe';
import { key } from 'firebase-key';

export class Pizza {
    public name: String;
    public recipe: Recipe;
    public price:Number
    

    constructor() {

    }

    loadPizzas(){
        
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