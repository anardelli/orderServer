# Order Server
- It is used to manage the orders of a restraurant.

- This server has API's of create, cancel, get and update the order.

- It also has API of sum of cost of a order.

- It provides the list of orders based on list of restaurants.

- It also produces messages to restaurant server whenever an order get placed.

**Clustering, Service Discovery, Messaging using RabbitMQ( AQMP ).**

**Technology Used: NodeJS, Express JS, MongoDB, RabbitMQ, PM2, Docker, Consul.**

# How to run this server

**This server is using consul configuration code so first pull the consul image from docker hub by using following command and launch the container**

- docker pull consul
- docker run -d -p 8500:8500 -p 8600:8600/udp --name=badger consul agent -server -ui -node=server-1 -bootstrap-expect=1 -client=0.0.0.0

**Take the IP of consul running container and replace it with config/consul.js at line 21 host IP.**
- Now server is ready to run.

# You can make image of this server by using following command.

- docker build -t order_server.
- docker run -it -d -p 5000:5000 -p 5001:5001 order_server

# You can pull the image from docker hub also.
- https://hub.docker.com/repository/docker/imdeepanshu/order_server
- docker pull imdeepanshu/order_server
- To run this container it requires docker consul container running at IP 172.17.0.2 
