<a name="readme-top"></a>


[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


# Torpedo-Game-React
![visitors](https://visitor-badge.glitch.me/badge?right_color=teal&page_id=stokid/Torpedo-Game-React)

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li><a href="#project-preview">Project preview</a></li>
    <li><a href="#languages">Languages</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#run-in-docker">Run in Docker</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

I have just made a classic Torpedo / Battleship game from our childhood. It is a two-person game which playable in browser with PC or Smartphone.
The game's screen can orient your device on every refresh. So you can play on stationary also landscape screen.
The game has a chat component where the Bot helps you what you have to do.

<!-- PROJECT PREVIEW -->
## Project preview

<p align="center">
   <img width="19.2%" alt="01" src="https://user-images.githubusercontent.com/45713192/216114872-2ee870f0-3478-4599-92e3-77eb2b69e9cb.PNG"> 
   <img width="19.2%" alt="02" src="https://user-images.githubusercontent.com/45713192/216117126-b50604b6-31d5-476c-8c83-ce6ebfe5ce6d.PNG"> 
   <img width="19.2%" alt="03" src="https://user-images.githubusercontent.com/45713192/216117312-94748a13-e997-46b4-8d3e-c56c35af088f.PNG"> 
   <img width="19.2%" alt="04" src="https://user-images.githubusercontent.com/45713192/216122225-ef8d767a-e93b-4176-8614-397b07eb8895.PNG"> 
   <img width="19.2%" alt="05" src="https://user-images.githubusercontent.com/45713192/216122009-b221b361-baf3-4968-9b41-ca8d7c1b838d.png"> 
</p>

## Languages
The page's language available just Hungarian at now, but also prepared in English. Even so the Torpedo is playable very easy.

- Hungarian
- English (prepare)

<!-- GETTING STARTED -->
## Getting Started

You can run the app on your OS, or it also can be run in Docker container. If you would like run in Docker, you don not have to install npm package, because of Docker do it when image is created.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/stokid/Torpedo-Game-React.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Start the app
   ```js
   npm start
   ```

### Run in Docker
##### At first enter the folder where Dockerfile can be found.
#### Build image:
 ```sh
   docker build -t torpedo-game-react .
   ```
#### Start container:
###### On Windows:
 ```sh
   docker container run -p 3000:3000 -v ${PWD}:/torpedo -v /node_modules --name torpedo-game-react-app  torpedo-game-react
   ```
###### On Mac:
```sh
   docker container run -p 3000:3000 -v $PWD:/torpedo -v /node_modules --name torpedo-game-react-app  torpedo-game-react
   ```


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/stokid/Torpedo-Game-React.svg?style=for-the-badge
[contributors-url]: https://github.com/stokid/Torpedo-Game-React/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/stokid/Torpedo-Game-React.svg?style=for-the-badge
[forks-url]: https://github.com/stokid/Torpedo-Game-React/network/members
[stars-shield]: https://img.shields.io/github/stars/stokid/Torpedo-Game-React.svg?style=for-the-badge
[stars-url]: https://github.com/stokid/Torpedo-Game-React/stargazers
[issues-shield]: https://img.shields.io/github/issues/stokid/Torpedo-Game-React.svg?style=for-the-badge
[issues-url]: https://github.com/stokid/Torpedo-Game-React/issues
[license-shield]: https://img.shields.io/github/license/stokid/Torpedo-Game-React.svg?style=for-the-badge
[license-url]: https://github.com/stokid/Torpedo-Game-React/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/david-stokinger-199413206
