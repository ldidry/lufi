FROM debian:latest

WORKDIR /lufi/

COPY . .

RUN  apt-get update  && \
     apt-get install -y build-essential libssl-dev libio-socket-ssl-perl liblwp-protocol-https-perl zlib1g-dev  libmariadbd-dev && \
     apt-get install libdbd-mysql-perl -y && \
     cpan Mojo::SQLite DBD::mysql URI::Nested && \
     cpan install Carton && \
     carton install --deployment  --without=test --without=sqlite --without=postgresql && \
     cd $(dirname $(which mariadb_config)) && \
     ln -s mariadb_config mysql_config && \
     cp /lufi/lufi.conf.template /lufi/lufi.conf && \ 
     sed -i "s/127.0.0.1/0.0.0.0/g" /lufi/lufi.conf && \
     sed -i "s/#contact/contact/g" /lufi/lufi.conf && \
     sed -i "s/#report/report/g" /lufi/lufi.conf && \
     sed -i "207 ,209 s/#/ /g" /lufi/lufi.conf && \
     sed -i "210 ,211 s/#  / /g" /lufi/lufi.conf && \
     sed -i "212 ,213 s/#/ /g" /lufi/lufi.conf && \
     sed -i "214 ,216 s/#  / /g" /lufi/lufi.conf && \
     sed -i "217 s/#/ /g" /lufi/lufi.conf && \
     sed -i "s/#max_file_size/max_file_size/g" /lufi/lufi.conf && \
     sed -i "s/#default_delay/default_delay/g" /lufi/lufi.conf && \
     sed -i "s/#max_delay/max_delay/g" /lufi/lufi.conf && \
     sed -i "s/#secrets/secrets/g" /lufi/lufi.conf     

EXPOSE 8081
 
ENTRYPOINT ["bash","/lufi/docker-entrypoint.sh"]






    
    
    




 





