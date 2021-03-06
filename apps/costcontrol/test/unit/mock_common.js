'use strict';

var MockCommon = function(config) {

  function getMockRequiredMessage(mocking, parameter, isAFunction) {
    var whatIsBeingAccesed = mocking + (isAFunction ? '() is being called' :
                                                      'is being accessed');

    return 'Please, ' + whatIsBeingAccesed + '. Provide the key `' +
           parameter + '` in the constructor config object to mock it.';
  }

  config = config || {};

  var fakeAllInterfaces = [
    {'type': 0, 'id': '0'},
    {'type': 1, 'id': '8100075100210526976'},
    {'type': 1, 'id': '1234575100210522938'}
  ];

  return {
    COST_CONTROL_APP: 'app://costcontrol.gaiamobile.org',
    allNetworkInterfaces: {},
    isValidICCID: function(iccid) {
      assert.isDefined(
        config.isValidICCID,
        getMockRequiredMessage('isValidICCID', 'isValidICCID', true)
      );
      return config.isValidICCID;
    },
    waitForDOMAndMessageHandler: function(window, callback) {
      callback();
    },
    checkSIMChange: function(callback) {
      callback();
    },
    startFTE: function(mode) {
      var event = new CustomEvent('ftestarted', { detail: mode });
      window.dispatchEvent(event);
    },
    startApp: function() {
      var event = new CustomEvent('appstarted');
      window.dispatchEvent(event);
    },
    closeApplication: function() {
      var event = new CustomEvent('appclosed');
      window.dispatchEvent(event);
    },
    modalAlert: function(msg) {
      var event = new CustomEvent('fakealert', { detail: msg });
      window.dispatchEvent(event);
      console.log('Alert: ' + msg);
    },
    getCurrentSIMInterface: function getCurrentSIMInterface() {
      var currentSimCard = fakeAllInterfaces[1];
      return currentSimCard;
    },
    getWifiInterface: function() {
      var wifiInterface = fakeAllInterfaces[0];
      return wifiInterface;
    },
    loadNetworkInterfaces: function() {
      var self = this;

      setTimeout(function() {
        self.allNetworkInterfaces = fakeAllInterfaces;
      }, 0);
    }
  };
};
