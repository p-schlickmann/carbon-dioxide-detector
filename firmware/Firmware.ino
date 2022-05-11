
// Adicionar bibliotecas
#include "Arduino.h"
#include "MQ7.h"
#include "RGBLed.h"
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>


// Definições iniciais
#define MQ7_PIN_AOUT	A0
#define RGBLED_PIN_B	4
#define RGBLED_PIN_G	14
#define RGBLED_PIN_R	12


// Inicializando objetos necessários
MQ7 mq7(MQ7_PIN_AOUT);
RGBLed rgbLed(RGBLED_PIN_R,RGBLED_PIN_G,RGBLED_PIN_B,rgbLed_TYPE);


// Roda toda vez que o circuito se conecta com a eletricidade.
void setup() 
{
    // Setar o serial que é util para debugar
    Serial.begin(9600);
    while (!Serial) ; // Esperar para a porta do Serial conectar
    Serial.println("start");
    
    rgbLed.turnOff();              // Começar com a luz apagada
    
}

// Roda infinitamente, lógica principal do circuito
void loop() 
{

  int mq7Val = mq7.read();
  mq7Val = map(mq7Val, 40, 120, 0, 255);
  Serial.print(F("raw: ")); Serial.println(mq7.read());
  Serial.print(F("val: ")); Serial.println(mq7Val);

  // Mudar a cor do rgb a cada 100ms
  rgbLed.setRGB(255 - mq7Val, mq7Val, 0);
  delay(100);   
}
