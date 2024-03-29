#!/usr/bin/env bash
set -euo pipefail

echo "**********************************************************************"
echo "                                                                     *"
echo "Install dependencies                                                 *"
echo "                                                                     *"
echo "**********************************************************************"

SUDO=sudo
$SUDO apt update
$SUDO apt install jq wget unzip carton build-essential nginx libssl-dev libio-socket-ssl-perl liblwp-protocol-https-perl zlib1g-dev libmojo-sqlite-perl libpq-dev -y

echo "**********************************************************************"
echo "                                                                     *"
echo "Configuring the Application                                          *"
echo "                                                                     *"
echo "**********************************************************************"

sleep 10;
version=$(curl -s https://framagit.org/api/v4/projects/1998/releases | jq '.[]' | jq -r '.name' | head -1)
echo $version
pushd ${directory} 
$SUDO wget https://framagit.org/fiat-tux/hat-softwares/lufi/-/archive/$version/lufi-$version.zip
$SUDO unzip lufi-$version.zip
$SUDO chown ${user} lufi-$version
$SUDO chgrp ${group} lufi-$version
pushd lufi-$version

echo "**********************************************************************"
echo "                                                                     *"
echo "Install Carton Packages                                              *"
echo "                                                                     *"
echo "**********************************************************************"

$SUDO carton install --deployment --without=test --without=sqlite --without=mysql

sleep 10;

$SUDO cp lufi.conf.template lufi.conf

sed -i 's/127.0.0.1/0.0.0.0/'  lufi.conf
sed -i 's/#contact/contact/g' lufi.conf
sed -i "s/contact.example.com/${contact_lufi}/g" lufi.conf
sed -i 's/#report/report/' -i lufi.conf
sed -i "s/report@example.com/${report_lufi}/g" lufi.conf
sed -i "192 , 194 s/#/ /g" lufi.conf && \
sed -i "195 s/#  / /g" lufi.conf && \
sed -i "196 , 198 s/#/ /g" lufi.conf && \
sed -i "199 , 201 s/#  / /g" lufi.conf && \
sed -i "202 s/#/ /g" lufi.conf

echo "**********************************************************************"
echo "                                                                     *"
echo "Run the Application                                                  *"
echo "                                                                     *"
echo "**********************************************************************"

$SUDO carton exec hypnotoad script/lufi
