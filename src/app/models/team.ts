import { Player } from './player';
import { key } from 'firebase-key';
import { element } from 'protractor';

export class Team {

    public pizzas = [];
    public players = [];
    public identifier: String;
    public results= []

    constructor(public teamNumber: number) {
        this.identifier = key();
    }
}