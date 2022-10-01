#!/bin/sh
# This script is used to setup the environment for the WEB_BE

if [ "`id -u`" -ne 0 ]; then
echo "please run sudo ./setup.sh"
exit
fi

set -e
set -v

# Get the path to the script
HERE=$(dirname $(realpath $0))

# Set the environment variables
WEB_BE_HOME=/usr/local/etc/sgc_musago/WEB_BE
WEB_FE_HOME=/usr/local/etc/sgc_musago/WEB_FE

# Create the directories
mkdir -p $WEB_BE_HOME
mkdir -p $WEB_FE_HOME

# Copy the files to the correct location
cp -rf $HERE/../WEB_BE $WEB_BE_HOME/..
cp -rf $HERE/../WEB_FE $WEB_FE_HOME/..

SERVICE_FILE=/etc/systemd/system/sgc_musago.service

touch $SERVICE_FILE
echo "[Unit]" >> $SERVICE_FILE
echo "Description= SmartGunCabinet_Musago WEB Server" >> $SERVICE_FILE
echo "After= syslog.target network.target" >> $SERVICE_FILE
echo "" >> $SERVICE_FILE
echo "[Service]" >> $SERVICE_FILE
echo "Type=idle" >> $SERVICE_FILE
echo "WorkingDirectory=$WEB_BE_HOME" >> $SERVICE_FILE
echo "ExecStart=/usr/bin/python3 -u $WEB_BE_HOME/run.py" >> $SERVICE_FILE
echo "StandardOutput=$WEB_BE_HOME/out.log" >> $SERVICE_FILE
echo "StandardError=$WEB_BE_HOME/error.log" >> $SERVICE_FILE
echo "EnvironmentFile=$WEB_BE_HOME/environment" >> $SERVICE_FILE
echo "" >> $SERVICE_FILE
echo "[Install]" >> $SERVICE_FILE
echo "WantedBy= multi-user.target" >> $SERVICE_FILE
echo "" >> $SERVICE_FILE

# Set the permissions
chmod -R 755 $WEB_BE_HOME
chmod -R 755 $WEB_FE_HOME
chmod 644 $SERVICE_FILE

# Set the ownership
chown -R root:root $WEB_BE_HOME
chown -R root:root $WEB_FE_HOME

# Install the python packages
pip3 install -r $WEB_BE_HOME/requirements.txt

# Reload the systemd daemon
systemctl daemon-reload

# Start the service
systemctl start sgc_musago

# Enable the service
systemctl enable sgc_musago
