#!/usr/bin/env bash
echo "> FE 배포"
sudo service codedeploy-agent restart
sudo systemctl restart nginx
