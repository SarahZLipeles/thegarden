/**
 * An organism trait
 */
export class Traits {
    name: string;
    effects: Map<Traits, number>;

    constructor(name:string) {
        this.name = name;
        this.effects = new Map();
    }
}