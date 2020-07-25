import { Factors } from "./helpers";
import { Trait } from "./Trait.class";

/**
 * representation of region-non-specific properties
 */
export class Universe {
    epoch: number;
    traits: Set<Trait>;
    factors: Factors;

    /**
     * create a new Universe with given traits and factors
     * @param traits possible traits in universe
     * @param factors possible abiotic factors in universe
     * @require traits do not reference non-existent traits or factors
     * @require traits are unique by "sequence:name"
     * @require factors are unique by name
     */
    constructor(traits: Set<Trait>, factors: Factors) {
        this.epoch = 0;
        this.verifyInit(traits, factors);
        this.traits = traits;
        this.factors = factors;
    }

    /**
     * generates new abiotic factors after one time step
     * @param factors abiotic factors for a given region
     * @returns new abiotic factors
     */
    updateFactors(factors:Factors):Factors {
        return factors;
    }

    /**
     * add new factors to the universe
     * @param factors a map of factors to add
     */
    addFactors(factors:Factors) {
        factors.forEach((quantity, factor) => {
            this.factors.set(factor, quantity);
        });
    }

    /**
     * add new traits to the universe
     * @param traits a set of traits to add
     */
    addTraits(traits: Set<Trait>) {
        traits.forEach((trait) => {
            this.traits.add(trait);
        });
    }

    private verifyInit(traits: Set<Trait>, factors: Factors) {
        traits.forEach((trait) => {
            // verify factor effects
            trait.factorEffects.forEach((effect, factor) => {
                if (!factors.has(factor)) {
                    throw new Error(`Invalid factorEffect: trait "${trait.name}" references factor "${factor}", but "${factor}" does not exist`);
                }
            });
            // verify trait effects
            trait.traitEffects.forEach((effect, targetTrait) => {
                if (!traits.has(targetTrait)) {
                    throw new Error(`Invalid traitEffect: trait "${trait.name}" references target trait "${targetTrait.name}", but "${targetTrait.name}" does not exist`);
                }
            });
            // verify trait children
            trait.children.forEach((childTrait) => {
                if (!traits.has(childTrait)) {
                    throw new Error(`Invalid child trait: trait "${trait.name}" references child trait "${childTrait.name}", but "${childTrait.name}" does not exist`);
                }
            });
            
        });
    }
}