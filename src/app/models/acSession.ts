//TODO: Add all main components.
//TODO: Complete models (class, attribures, relationships)
//TODO: Add Select with number of sprints.
//TODO: Add style to main components.
//

import { Team } from './team';
import { Sprint } from './sprint'


export class ACSession {

    public playersMin = 0;
    public playersMax = 0;
    public teams: { players: [] }[] = [];
    public sprints: { name: string, planeamiento: number, ejecucion: number, revision: number, retrospectiva: number }[] = [];

    constructor() {

    }
}