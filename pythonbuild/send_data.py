import serial
import time

ser = serial.Serial('/dev/ttyUSB0',9600)

ser.write('1')
# ser.write('2')
time.sleep(0.1)
data = ser.readline()
# time.sleep(0.1)
print("isad")
print(data)
# while True:

#     print(data)
#     time.sleep(0.1)
