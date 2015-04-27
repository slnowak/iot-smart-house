/**
 * Created by novy on 27.04.15.
 */

jest.dontMock('../RoomTemperatureCoordinator');
jest.dontMock('react/addons');
jest.dontMock('react-bootstrap');

describe('RoomTemperatureCoordinator should', function() {

  it("call action creator when desired temperature changed", function () {
    //setup
    var RoomTemperatureCoordinator = require('../RoomTemperatureCoordinator');
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var ActionCreatorMock = require('../../ActionCreator');

    //given
    var objectUnderTest = TestUtils.renderIntoDocument(
      <RoomTemperatureCoordinator name="Kitchen" desiredTemperature={15} />
    );
    var slider = TestUtils.findRenderedDOMComponentWithClass(objectUnderTest, 'slider');


    //when
    TestUtils.Simulate.change(slider, {
      target: {
        value: "25"
      }
    });

    //then
    expect(ActionCreatorMock.changeDesiredTemperature).toBeCalledWith('Kitchen', "25");

  });

});
