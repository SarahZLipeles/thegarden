/**
 * clamps a value to fall within a range
 * @param num number to clamp
 * @param a minimum (or maximum) value for range
 * @param b maximum (or minimum) value for range
 */
export function clamp(num:number, a:number, b:number):number {
    return Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b))
};

/**
 * Maps organism sequence to population size
 */
export type Populations = Map<string, number>;
/**
 * maps abiotic factor name to quantity
 */
export type Factors = Map<string, number>;
/**
 * effect of factor or trait on another trait given a factor or organism quantity
 */
export type Effect = (quantity: number) => number;

export type OrganismFunction = (populations: Populations, factors: Factors) => number;