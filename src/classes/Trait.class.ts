/**
 * An organism trait
 * @param name trait name
 * @param traitEffects effects on another trait by name
 * @param factorEffects incoming effects from abiotic factors by factor name
 */
export class Trait {
    name: string;
    sequence:string;
    traitEffects: Map<Trait, number>;
    factorEffects: Map<string, number>;
    children: Set<Trait>;

    constructor(name:string, sequence:string) {
        this.name = name;
        this.sequence = sequence;
        this.traitEffects = new Map<Trait, number>();
        this.factorEffects = new Map<string, number>();
        this.children = new Set<Trait>();
    }
}