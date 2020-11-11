import { Team } from './team';
import { Sprint } from './sprint'

export class ACSession {

    public playersMin = 0;
    public playersMax = 0;
    public objectives = '';
    public teams = [];
    public sprints: { name: string, planeamiento: number, ejecucion: number, revision: number, retrospectiva: number }[] = [];

    constructor() {

    }
}