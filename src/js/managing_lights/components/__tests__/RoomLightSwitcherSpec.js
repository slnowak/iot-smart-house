/**
 * Created by novy on 23.04.15.
 */

jest.dontMock('../RoomLightSwitcher');
jest.dontMock('react/addons');
jest.dontMock('react-bootstrap');

describe('RoomLightSwitcher should', function () {

  it("call action creator on button click", function () {
    var RoomLightSwitcher = require('../RoomLightSwitcher');
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var ActionCreatorMock = require('../../ActionCreator');

    var objectUnderTest = TestUtils.renderIntoDocument(
      <RoomLightSwitcher name="Kitchen" state="off"/>
    );

    var button = TestUtils.findRenderedDOMComponentWithTag(objectUnderTest, 'button');
    TestUtils.Simulate.click(button);

    expect(ActionCreatorMock.switchLight).toBeCalledWith('Kitchen', 'on');

  });

});
