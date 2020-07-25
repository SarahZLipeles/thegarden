import { Universe, Trait } from '../src/index';
import { expect } from 'chai';

describe('Universe', () => {
    let testUniverse;
    let trait1, trait2, trait3, trait4, trait5, trait6;
    beforeEach(() => {
        testUniverse = new Universe(new Set(), new Map());
        trait1 = new Trait('trait1', 'seq1');
        trait2 = new Trait('trait2', 'seq2');
        trait3 = new Trait('trait3', 'seq3');
        trait4 = new Trait('trait4', 'seq4');
        trait5 = new Trait('trait5', 'seq5');
        trait6 = new Trait('trait6', 'seq6');
    });

    it('has traits', () => {
        expect(testUniverse.traits).to.exist;
    });

    it('has factors', () => {
        expect(testUniverse.factors).to.exist;
    });

    it('starts at epoch 0', () => {
        expect(testUniverse.epoch).to.equals(0);
    });

    it('does not allow non-existent traits in traitEffects', () => {
        trait1.traitEffects.set(trait2, ()=>1);
        trait2.traitEffects.set(trait4, ()=>1);
        const testTraits = new Set([trait1, trait2, trait3]);
        expect(() => {
            new Universe(testTraits, new Map());
        }).to.throw('Invalid traitEffect: trait "trait2" references target trait "trait4", but "trait4" does not exist');
    });

    it('does not allow non-existent traits in childTraits', () => {
        trait1.children.add(trait2)
        trait3.children.add(trait4)
        const testTraits = new Set([trait1, trait2, trait3]);
        expect(() => {
            new Universe(testTraits, new Map());
        }).to.throw('Invalid child trait: trait "trait3" references child trait "trait4", but "trait4" does not exist');
    });

    it('does not allow non-existent factors in factorEffects', () => {
        trait2.factorEffects.set('real factor', ()=>0);
        trait3.factorEffects.set('fake factor', ()=>0);
        const testTraits = new Set([trait1, trait2, trait3]);
        const testFactors = new Map();
        testFactors.set('real factor', 10);
        testFactors.set('other real factor', 3);
        expect(() => {
            new Universe(testTraits, testFactors);
        }).to.throw('Invalid factorEffect: trait "trait3" references factor "fake factor", but "fake factor" does not exist');
    });

    describe('updateFactors', () => {
        it('returns a Map of factors', () => {
            expect(testUniverse.updateFactors(new Map()).toString()).to.equal('[object Map]')
        });
    });
    
    describe('addTraits', () => {
        it('adds a new trait to the universe', () => {
            const traits = new Set();
            traits.add(trait1);
            expect(testUniverse.traits).to.not.contain(trait1);
            testUniverse.addTraits(traits);
            expect(testUniverse.traits).to.contain(trait1);
        });

        it('adds multiple new traits to the universe', () => {
            const traits = new Set();
            traits.add(trait1);
            traits.add(trait2);
            traits.add(trait3);
            expect(testUniverse.traits).to.not.contain(trait1);
            expect(testUniverse.traits).to.not.contain(trait2);
            expect(testUniverse.traits).to.not.contain(trait3);
            testUniverse.addTraits(traits);
            expect(testUniverse.traits).to.contain(trait1);
            expect(testUniverse.traits).to.contain(trait2);
            expect(testUniverse.traits).to.contain(trait3);
        });
    });

    describe('addFactors', () => {
        const factor1 = 'factor1';
        const factor2 = 'factor2';
        const factor3 = 'factor3';
        it('adds a new factor to the universe', () => {
            const factors = new Map();
            factors.set(factor1, 12);
            expect(testUniverse.factors).to.not.contain(factor1);
            testUniverse.addFactors(factors);
            expect(testUniverse.factors.get(factor1)).to.equal(12);
        });
        
        it('adds multiple new factors to the universe', () => {
            const factors = new Map();
            factors.set(factor1, 1);
            factors.set(factor2, 1);
            factors.set(factor3, 1);
            expect(testUniverse.factors.size).to.equal(0);
            testUniverse.addFactors(factors);
            expect(testUniverse.factors.get(factor1)).to.equal(1);
            expect(testUniverse.factors.get(factor2)).to.equal(1);
            expect(testUniverse.factors.get(factor3)).to.equal(1);
        });
    });
});

