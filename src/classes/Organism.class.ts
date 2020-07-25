import { Populations, OrganismFunction, Factors } from "./helpers";

/**
 * An organism defined by it's unique dna sequence and subsequent traits
 */
export class Organism {

    dna:string;
    maxVariants:number;
    maxDnaLength:number;

    /**
     * 
     * @param dna a unique dna sequence defining the organism
     */
    constructor(dna:string, maxVariants=1, maxDnaLength=1000) {
        this.dna = dna;
        if (maxVariants < 1 || maxVariants % 1 !== 0) {
            throw new Error('maxVariants must be a positive integer');
        }
        this.maxVariants = maxVariants;
        if (maxDnaLength < dna.length || maxDnaLength % 1 !== 0) {
            throw new Error('maxDnaLength must be an integer larger than the length of this.dna');
        }
        this.maxDnaLength = maxDnaLength;
    }

    /**
     * generates new mutations with predefined probabilities
     * @returns new mutations
     */
    mutate(currPopulation:number):Populations {// TODO
        return new Map<string, number>(); 
    }

    getGrowthFunction(populations: Populations):OrganismFunction {
        return (pop:Populations, factors:Factors) => 0;
    }

    equals(other: Organism): any {
        return this.dna === other.dna
    }

}