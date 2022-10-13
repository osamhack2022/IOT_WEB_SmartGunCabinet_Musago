import RPi.GPIO as GPIO
import serial

GPIO.setmode(GPIO.BOARD)


port = "/dev/ttyACM0"
serial = serial.Serial(port)
serial.flushInput()

while True:
	if(serial.in_waiting > 0):
		sensData = serial.readline()  #readline().decode('utf-8').rstrip()
		print(sensData)
	
