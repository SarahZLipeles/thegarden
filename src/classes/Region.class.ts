import { Populations, OrganismFunction, Factors } from "./helpers";
import { Organism } from "./Organism.class";
import { Universe } from "./Universe.class";


/**
 * A region containing information about biotic and abiotic factors as well as population and temperature
 */
export class Region {
    factors: Factors;
    populations: Populations;
    universe: Universe;
    /**
     * applies one time step to properties (in place)
     * @modifies factors, organisms, populations
     */
    step: () => void;

    constructor(factors: Factors, universe: Universe) {
        this.factors = new Map(factors);
        this.populations = new Map<string, number>();
        this.universe = universe;
    }

    /**
     * calculates new mutations
     * @modifies organisms, population, step
     */
    calcMutations() {
        let newOrganisms: Populations = new Map<string, number>();

        // get new mutations
        this.populations.forEach((population, dna) => {

            const mutPops = (new Organism(dna)).mutate(population);

            mutPops.forEach((delta, dna) => {
                if (!newOrganisms.get(dna) && delta > 0) {
                    newOrganisms.set(dna, delta);
                }
            });
        });

        // apply mutations to organism populations
        newOrganisms.forEach((delta, dna) => {
            let newMutants = false;
            const existingPopulation = this.populations.get(dna);
            // apply mutations into already existing populations
            if (existingPopulation) {
                const newPopulation = Math.max(0, existingPopulation + delta);
                this.populations.set(dna, newPopulation);
            } else {
                // add new mutant population
                this.populations.set(dna, Math.max(0, delta));
                newMutants = true;
            }

            if (newMutants) {
                // recalculate step function for new organisms
                this.makeStepFunc();
            }
        });
    }

    /**
     * generates new step function
     * @modifies step
     */
    makeStepFunc() {
        const organismFunctions: Map<string, OrganismFunction> = new Map();
        // generate population change function for each organism
        this.populations.forEach((population, dna) => {
            const organism = new Organism(dna);
            const deltaFunc = organism.getGrowthFunction(this.populations);
            organismFunctions.set(dna, deltaFunc);
        });

        this.step = () => {
            const newPopulations: Populations = new Map();

            // calculate abiotic changes
            let newFactors = this.universe.updateFactors(this.factors);

            // generate new mutations
            this.calcMutations();
            // update populations
            organismFunctions.forEach((deltaFunc, dna) => {
                const val = deltaFunc(this.populations, this.factors);
                newPopulations.set(dna, val)
            });
            // update abiotic factors
            this.factors = newFactors;
        }
    }
};

