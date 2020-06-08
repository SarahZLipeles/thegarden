import { Trait } from '../src/index';
import { expect } from 'chai';

describe('Trait', () => {
    const testSequence = 'testSequence'
    const testTrait = new Trait('test', testSequence);
    it('has a name', () => {
        expect(testTrait.name).to.equal('test');
    });
    it('has a dna sequence', () => {
        expect(testTrait.sequence).to.equal(testSequence);
    })
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

