import { key } from 'firebase-key';
import { DataService } from '../data.service';

export class Ingredient {

    public ingredientName;
    public img = [];
    public price;
    public key;

    public ingredientList = [];
    constructor(public dataService: DataService) {
        
    }

    loadIngredients() {
        var ingredientList = [
            {
                name: 'Dough',
                images: ['../../assets/dough_1.png', '../../assets/dough_2.png', '../../assets/dough_3.png'],
                price: 200,
                key: key()
            },
            {
                name: 'Tomato',
                images: ['../../assets/tomato_1.png', '../../assets/tomato_2.png', '../../assets/tomato_3.png'],
                price: 200,
                key: key()
            },
            {
                name: 'Chilli Pepper',
                images: ['../../assets/pepper_1.png', '../../assets/pepper_2.png', '../../assets/pepper_1.png'],
                price: 200,
                key: key()
            },
            {
                name: 'Pepperoni',
                images: ['../../assets/pepperoni_1.png', '../../assets/pepperoni_2.png', '../../assets/pepperoni_1.png'],
                price: 200,
                key: key()
            },
            {
                name: 'Mushroom',
                images: ['../../assets/shroom_1.png', '../../assets/shroom_2.png', '../../assets/shroom_3.png'],
                price: 200,
                key: key()
            }];

            var x= this.dataService.loadIngredients
            this.ingredientList = ingredientList;
    }
    
    getIngredientList(){
        this.loadIngredients();
        var ingredients= [];
        ingredients =this.ingredientList;
        return ingredients
    }
}