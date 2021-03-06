'use strict';

(function() {
  function MockMobileconnection() {
    var props = ['voice', 'data'];
    var eventListeners = null;

    function mnmmc_init() {
      props.forEach(function(prop) {
        _mock[prop] = null;
      });
      eventListeners = { 'iccinfochange': [] };
    }

    function mnmmc_addEventListener(type, callback) {
      if (eventListeners[type]) {
        eventListeners[type][eventListeners[type].length] = callback;
      }
    }

    function mnmmc_removeEventListener(type, callback) {
      if (eventListeners[type]) {
        var idx = eventListeners[type].indexOf(callback);
        eventListeners[type].splice(idx, 1);
      }
    }

    function mnmmc_triggerEventListeners(type, evt) {
      if (!eventListeners[type]) {
        return;
      }
      eventListeners[type].forEach(function(callback) {
        if (typeof callback === 'function') {
          callback(evt);
        } else if (typeof callback == 'object' &&
                   typeof callback['handleEvent'] === 'function') {
          callback['handleEvent'](evt);
        }
      });

      if (typeof _mock['on' + type] === 'function') {
        _mock['on' + type](evt);
      }
    }

    var _mock = {
      addEventListener: mnmmc_addEventListener,
      removeEventListener: mnmmc_removeEventListener,
      triggerEventListeners: mnmmc_triggerEventListeners,
      mTeardown: mnmmc_init,
      get mEventListeners() {
        return eventListeners;
      }
    };

    mnmmc_init();

    return _mock;
  }

  function MockMobileConnections() {
    var _mobileConnections = [];

    function _mAddMobileConnection(newConn, index) {
      if (newConn) {
        _mobileConnections.splice(index, 0, newConn);
      } else {
        var conn = MockMobileconnection();
        _mock[_mobileConnections.length] = conn;
        _mobileConnections.push(conn);
      }
    }

    function _mRemoveMobileConnection(index) {
      _mobileConnections.splice(index, 1);
    }

    function _mTeardown() {
      _mobileConnections.forEach(function(conn) {
        conn.mTeardown();
      });
    }

    var _mock = {
      mTeardown: _mTeardown,
      mAddMobileConnection: _mAddMobileConnection,
      mRemoveMobileConnection: _mRemoveMobileConnection,
      get length() {
        return _mobileConnections.length;
      }
    };

    _mAddMobileConnection();

    return _mock;
  }

  window.MockNavigatorMozMobileConnections = MockMobileConnections();
})();
