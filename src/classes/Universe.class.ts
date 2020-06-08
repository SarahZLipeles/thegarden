import { Factors } from "./helpers";

/**
 * representation of region-non-specific properties
 */
export class Universe {
    constructor() {}

    /**
     * generates new abiotic factors after one time step
     * @param factors abiotic factors for a given region
     * @returns new abiotic factors
     */
    updateFactors(factors:Factors):Factors {
        return factors;
    }
}