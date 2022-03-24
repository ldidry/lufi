# install perl dependencies
apt install liblwp-protocol-https-perl carton
sleep 5
git pull
sleep 5
carton install --deployment --without=test --without=sqlite --without=mysql
sleep5
carton exec hypnotoad script/lufi


