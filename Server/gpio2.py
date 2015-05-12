from gevent import monkey
import gevent

monkey.patch_all()

from flask import Flask, copy_current_request_context
from flask.ext.socketio import SocketIO, emit

import dhtreader
import RPi.GPIO as GPIO
import signal
import sys
import time

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret_pass'
app.config['DEBUG'] = True
socketio = SocketIO(app)

dhtreader.init()


def read_temp():
    x = dhtreader.read(11, 5)
    while x == None:
        x = dhtreader.read(11, 5)
    return x[0]

GPIO.setmode(GPIO.BCM)

pins = {
    'light': {
        'room1': {'pin_number': 17, 'state': 0},
        'room2': {'pin_number': 27, 'state': 0},
        'room3': {'pin_number': 22, 'state': 0}
    }
}

rooms_desired_temp = {
    'room1': 30,
    'room2': 30,
    'room3': 30
}

current_temp = read_temp()

air_condition = 'off'
central_heating = 'off'


def count_temp_avg_set_condition_or_heating():
    global air_condition, central_heating
    avg = (rooms_desired_temp['room1'] + rooms_desired_temp['room2'] + rooms_desired_temp['room3']) / 3
    if avg < current_temp - 2:
        central_heating = 'off'
        air_condition = 'on'
    elif avg > current_temp + 2:
        air_condition = 'off'
        central_heating = 'on'
    else:
        air_condition = 'off'
        central_heating = 'off'


for types in pins.itervalues():
    for pin_state in types.itervalues():
        GPIO.setup(pin_state['pin_number'], GPIO.OUT)
        GPIO.output(pin_state['pin_number'], GPIO.LOW)


def state_translate(state):
    return 'on' if state > 0 else 'off'


@socketio.on('connect', namespace='/lights')
def init_sync_lights():
    print "Lights connected!"
    emit_lights(False)


@socketio.on('connect', namespace='/temperature')
def init_sync_temp():
    print "Temperature connected!"
    emit_desired_temp(False)

    @copy_current_request_context
    def keep_sending_global_sensor_state(namespace):
        send_global_temp(namespace)

    gevent.spawn(keep_sending_global_sensor_state, '/temperature')


@socketio.on('disconnect', namespace='/temperature')
def test_disconnect_temp():
    print "Client disconnected! (from /temperature namespace)"


@socketio.on('disconnect', namespace='/lights')
def test_disconnect_lights():
    print "Client disconnected! (from /lights namespace)"


@socketio.on('switch_light', namespace='/lights')
def handle_light_change(data):
    room_id = data['name']
    state = data['state']
    pin_number = pins['light'][room_id]['pin_number']

    pin_output = GPIO.HIGH if state == 'on' else GPIO.LOW
    GPIO.output(pin_number, pin_output)

    for room_pin_configuration in pins['light'].itervalues():
        room_pin_configuration['state'] = GPIO.input(room_pin_configuration['pin_number'])

    emit_lights(True)

    print "Light change!"
    return


@socketio.on('desired_temperature_changed', namespace='/temperature')
def handle_desired_temp_change(data):
    room_id = data['roomName']
    temp = data['temperature']

    rooms_desired_temp[room_id] = temp

    emit_desired_temp(True)

    print "Desired Temp Change!"
    return


def send_global_temp(namespace):
    global current_temp
    while True:
        curent_temp = read_temp()
        count_temp_avg_set_condition_or_heating()

        emit('sensors_state', {
            'currentTemp': current_temp,
            'sensors': [
                {
                    'name': 'Air Conditioning',
                    'state': air_condition
                },
                {
                    'name': 'Central Heating',
                    'state': central_heating
                },

            ]

        }, broadcast=True, namespace=namespace)

        print 'global Temp Send'
        time.sleep(5)


def signal_handler(signal, frame):
    GPIO.cleanup()
    sys.exit(0)

def emit_lights(broadcast):
    emit('lights_changed', [
        {
            'name': 'room1',
            'state': state_translate(pins['light']['room1']['state'])
        },
        {
            'name': 'room2',
            'state': state_translate(pins['light']['room2']['state'])
        },
        {
            'name': 'room3',
            'state': state_translate(pins['light']['room3']['state'])
        }
    ], broadcast=broadcast)

def emit_desired_temp(broadcast):
    emit('desired_temperatures',
         [
             {
                 'roomName': 'room1',
                 'temperature': rooms_desired_temp['room1']
             },
             {
                 'roomName': 'room2',
                 'temperature': rooms_desired_temp['room2']
             },
             {
                 'roomName': 'room3',
                 'temperature': rooms_desired_temp['room3']
             }
         ], broadcast=broadcast)




signal.signal(signal.SIGINT, signal_handler)

if __name__ == "__main__":
    socketio.run(app, host='0.0.0.0')