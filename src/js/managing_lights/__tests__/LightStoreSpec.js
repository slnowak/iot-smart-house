/**
 * Created by novy on 23.04.15.
 */

jest.dontMock('../LightStore');
jest.dontMock('../Constants');
jest.dontMock('keymirror');
jest.dontMock('object-assign');
jest.dontMock('lodash');

describe('LightStore should', function () {

  var objectUnderTest;
  var LightActionTypes;
  var callback;

  beforeEach(function () {
    objectUnderTest = require('../LightStore');
    LightActionTypes = require('../Constants').ActionTypes;
    var DispatcherMock = require('../../common/AppDispatcher');
    callback = DispatcherMock.register.mock.calls[0][0];
  });

  it("update state in response to CHANGE_LIGHT_STATE action", function () {
    callback({
      type: LightActionTypes.CHANGE_LIGHT_STATE,
      payload: {
        name: 'Kitchen',
        state: 'on'
      }
    });

    expect(objectUnderTest.newestLightConfiguration())
      .toContain({
        name: 'Kitchen',
        state: 'on'
      });
  });

  it("should update whole state in response to SUBSTITUTE_LIGHT_CONFIGURATION action", function () {
    var expectedLightState = [
      {
        name: 'room1',
        state: 'off'
      },
      {
        name: 'room2',
        state: 'on'
      }, {
        name: 'room3',
        state: 'off'
      }
    ];

    callback({
      type: LightActionTypes.SUBSTITUTE_LIGHT_CONFIGURATION,
      payload: expectedLightState
    });

    expect(objectUnderTest.newestLightConfiguration()).toEqual(expectedLightState);

  });

});
