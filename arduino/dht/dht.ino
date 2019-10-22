
#include "DHT.h"

#define DHTPIN 9    
#define DHTTYPE DHT11   // DHT 22  (AM2302), AM2321


DHT dht(DHTPIN, DHTTYPE);
int photoresistor=A1;
int value;
int relay=2;
int PB = 3;
int buttonState=0;
void setup() {
  Serial.begin(9600);
  pinMode(photoresistor, INPUT);
//  Serial.println(F("DHTxx test!"));
  pinMode(relay, OUTPUT);
  pinMode(PB,INPUT);
  
  dht.begin();
}

void loop() {
  // Wait a few seconds between measurements.
  buttonState=digitalRead(PB);
  
  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();
  // Read temperature as Fahrenheit (isFahrenheit = true)
  float f = dht.readTemperature(true);
  value = analogRead(photoresistor);
  // Check if any reads failed and exit early (to try again).
//  if (isnan(h) || isnan(t) || isnan(f)) {
//    Serial.println(F("Failed to read from DHT sensor!"));
//    return;
//  }
  
  // Compute heat index in Fahrenheit (the default)
  float hif = dht.computeHeatIndex(f, h);
  // Compute heat index in Celsius (isFahreheit = false)
  float hic = dht.computeHeatIndex(t, h, false);

//  Serial.write(f);
//  Serial.write(t);
//  Serial.write(h);
//  Serial.print(F("Humidity: "));
  Serial.print(value);
  Serial.print(',');
  Serial.print(h);
//  Serial.print(F("%  Temperature: "));
  Serial.print(",");
  Serial.print(t);
  Serial.print(",");
  Serial.print(buttonState);
  Serial.println("");
//  Serial.print(F("°C "));
//  Serial.print(f);
//  Serial.print(F("°F  Heat index: "));
//  Serial.print(hic);
//  Serial.print(F("°C "));
//  Serial.print(hif);
//  Serial.println(F("°F"));
delay(2000);
}
