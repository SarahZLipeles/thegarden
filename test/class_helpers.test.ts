import { clamp } from "../src/index"
import { expect } from "chai";
describe('helper functions', () => {
    describe('clamp', () => {
        it('clamps a value to fall within a range', () => {
            for (let i = 0; i < 100; i++) {
                const num = Math.random();
                let min = Math.random();
                let max = Math.random();

                if (min > max) {
                    const a = min;
                    min = max;
                    max = a;
                }

                const clamped  = clamp(num, min, max);
                if (num < min) {
                    expect(clamped).to.equal(min)
                } else if (num > max) {
                    expect(clamped).to.equal(max)
                } else {
                    expect(clamped).to.equal(num);
                }
            }
        });
        it('is agnostic to the order of a and b', () => {
            for (let i = 0; i < 100; i++) {
                const num = Math.random();
                const a = Math.random();
                const b = Math.random();
                const min = Math.min(a, b);
                const max = Math.max(a, b);
                const clamped  = clamp(num, a, b);
                if (num < min) {
                    expect(clamped).to.equal(min)
                } else if (num > max) {
                    expect(clamped).to.equal(max)
                } else {
                    expect(clamped).to.equal(num);
                }
            }
        });
    });
});