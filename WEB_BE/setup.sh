#!/bin/sh
# This script is used to update the WEB_BE and WEB_FE files on the server

if [ "`id -u`" -ne 0 ]; then
echo "please run sudo"
exit
fi

# Get the path to the script
HERE=$(dirname $(realpath $0))

# Set the environment variables
HOST=127.0.0.1
PORT=5000
WEB_BE_HOME=/usr/local/etc/sgc_musago/WEB_BE
WEB_FE_HOME=/usr/local/etc/sgc_musago/WEB_FE
SERVICE_FILE=/etc/systemd/system/sgc_musago.service
WAITRESS=/usr/local/bin/waitress-serve

set -e
set -v

# Check if python3 and pip are installed
if which python3 >/dev/null; then
  echo "python3 is installed"
else
	apt -y install python3
fi
if which pip >/dev/null; then
  echo "pip is installed"
else
	sudo -y apt install python3-pip
fi

# Install the python packages
pip install -r $HERE/../WEB_BE/requirements.txt
pip install waitress

# Create the directories
mkdir -p $WEB_BE_HOME
mkdir -p $WEB_FE_HOME

# Copy the files to the correct location
cp -rf $HERE/../WEB_BE $WEB_BE_HOME/..
cp -rf $HERE/../WEB_FE $WEB_FE_HOME/..

# Set the permissions
chmod -R 755 $WEB_BE_HOME
chmod -R 755 $WEB_FE_HOME

# Set the ownership
chown -R root:root $WEB_BE_HOME
chown -R root:root $WEB_FE_HOME

# Create the service file
if [ -e $SERVICE_FILE ]; then
  rm -f $SERVICE_FILE
fi
echo "[Unit]" >> $SERVICE_FILE
echo "Description= SmartGunCabinet_Musago WEB Server" >> $SERVICE_FILE
echo "After= syslog.target network.target" >> $SERVICE_FILE
echo "" >> $SERVICE_FILE
echo "[Service]" >> $SERVICE_FILE
echo "Type=idle" >> $SERVICE_FILE
echo "WorkingDirectory=$WEB_BE_HOME" >> $SERVICE_FILE
echo "ExecStart=$WAITRESS --host $HOST --port $PORT sgc_musago:app" >> $SERVICE_FILE
echo "StandardOutput=$WEB_BE_HOME/out.log" >> $SERVICE_FILE
echo "StandardError=$WEB_BE_HOME/error.log" >> $SERVICE_FILE
echo "EnvironmentFile=$WEB_BE_HOME/environment" >> $SERVICE_FILE
echo "" >> $SERVICE_FILE
echo "[Install]" >> $SERVICE_FILE
echo "WantedBy= multi-user.target" >> $SERVICE_FILE
echo "" >> $SERVICE_FILE
chmod 644 $SERVICE_FILE

# Reload the systemd daemon
systemctl daemon-reload

# Start the service
systemctl start sgc_musago

# Enable the service
systemctl enable sgc_musago
