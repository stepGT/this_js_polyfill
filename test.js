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

  describe('Testing reducePolyfill', () => {
    it('Check - wrong type', () => {
      function badFn() {
        Array.prototype.reducePolyfill.call(true, (acc, value) => acc + value);
      }
      expect(badFn).to.throw(TypeError);
    });

    it('Check - no callback', () => {
      function badFn() {
        [1, 2, 3].reducePolyfill();
      }
      expect(badFn).to.throw(TypeError);
    });

    it('Check - sum', () => {
      const arr = [1, 2, 3, 4];
      expect(arr.reducePolyfill((acc, value) => acc + value)).to.equal(
        arr.reduce((acc, value) => acc + value),
      );
    });

    it('Check - string', () => {
      expect(
        Array.prototype.reducePolyfill.call(
          'test',
          (acc, value) => {
            acc[value] = value + 1;
            return acc;
          },
          {},
        ),
      ).to.deep.equal(
        Array.prototype.reduce.call(
          'test',
          (acc, value) => {
            acc[value] = value + 1;
            return acc;
          },
          {},
        ),
      );
    });

    it('Check - properties', () => {
      expect(
        [1, 2, 3, 4].reducePolyfill((acc, value, index, arr) => {
          acc.push([value, index, arr]);
          return acc;
        }, []),
      ).to.deep.equal(
        [1, 2, 3, 4].reduce((acc, value, index, arr) => {
          acc.push([value, index, arr]);
          return acc;
        }, []),
      );
    });
  });

  describe('Testing flatPolyfill', () => {
    it('Check - wrong type', () => {
      function badFn() {
        Array.prototype.flatPolyfill.call('asdfsd');
      }
      expect(badFn).to.throw(TypeError);
    });

    it('Check - without depth', () => {
      const arr = [1, 2, [3, 4, [9]]];
      expect(arr.flatPolyfill()).to.deep.equal(arr.flat());
    });

    it('Check - depth 1', () => {
      const arr = [1, 2, [3, 4, [5, [6]], [9, 10]]];
      expect(arr.flatPolyfill(1)).to.deep.equal(arr.flat(1));
    });

    it('Check - depth 2', () => {
      const arr = [1, 2, [3, 4, [5, 6]]];
      expect(arr.flatPolyfill(2)).to.deep.equal(arr.flat(2));
    });

    it('Check - depth Infinity', () => {
      const arr = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
      expect(arr.flatPolyfill(Infinity)).to.deep.equal(arr.flat(Infinity));
    });
  });
});
