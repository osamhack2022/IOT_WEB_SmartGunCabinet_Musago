#!/bin/sh
# This script is used to setup the environment for the WEB_BE

if [ $EUID -ne 0 ]
then
echo "please run sudo ./setup.sh"
exit
fi
set -e

# Set the environment variables
export WEB_BE_HOME=/usr/local/etc/mgc_musago/WEB_BE
export WEB_FE_HOME=/usr/local/etc/mgc_musago/WEB_FE

# Add the environment variables to the profile
echo "export MUSAGO_WEB_BE_HOME=$WEB_BE_HOME" >> /etc/profile
echo "export MUSAGO_WEB_FE_HOME=$WEB_FE_HOME" >> /etc/profile
echo "export FLASK_APP=mgc_musago" >> /etc/profile

# Copy the files to the correct location
cp -r ../WEB_BE $WEB_BE_HOME
cp -r ../WEB_FE $WEB_FE_HOME
cp -r ./mgc_musago.service /etc/systemd/system/mgc_musago.service

# Set the permissions
chmod -R 755 $WEB_BE_HOME
chmod -R 755 $WEB_FE_HOME
chmod 644 /etc/systemd/system/mgc_musago.service

# Set the ownership
chown -R root:root $WEB_BE_HOME
chown -R root:root $WEB_FE_HOME

# Install the python packages
pip3 install -r $WEB_BE_HOME/requirements.txt

# Reload the systemd daemon
systemctl daemon-reload

# Start the service
systemctl start mgc_musago

# Enable the service
systemctl enable mgc_musago
