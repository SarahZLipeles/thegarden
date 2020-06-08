import { Organism } from '../src/index';
import { expect } from 'chai';

describe('Organism', () => {
    const testDNASequence = 'gtac'
    const testOrganism = new Organism(testDNASequence);
    it('has a dna sequence', () => {
        expect(testOrganism).to.haveOwnProperty('dna', testDNASequence);
    });

    it('is equal to a genetically identical Organism', () => {
        expect(testOrganism.equals(new Organism(testDNASequence))).to.be.true;
    });

    it('is not equal to a genetically different Organism', () => {
        const testDNASequence2 = 'gatc';
        expect(testOrganism.equals(new Organism(testDNASequence2))).to.be.false;
    });

    describe('mutate', () => {
        it('returns a Map', () => {
            expect(testOrganism.mutate(10).toString()).to.equal('[object Map]');
        });

        it('does not mutate into itself', () => {
            expect(testOrganism.mutate(10).get(testDNASequence)).to.be.undefined;
        });
    });

    describe('getGrowthFunction', () => {
        it('returns a function', () => {
            expect(typeof testOrganism.getGrowthFunction(new Map(), new Map())).to.equal('function');
        });
        it('returns a function that returns an integer', () => {
            expect(testOrganism.getGrowthFunction(new Map(), new Map())(new Map())%1).to.equal(0);
        });
    })
});