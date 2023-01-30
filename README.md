# Torpedo-Game-React


## Run in Docker

#### At first enter the folder where Dockerfile can be found.

### Build image:
<sub>docker build -t torpedo-game-react .</sub>

### Start container:
##### On Windows:
<sub>docker container run -p 3000:3000 -v ${PWD}:/torpedo -v /node_modules --name torpedo-game-react-app  torpedo-game-react</sub>

##### On Mac:
<sub>docker container run -p 3000:3000 -v $PWD:/torpedo -v /node_modules --name torpedo-game-react-app  torpedo-game-react</sub> 