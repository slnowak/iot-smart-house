from gevent import monkey
monkey.patch_all()

from flask import Flask, render_template, make_response
from flask.ext.socketio import SocketIO, emit
from threading import Thread

import dhtreader
import RPi.GPIO as GPIO
import signal
import sys
import time

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret_pass'
app.config['DEBUG'] = False
socketio = SocketIO(app)

dhtreader.init()

def ReadTemp():
	t, h = dhtreader.read(11, 5)
	return t

GPIO.setmode(GPIO.BCM)

pins = {
		'light':
			{
				'room1': {'pinNumber': 17, 'state': 0},
				'room2': {'pinNumber': 27, 'state': 0},
				'room3': {'pinNumber': 22, 'state': 0} 
			}
		}
		
roomsDesiredTemp = {
				'room1' : 20,
				'room2' : 20,
				'room3' : 20
				}
						
currentTemp = ReadTemp()
			
airCondition = 'off'
centralHeating = 'off'

def CountTempAvgSetConditionOrHeating():
	avg = (roomsDesiredTemp['room1'] + roomsDesiredTemp['room2'] + roomsDesiredTemp['room3']) / 3
	if avg < currentTemp - 2:
		centralHeating = 'on'
		airCondition = 'off'
	elif avg > currentTemp + 2:
		airCondition = 'on'
		centralHeating = 'off'
	else:
		airCondition = 'off'
		centralHeating = 'off'
		
for types in pins.itervalues():
	for pinState in types.itervalues():
		GPIO.setup(pinState['pinNumber'], GPIO.OUT)
		GPIO.output(pinState['pinNumber'], GPIO.LOW)
			
def StateTranslate(int):
	if int > 0:
		return 'on'
	else:
		return 'off'

@socketio.on('connection', namespace='/lights')
def initSyncLights():
	print "Lights connected!"
	emit('lights_changed', [
			{
				'name' : 'room1',
				'state' : StateTranslate(pins['light']['light-room-1']['state'])
			},
			{
				'name' : 'room2',
				'state' : StateTranslate(pins['light']['light-room-2']['state'])
			},
			{
				'name' : 'room3',
				'state' : StateTranslate(pins['light']['light-room-3']['state'])
			}
		])
	return
	
@socketio.on('connection', namespace='/temperature')
def initSyncTemp():
	print "Temperature connected!"
	emit('temperatures', 
		[
			{
				'roomName' : 'room1',
				'state' : roomsDesiredTemp['room1']
			},
			{
				'roomName' : 'room2',
				'state' : roomsDesiredTemp['room2']
			},
			{
				'roomName' : 'room3',
				'state' : roomsDesiredTemp['room3']
			}
		]		
	)
	return
	
@socketio.on('disconnect', namespace='/temperature')
def test_disconnectTemp():
	print "Client disconnected!"
	return
	
@socketio.on('disconnect', namespace='/lights')
def test_disconnectLights():
	print "Client disconnected!"
	return

@socketio.on('switch_light', namespace='/lights')
def handleLightChange(data):
	roomId = data['name']
	state = data['state']
	pinNumber = pins['light'][roomId]['pinNumber']

	if state == 1:
		GPIO.output(pinNumber, GPIO.HIGH)
	if state == 0:
		GPIO.output(pinNumber, GPIO.LOW)

	for states in pins['light'].itervalues():
		for pinState in states:
			pinState['state'] = GPIO.input(pinState['pinNumber'])
	emit('lights_changed', [
			{
				'name' : 'room1',
				'state' : StateTranslate(pins['light']['light-room-1']['state'])
			},
			{
				'name' : 'room2',
				'state' : StateTranslate(pins['light']['light-room-2']['state'])
			},
			{
				'name' : 'room3',
				'state' : StateTranslate(pins['light']['light-room-3']['state'])
			}
		], broadcast = True)

	print "Light change!"
	return
	
@socketio.on('desired_temperature_changed', namespace='/temperature')
def handleDesiredTempChange(data):
	roomId = data['roomName']
	temp = data['temperature']
	
	roomsDesiredTemp[roomId] = temp
	
	emit('temperatures', 
		[
			{
				'roomName' : 'room1',
				'state' : roomsDesiredTemp['room1']
			},
			{
				'roomName' : 'room2',
				'state' : roomsDesiredTemp['room2']
			},
			{
				'roomName' : 'room3',
				'state' : roomsDesiredTemp['room3']
			}
		]		
	)

	print "DesiredTempChange!"
	return
	
@socketio.on('getGlobalTemp', namespace='/temperature')
def sendGlobalTemp():
	
	while True:

		currentTemp = ReadTemp()
		CountTempAvgSetConditionOrHeating()
		
		emit('globalTemp', 
				{
					'glboalTemp' : currentTemp,
					'airCondition' : airCondition,
					'centralHeating' : centralHeating
				}
		, broadcast = True)
		
		print 'globalTempSend'
		time.sleep( 5 )
	
@app.route("/")
def index():
	return render_template('index.html')

def signalHandler(signal, frame):
	GPIO.cleanup()
	sys.exit(0)

signal.signal(signal.SIGINT, signalHandler)

if __name__ == "__main__":
	socketio.run(app, host='0.0.0.0')
	t = Thread(target=sendGlobalTemp, args = ())
	t.start()
