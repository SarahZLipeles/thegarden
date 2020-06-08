/**
 * An organism trait
 */
export class Trait {
    name: string;
    effects: Map<Trait, number>;

    constructor(name:string) {
        this.name = name;
        this.effects = new Map();
    }
}