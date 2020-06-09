import { Region, Universe } from '../src/index';
import { expect } from 'chai';

describe('Region', () => {
    const testRegion = new Region(new Map(), new Universe(new Set(), new Set()));
    it('has abiotic factors', () => {
        expect(testRegion.factors).to.exist;
    });
    it('has populations', () => {
        expect(testRegion.populations).to.exist;
    });
    it('has a parent universe', () => {
        expect(testRegion.universe).to.exist;
    });
    describe('makeStepFunc', () => {
        const testRegion = new Region(new Map(), new Universe(new Set(), new Set()));
        it('initializes the step function', () => {
            expect(testRegion.step).to.not.exist;
            testRegion.makeStepFunc();
            expect(testRegion.step).to.exist;
        });
        it('reinitializes the step function', () => {
            const previousStepFunction = ()=>{};
            testRegion.step = previousStepFunction;
            expect(testRegion.step).to.equal(previousStepFunction);
            testRegion.makeStepFunc();
            expect(testRegion.step).to.not.equal(previousStepFunction);
        });
    });
    //TODO: step function tests
});

