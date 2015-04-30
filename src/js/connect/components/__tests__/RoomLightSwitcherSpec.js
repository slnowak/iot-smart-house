/**
 * Created by novy on 30.04.15.
 */

jest.dontMock('../ConnectScreen');
jest.dontMock('react/addons');
jest.dontMock('react-bootstrap');

describe('ConnectScreen should', function () {

  it("call action creator on button click", function () {
    //given
    var ConnectScreen = require('../ConnectScreen');
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var ActionCreatorMock = require('../../ActionCreator');

    var objectUnderTest = TestUtils.renderIntoDocument(
      <ConnectScreen/>
    );

    // when
    var urlInput = TestUtils.findRenderedDOMComponentWithTag(objectUnderTest, 'input');
    TestUtils.Simulate.change(urlInput, {
      target: {
        value: "http://192.168.0.5"
      }
    });

    var form = TestUtils.findRenderedDOMComponentWithTag(objectUnderTest, 'form');
    TestUtils.Simulate.submit(form);

    // then
    expect(ActionCreatorMock.saveRemoteUrl).toBeCalledWith('http://192.168.0.5');

  });

});
