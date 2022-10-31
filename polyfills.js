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
};
