#!/bin/sh
# This script is used to remove sgc_musago from the server

if [ "`id -u`" -ne 0 ]; then
echo "please run sudo"
exit
fi

# Get the path to the script
HERE=$(dirname $(realpath $0))

# Set the environment variables
WEB_BE_HOME=/usr/local/etc/sgc_musago/WEB_BE
WEB_FE_HOME=/usr/local/etc/sgc_musago/WEB_FE
ROOT_HOME=/usr/local/etc/sgc_musago
SERVICE_FILE=/etc/systemd/system/sgc_musago.service

set -e
set -v

# Stop the service
systemctl stop sgc_musago

# Disable the service
systemctl disable sgc_musago

# Remove the service file
if [ -e $SERVICE_FILE ]; then
  rm -f $SERVICE_FILE
fi

# Remove the directories
rm -rf $WEB_BE_HOME
rm -rf $WEB_FE_HOME
if [ -e $ROOT_HOME ]; then
  rm -rf $ROOT_HOME
fi

# Reload the systemd daemon
systemctl daemon-reload