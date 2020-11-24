import { Player } from './player';
import { key } from 'firebase-key';
import { element } from 'protractor';

export class Team {

    public pizzas = [];
    public players = [];
    public identifier: String;

    constructor(public teamNumber: number) {
        this.identifier = key();
    }

    addPlayer(player: Player) {

        console.log(player);
        // let isAddingPlayer = true;
        // for (let i = 0; i <= this.players.length; i++) {
        //     const element = this.players[i];
        //     if (element.identifier === player.identifier) {
        //         isAddingPlayer = false;
        //     } //if (this.players.length >= this.session.playersMin) {
                
        //     //}
        // }

        // if (isAddingPlayer) {
        //     this.players.push(player);
        // }
    }

    /*removePlayer(player: Player) {
        let isRemovingPlayer = false;
        for (let i = 0; i < this.players.length; i++) {
            const element = this.players[i];
            if (element.identifier === player.identifier) {
                isRemovingPlayer = true;
            }
        }

        if (isRemovingPlayer) {
            this.players.slice();
        }
    }*/
}