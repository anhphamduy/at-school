# vision-attendances
A computer vision system takes attendances automatically.

Run server:
build -t server:latest .
stop $(docker ps -a -q)
rm $(docker ps -a -q)
run -p 5000:5000 server:latest
put -d to run in the background