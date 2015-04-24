/**
 * Created by novy on 24.04.15.
 */

// has to be declared manually due to jest's inability to mock socket.io-client
var ioMock = jest.genMockFromModule('socket.io-client');
ioMock.on = function () {
};

module.exports = ioMock;
