'use strict';

var _createBrowserHistory = require('history').createBrowserHistory;

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _index = require('./index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.onClientEntry = function (_, _ref) {
  var transitionTime = _ref.transitionTime;

  global.window[_index.pageTransitionTime] = transitionTime || 250;
};

var getUserConfirmation = function getUserConfirmation(pathname, callback) {
  var event = new global.window.CustomEvent(_index.pageTransitionEvent, {
    detail: { pathname: pathname }
  });
  global.window.dispatchEvent(event);
  var time = global.window[_index.componentTransitionTime] || global.window[_index.pageTransitionTime];
  global.window[_index.pageTransitionExists] ? setTimeout(function () {
    return callback(true);
  }, time) : callback(true);
};

var history = (0, _createBrowserHistory2.default)({ getUserConfirmation: getUserConfirmation });
history.block(function (location) {
  return location.pathname;
});
exports.onRouteUpdate = function () {
  return history;
};
