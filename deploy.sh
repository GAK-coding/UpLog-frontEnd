#!/usr/bin/env bash
echo "> FE 배포"
cd /home/ubuntu
pm2 restart "yarn dev"
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3070