/**
 * clamps a value to fall within a range
 * @param num number to clamp
 * @param a minimum (or maximum) value for range
 * @param b maximum (or minimum) value for range
 */
export function clamp(num:number, a:number, b:number):number {
    return Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b))
};

export type OrganismFunction = (populations: Populations) => number;
export type Populations = Map<string, number>;
export type Factors = Map<string, number>;