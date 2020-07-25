import { Trait } from '../src/index';
import { expect } from 'chai';

describe('Trait', () => {
    const testSequence = 'testSequence'
    const testTrait = new Trait('test', testSequence, 0.01);
    it('has a name', () => {
        expect(testTrait.name).to.equal('test');
    });
    it('has a dna sequence', () => {
        expect(testTrait.sequence).to.equal(testSequence);
    });
    it('has a mutation chance', () => {
        expect(testTrait.mutationChance).to.equal(0.01);
    });
    it('doesn\'t allow mutationChance > 1 or < 0', () => {
        expect(() => {
            new Trait('test', testSequence, 1.1)
        }).to.throw('mutationChance must be between 0 and 1. Instead got: 1.1');
        expect(() => {
            new Trait('test', testSequence, -0.1)
        }).to.throw('mutationChance must be between 0 and 1. Instead got: -0.1');
    });
    it('has a Map of effects on other Triats', () => {
        expect(testTrait.traitEffects.toString()).to.equal('[object Map]');
    });
    it('has a Map of effects from factors by name', () => {
        expect(testTrait.factorEffects.toString()).to.equal('[object Map]');
    });
    it('has a list of child triats', () => {
        expect(testTrait.children).to.exist;
    })
});

