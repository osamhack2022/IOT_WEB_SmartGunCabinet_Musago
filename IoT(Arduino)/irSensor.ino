#define sen1 A0 //센서가 연결된 핀 A0 기준 왼쪽부터 1,2,3,4,5
#define sen1 A1 
#define sen1 A2 
#define sen1 A3 
#define sen1 A4 


void setup() {
  Serial.begin(9600); 

}

void loop() {
  float volts = analogRead(sen1) * 0.0048828125; //전압 = 센서값*(5/1024)
  int distance = 13 * pow(volts, -1); //데이터시트 센서 튿성에 전압을 대입하여 센서값 생성(거리 구하는 공식)
  delay(100);
  Serial.println(distance); 
  if(distance>10){
    Serial.println("false");
    } else{Serial.println("true");}
    
}
