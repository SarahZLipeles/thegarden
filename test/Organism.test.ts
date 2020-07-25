import { Organism } from '../src/index';
import { expect } from 'chai';

describe('Organism', () => {
    const testDnaSequence = 'gtac'
    let testOrganism = new Organism(testDnaSequence);
    beforeEach(() => {
        testOrganism = new Organism(testDnaSequence);
    })
    it('has a dna sequence', () => {
        expect(testOrganism).to.haveOwnProperty('dna', testDnaSequence);
    });

    it('has maxVariants', () => {
        expect(testOrganism.maxVariants).to.be.greaterThan(0);
    });

    it('has maxDnaLength', () => {
        expect(testOrganism.maxDnaLength).to.be.greaterThan(testOrganism.dna.length);
    });
    
    it('doesn\'t allow maxDnaLength shorter than the dna sequence', () => {
        expect(() => {
            new Organism(testDnaSequence, 1, 1);
        }).to.throw('maxDnaLength must be an integer larger than the length of this.dna');
    });

    it('only allows positive integers for maxVariants', () => {
        expect(() => {
            new Organism(testDnaSequence, -1);
        }).to.throw('maxVariants must be a positive integer');
        expect(() => {
            new Organism(testDnaSequence, 0);
        }).to.throw('maxVariants must be a positive integer');
        expect(() => {
            new Organism(testDnaSequence, 1.2);
        }).to.throw('maxVariants must be a positive integer');
    });

    it('is equal to a genetically identical Organism', () => {
        expect(testOrganism.equals(new Organism(testDnaSequence))).to.be.true;
    });

    it('is not equal to a genetically different Organism', () => {
        const testDnaSequence2 = 'gatc';
        expect(testOrganism.equals(new Organism(testDnaSequence2))).to.be.false;
    });

    describe('mutate', () => {
        it('returns a Map', () => {
            expect(testOrganism.mutate(10).toString()).to.equal('[object Map]');
        });

        it('does not mutate into itself', () => {
            expect(testOrganism.mutate(10).get(testDnaSequence)).to.be.undefined;
        });
    });

    describe('getGrowthFunction', () => {
        it('returns a function', () => {
            expect(typeof testOrganism.getGrowthFunction(new Map())).to.equal('function');
        });
        it('returns a function that returns an integer', () => {
            expect(testOrganism.getGrowthFunction(new Map())(new Map(), new Map())%1).to.equal(0);
        });
    })
});