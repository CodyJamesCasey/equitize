function isFunction(functionToCheck) {
 var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

module.exports = {
    localize: function(id) {
        var fn  = this[id],
            ref = this;

        if (isFunction(fn)) {
            this[id] = function() {
                var args = Array.prototype.slice.call(arguments);
                fn.apply(ref, args);
            };
        }
    }
};
