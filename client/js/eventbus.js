// Manages the events of the application
module.exports = (function() {
    var SHOW_EVENTBUS_LOGS = true;

    var listenerMap = {},
        addListener = function(event, callback) {
            if (!listenerMap[event]) listenerMap[event] = [];
            listenerMap[event].push(callback);
        },
        removeListener = function(event, callback) {
            if (listenerMap[event]) {
                for (var i = 0; i < listenerMap[event].length; i++) {
                    if (listenerMap[event][i] === callback) {
                        listenerMap[event].splice(i, 1);
                        if (listenerMap[event].length <= 0) {
                            listenerMap[event] = undefined;
                            delete listenerMap[event];
                            return true;
                        }
                    }
                }
            }
            return false;
        },
        triggerListeners = function() {
            var emittedSuccessfully = false,
                args = Array.prototype.slice.call(arguments), // Normalize the arguments psuedo-array
                event = arguments[0];

            // Get rid of the event parameter of the args
            args.splice(0, 1);

            if (listenerMap[event]) {
                for (var i = 0; i < listenerMap[event].length; i++) {
                    listenerMap[event][i].apply(this, args);
                    if (!emittedSuccessfully) emittedSuccessfully = true;
                }
            }

            // The eventbus logs
            if (SHOW_EVENTBUS_LOGS) {
                if (emittedSuccessfully) {
                    console.log('Emitted event "' + event + '" with arguments', args, 'successfully');
                } else {
                    console.log('DID NOT emit event "' + event + '" with arguments', args, 'successfully');
                }
            }

            return emittedSuccessfully;
        };

    return {
        on: addListener,
        off: removeListener,
        emit: triggerListeners
    };
})();
