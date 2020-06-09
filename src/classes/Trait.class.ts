import { Effect } from "./helpers";


/**
 * An organism trait
 * @param name trait name
 * @param traitEffects effects on another trait by name
 * @param factorEffects incoming effects from abiotic factors by factor name
 */
export class Trait {
    name: string;
    sequence:string;
    traitEffects: Map<Trait, Effect>;
    factorEffects: Map<string, Effect>;
    children: Set<Trait>;

    constructor(name:string, sequence:string) {
        this.name = name;
        this.sequence = sequence;
        this.traitEffects = new Map<Trait, Effect>();
        this.factorEffects = new Map<string, Effect>();
        this.children = new Set<Trait>();
    }
}