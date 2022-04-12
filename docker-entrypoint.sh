#!/bin/bash

# Lauch server
carton exec hypnotoad /lufi/script/lufi

# print logs
tail -f /lufi/log/production.log
