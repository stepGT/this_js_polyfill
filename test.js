const expect = require('chai').expect;

const polyfills = require('./polyfills');

describe('Test polyfills', () => {
  before(() => {
    polyfills();
  });
  //
  describe('Testing mapPolyfill', () => {
    it('Check - wrong type', () => {
      function badFn() {
        Array.prototype.mapPolyfill.call(true, (value) => value);
      }
      expect(badFn).to.throw(TypeError);
    });

    it('Check - no callback', () => {
      function badFn() {
        [1, 2, 3].mapPolyfill();
      }
      expect(badFn).to.throw(TypeError);
    });

    it('Check - simple loop', () => {
      expect([1, 2, 3, 4].mapPolyfill((item) => item + 10)).to.deep.equal(
        [1, 2, 3, 4].map((item) => item + 10),
      );
    });

    it('Check - string', () => {
      expect(Array.prototype.mapPolyfill.call('string', (value) => `${value},`)).to.deep.equal(
        Array.prototype.map.call('string', (value) => `${value},`),
      );
    });

    it('Check - properties', () => {
      const arr = [1, 2, 3, 4];
      expect(arr.mapPolyfill((item, index, arr) => [item, index, arr])).to.deep.equal(
        arr.map((item, index, arr) => [item, index, arr]),
      );
    });
  });
});
