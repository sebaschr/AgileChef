import { Player } from './player';
import { key } from 'firebase-key';

export class Team {

    public pizzas = [];
    public players = [];
    public identifier: String;

    constructor(public teamNumber: number) {
        this.identifier = key();
    }

    addPlayer(player: Player) {

        let isAddingPlayer = true;
        for (let i = 0; i < this.players.length; i++) {
            const element = this.players[i];
            if (element.identifier === player.identifier) {
                isAddingPlayer = false;
            }
        }

        if (isAddingPlayer) {
            this.players.push(player);
        }
    }

    removePlayer(player: Player) {

    }
}