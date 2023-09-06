from sense_hat import SenseHat

sense = SenseHat()
temp = sense.get_temperature()
print("Temperature: %s C" % temp)

# alternatives
print(sense.temp)
print(sense.temperature)
