// Adicionar bibliotecas
//#include "MQ7.h"
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>

// Definir rede
#ifndef STASSID
#define STASSID "Bruno";
#define STAPSK  "12345678";
#endif

const char* ssid = STASSID;
const char* password = STAPSK;

ESP8266WebServer server(80);

const int led = 13;

// Definições iniciais
//#define MQ7_PIN_AOUT	A0
//
//
// Inicializando objetos necessários
// MQ7 mq7(MQ7_PIN_AOUT);

void handleRoot() {
//   int mq7Val = mq7.read();
//   mq7Val = map(mq7Val, 40, 120, 0, 255);
//   Serial.print(F("raw: ")); Serial.println(mq7.read());
//   Serial.print(F("val: ")); Serial.println(mq7Val);
  server.send(200, "text/plain", "3000");
}

void handleNotFound() {
  String message = "File Not Found\n\n";
  message += "URI: ";
  message += server.uri();
  message += "\nMethod: ";
  message += (server.method() == HTTP_GET) ? "GET" : "POST";
  message += "\nArguments: ";
  message += server.args();
  message += "\n";
  for (uint8_t i = 0; i < server.args(); i++) {
    message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
  }
  server.send(404, "text/plain", message);
  digitalWrite(led, 0);
}

void setup(void) {
  pinMode(led, OUTPUT);
  digitalWrite(led, 0);
  Serial.begin(115200);
  while (!Serial) ; // Esperar para a porta do Serial conectar
  Serial.println("start");
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.println("");

  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  if (MDNS.begin("esp8266")) {
    Serial.println("MDNS responder started");
  }

  server.on("/", handleRoot);

  server.onNotFound(handleNotFound);

  server.begin();
  Serial.println("HTTP server started");
}

void loop(void) {
  server.handleClient();
  MDNS.update();
}
