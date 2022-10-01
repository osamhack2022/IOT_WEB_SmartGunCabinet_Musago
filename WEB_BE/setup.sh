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
export MUSAGO_WEB_BE_HOME=$WEB_BE_HOME
export MUSAGO_WEB_FE_HOME=$WEB_FE_HOME
export FLASK_APP=sgc_musago

# Add the environment variables to the profile
echo "export MUSAGO_WEB_BE_HOME=$WEB_BE_HOME" >> /etc/profile
echo "export MUSAGO_WEB_FE_HOME=$WEB_FE_HOME" >> /etc/profile
echo "export FLASK_APP=sgc_musago" >> /etc/profile

# Create the directories
mkdir -p $WEB_BE_HOME
mkdir -p $WEB_FE_HOME

# Copy the files to the correct location
cp -rf $HERE/../WEB_BE $WEB_BE_HOME/..
cp -rf $HERE/../WEB_FE $WEB_FE_HOME/..
cp -rf $HERE/sgc_musago.service /etc/systemd/system/sgc_musago.service

# Set the permissions
chmod -R 755 $WEB_BE_HOME
chmod -R 755 $WEB_FE_HOME
chmod 644 /etc/systemd/system/sgc_musago.service

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
