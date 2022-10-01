#!/bin/sh
# This script is used to setup the environment for the WEB_BE

if [ "`id -u`" -ne 0 ]; then
echo "please run sudo"
exit
fi

# Get the path to the script
HERE=$(dirname $(realpath $0))

# Set the environment variables
WEB_BE_HOME=/usr/local/etc/sgc_musago/WEB_BE
WEB_FE_HOME=/usr/local/etc/sgc_musago/WEB_FE
SERVICE_FILE=/etc/systemd/system/sgc_musago.service

set -e
set -v

# Copy the files to the correct location
cp -rf $HERE/../WEB_BE $WEB_BE_HOME/..
cp -rf $HERE/../WEB_FE $WEB_FE_HOME/..

# Set the permissions
chmod -R 755 $WEB_BE_HOME
chmod -R 755 $WEB_FE_HOME
chmod 644 $SERVICE_FILE

# Set the ownership
chown -R root:root $WEB_BE_HOME
chown -R root:root $WEB_FE_HOME

# Restart the service
systemctl restart sgc_musago
