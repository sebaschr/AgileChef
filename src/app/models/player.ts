import { key } from 'firebase-key';

export class Player {
    public identifier: String;
    constructor(public name: string, public isPO: boolean) {
        this.identifier = key();
    }
}