module.exports = function () {
  if (!Array.prototype.mapPolyfill) {
    Array.prototype.mapPolyfill = function (callback) {
      if (!(this instanceof Array || this instanceof String)) {
        throw new TypeError('Array.prototype.mapPolyfill was called on wrong type!');
      }
      if (typeof callback !== 'function') {
        throw new TypeError(`Array.prototype.mapPolyfill ${callback} is not a function!`);
      }
      //
      const arr = [];
      for (let i = 0; i < this.length; i++) {
        arr.push(callback(this[i], i, this));
      }
      return arr;
    };
  }
  //
  if (!Array.prototype.reducePolyfill) {
    Array.prototype.reducePolyfill = function (callback, initValue) {
      if (!(this instanceof Array || this instanceof String)) {
        throw new TypeError('Array.prototype.reducePolyfill was called on wrong type!');
      }
      if (typeof callback !== 'function') {
        throw new TypeError(`Array.prototype.reducePolyfill ${callback} is not a function!`);
      }
      //
      let acc = arguments.length >= 2 ? initValue : this[0];
      let start = arguments.length >= 2 ? 0 : 1;
      //
      for (let i = start; i < this.length; i++) {
        acc = callback(acc, this[i], i, this);
      }
      return acc;
    };
  }
  //
  if (!Array.prototype.flatPolyfill) {
    Array.prototype.flatPolyfill = function (depth = 1) {
      if (!Array.isArray(this)) {
        throw new TypeError('Array.prototype.flatPolyfill was called on wrong type!');
      }
      if (isNaN(depth) || depth <= 0) return this;
      //
      function flatten(arr, depth) {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
          const current = arr[i];
          if (Array.isArray(current) && depth > 0) {
            result.push(...flatten(current, depth - 1));
          } else {
            result.push(current);
          }
        }
        return result;
      }
      return flatten(this, depth);
    };
  }
};
