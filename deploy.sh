#!/usr/bin/env bash
 echo "> FE 배포"
 cd /home/ubuntu
 run pm2 restart "yarn dev"
