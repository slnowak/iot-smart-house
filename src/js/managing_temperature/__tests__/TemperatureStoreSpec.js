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
      currentTemperature: 25,
      desiredTemperature: 20,
      sensors: [

        {
          name: 'Air Conditioning',
          state: 'on'
        },
        {
          name: 'Central Heating',
          state: 'off'
        }
      ]
    };

    var bedroom = {
      roomName: "Bedroom",
      currentTemperature: 20,
      desiredTemperature: 30,
      sensors: [
        {
          name: 'Air Conditioning',
          state: 'off'
        },
        {
          name: 'Central Heating',
          state: 'on'
        }
      ]
    };

    //when
    callback({
      type: TemperatureActionTypes.UPDATE_ALL_DATA,
      payload: [kitchen, bedroom]
    });

    //then
    expect(objectUnderTest.newestTemperatureData())
      .toEqual([kitchen, bedroom]);

  });

  it("update temperature in response to UPDATE_TEMPERATURE action", function () {
    //given
    var kitchen = {
      roomName: "Kitchen",
      currentTemperature: 25,
      desiredTemperature: 20,
      sensors: [
        {
          name: 'Air Conditioning',
          state: 'on'
        },
        {
          name: 'Central Heating',
          state: 'off'
        }
      ]
    };

    callback({
      type: TemperatureActionTypes.UPDATE_ALL_DATA,
      payload: [kitchen]
    });


    //when
    callback({
      type: TemperatureActionTypes.UPDATE_TEMPERATURE,
      payload: {
        roomName: 'Kitchen',
        temperature: 10
      }
    });

    var merge = require('lodash').merge;
    var desiredKitchenConfiguration = merge({}, kitchen);
    desiredKitchenConfiguration.currentTemperature = 10;

    //then
    expect(objectUnderTest.newestTemperatureData()).toEqual([desiredKitchenConfiguration]);

  });

  it("update desired temperature in response to UPDATE_DESIRED_TEMPERATURE action", function () {
    //given
    var kitchen = {
      roomName: "Kitchen",
      currentTemperature: 25,
      desiredTemperature: 20,
      sensors: [
        {
          name: 'Air Conditioning',
          state: 'on'
        },
        {
          name: 'Central Heating',
          state: 'off'
        }
      ]
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
    desiredKitchenConfiguration.desiredTemperature = 10;

    //then
    expect(objectUnderTest.newestTemperatureData()).toEqual([desiredKitchenConfiguration]);

  });

  it("update system sensor state in response to UPDATE_SYSTEM_SENSOR action", function () {
    //given
    var kitchen = {
      roomName: "Kitchen",
      currentTemperature: 25,
      desiredTemperature: 20,
      sensors: [
        {
          name: 'Air Conditioning',
          state: 'on'
        },
        {
          name: 'Central Heating',
          state: 'off'
        }
      ]
    };

    callback({
      type: TemperatureActionTypes.UPDATE_ALL_DATA,
      payload: [kitchen]
    });


    //when
    callback({
      type: TemperatureActionTypes.UPDATE_SYSTEM_SENSOR,
      payload: {
        roomName: 'Kitchen',
        sensor: {
          name: 'Air Conditioning',
          state: 'off'
        }
      }
    });

    var merge = require('lodash').merge;
    var desiredKitchenConfiguration = merge({}, kitchen);
    desiredKitchenConfiguration.sensors[0].state = 'off';

    //then
    expect(objectUnderTest.newestTemperatureData()).toEqual([desiredKitchenConfiguration]);

  });

});
