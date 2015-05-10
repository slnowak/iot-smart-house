/**
 * Created by novy on 27.04.15.
 */

jest.dontMock('../TemperatureStore');
jest.dontMock('../Constants');
jest.dontMock('keymirror');
jest.dontMock('object-assign');
jest.dontMock('lodash');

describe('TemperatureStore should', function () {

  var objectUnderTest;
  var TemperatureActionTypes;
  var callback;

  beforeEach(function () {
    objectUnderTest = require('../TemperatureStore');
    TemperatureActionTypes = require('../Constants').ActionTypes;
    var DispatcherMock = require('../../common/AppDispatcher');
    callback = DispatcherMock.register.mock.calls[0][0];
  });

  it("update whole state in response to UPDATE_ALL_DATA action", function () {
    //given
    var kitchen = {
      roomName: "Kitchen",
      temperature: 25
    };

    var bedroom = {
      roomName: "Bedroom",
      temperature: 20
    };

    //when
    callback({
      type: TemperatureActionTypes.UPDATE_ALL_DATA,
      payload: [kitchen, bedroom]
    });

    //then
    expect(objectUnderTest.desiredTemperature())
      .toEqual([kitchen, bedroom]);

  });

  it("update desired temperature in response to UPDATE_DESIRED_TEMPERATURE action", function () {
    //given
    var kitchen = {
      roomName: "Kitchen",
      temperature: 25
    };

    callback({
      type: TemperatureActionTypes.UPDATE_ALL_DATA,
      payload: [kitchen]
    });


    //when
    callback({
      type: TemperatureActionTypes.UPDATE_DESIRED_TEMPERATURE,
      payload: {
        roomName: 'Kitchen',
        temperature: 10
      }
    });

    var merge = require('lodash').merge;
    var desiredKitchenConfiguration = merge({}, kitchen);
    desiredKitchenConfiguration.temperature = 10;

    //then
    expect(objectUnderTest.desiredTemperature()).toEqual([desiredKitchenConfiguration]);

  });

  it("update current global in response to UPDATE_CURRENT_GLOBAL_TEMPERATURE action", function () {

    //when
    callback({
      type: TemperatureActionTypes.UPDATE_CURRENT_GLOBAL_TEMPERATURE,
      payload: 666
    });

    //then
    expect(objectUnderTest.currentGlobalTemperature()).toEqual(666);

  });


});
