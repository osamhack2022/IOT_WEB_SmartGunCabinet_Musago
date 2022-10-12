# WEB서비스 설치법  

git 저장소를 복사합니다.  
```$ git clone https://github.com/osamhack2022/IOT_WEB_SmartGunCabinet_Musago```  

복사한 저장소 디렉토리로 이동  
```$ cd IOT_WEB_SmartGunCabinet_Musago```  

setup.sh 스크립트 실행  
```$ sudo sh ./WEB_BE/setup.sh```  

http://127.0.0.1:5000 을 웹브라우져로 열면 서비스 이용이 가능합니다.

# 설정 변경법  

설정 파일이 있는 디렉토리로 이동  
```$ cd $MUSAGO_WEB_BE_HOME```  

설정파일을 편집  
```$ sudo nano environment```  
```$ sudo nano config.py```  

서비스 제시작  
```$ sudo systemctl restart sgc_musago```  

# 업그레이드 방법

git저장소 디렉토리로 이동  
```$ cd IOT_WEB_SmartGunCabinet_Musago```  

git pull 명령어로 최신 소스를 받아옵니다.  
```$ git pull```

이전설정파일과 업데이트된 설정파일을 확인하여 변경점을 현재 파일에 적용합니다.
```$ nano $MUSAGO_WEB_BE_HOME/config.py```  
```$ nano ./WEB_BE/config.py```  
```$ nano $MUSAGO_WEB_BE_HOME/environment```  
```$ nano ./WEB_BE/environment```  

upgrate.sh 스크립트 실행  
```$ sudo sh ./WEB_BE/upgrade.sh```  