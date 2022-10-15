# WEB서비스 설치법  

git 저장소를 복사합니다.  
```$ git clone https://github.com/osamhack2022/IOT_WEB_SmartGunCabinet_Musago```  

복사한 저장소 디렉토리로 이동  
```$ cd IOT_WEB_SmartGunCabinet_Musago```  

원하는 IP, PORT설정
```$ nano ./WEB_BE/setup.sh```  

setup.sh 스크립트 실행  
```$ sudo sh ./WEB_BE/setup.sh```  

http://127.0.0.1:5000 을 웹브라우져로 열면 서비스 이용이 가능합니다.

# 설정 변경법  

설정 파일이 있는 디렉토리로 이동  
```$ cd $MUSAGO_WEB_BE_HOME```  

설정파일을 편집  
```$ sudo nano environment```  
```$ sudo nano config.py```  
현제 IP와 PORT는 서비스파일을 수정 해야합니다.
```$ sudo nano /etc/systemd/system/sgc_musago.service```  

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

# 기타 명령어
### error log 확인
```$ journalctl -fu sgc_musago```  

# Windows 계발환경 설정법
프로젝트를 clone 해서 해당 디랙토리로 이동합니다.  
```.\WEB_BE\venv setup.bat```를 관리자 권한으로 실행합니다.  
Ctrl+P  
```ext install Extensions ms-python.python```  
Ctrl+P  
```> python: Select Interpreter```  
인터프리터 경로를 ```\WEB_BE\venv\Script\python.exe```로 설정합니다.  

## 실행법  
Run and Debug(Ctrl+Shift+D)  
Python: WEB_BE Flask또는 ... debug를 선택하고  
Start Debugging(F5)을 누릅니다.  
웹브라우저에서 http://127.0.0.1:5000 을 열면 서비스 이용이 가능합니다.
