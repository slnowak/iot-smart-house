/**
 * Created by novy on 10.05.15.
 */

jest.dontMock('../SensorStore');
jest.dontMock('../Constants');
jest.dontMock('keymirror');
jest.dontMock('object-assign');
jest.dontMock('lodash');

describe('SensorStore should', function () {

  var objectUnderTest;
  var ActionTypes;
  var callback;

  beforeEach(function () {
    objectUnderTest = require('../SensorStore');
    ActionTypes = require('../Constants').ActionTypes;
    var DispatcherMock = require('../../common/AppDispatcher');
    callback = DispatcherMock.register.mock.calls[0][0];
  });

  it("update whole state in response to UPDATE_SENSORS action", function () {
    //given
    var centralHeating = {
      name: "Central heating",
      state: "off"
    };

    var airConditioning = {
      name: "Air conditioning",
      temperature: "on"
    };

    //when
    callback({
      type: ActionTypes.UPDATE_SENSORS,
      payload: [centralHeating, airConditioning]
    });

    //then
    expect(objectUnderTest.sensorState())
      .toEqual([centralHeating, airConditioning]);
  });

});
