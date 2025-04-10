# Handcrafted Webshop


## About
This project started as an idea to create a webshop for my girlfriend's handcrafted itmes, utilizing all the knowledge I have acquired. As the title suggests this application should be used to advertise items that are handcrafted. When you installed your application and logged in as admin, you will be able to use the admin site, "/admin" to create new items. Where you can add its details or photo. The application also includes a shopping cart feature, allowing users to add items they want to purchase and complete their orders or delete them if not needed. Additionally, users can create new accounts and make purchases with them as well. Right now the application is not responsive yet, however when i will have the time for it, i will change that! 

## Built using
<p align="left">
  <a href="https://react.dev/" target="_blank"><img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"/></a>
  <a href="https://vitejs.dev/" target="_blank"><img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/></a>
  <a href="https://dotnet.microsoft.com/en-us/" target="_blank"><img src="https://img.shields.io/badge/.NET-512BD4?style=for-the-badge&logo=dotnet&logoColor=white" alt=".NET"/></a>
  <a href="https://www.mysql.com/" target="_blank"><img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL"/></a>
  <a href="https://www.docker.com/" target="_blank"><img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank"><img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS"/></a>
</p>


## Installation

1. You have to download both git (https://git-scm.com/downloads) and  docker desktop (https://www.docker.com/products/docker-desktop/)
2. Install them.
3. After both of them are installed run the docker desktop applicaiton.
4. Create a folder for your application (eg. Project)
5. Go to the folder where you want to store your application.
6. Click on the address bar at the top, type cmd, and press Enter to open a command prompt in that folder.
7. After that copy paste it to there the following: ``` git clone https://github.com/BalintCoder/Webshop.git ```
8. Then click on the route again to be highlited and type cmd again, type ```cd WebshopProject``` press enter, then type in the following: ```echo. > .env``` It will create an empty ```.env``` file which is needed for running the application.
9. Last but not least, go back to the folder called ```Webshop``` with the comment in cmd ```cd..``` and type in the following ``` docker compose up --build``` It will create the containers for the application(database, backend-server, fronted)
10. After they were created go back to the docker desktop and check if all of the containers are running. Usually after the installation the backend-server container stops running, dont be afraid just start the container and it will run afterwards.
11.Right now all you have to do is just type in the search bar the following: ```localhost:5173/``` and you will see the application running, and ready to be logged in or create a new account.


### Admin Login (Demo Credentials)
To access the admin panel and create new items, use the following credentials:

- **Email:** admin@admin.com  
- **Password:** admin123  

⚠️ These credentials are for demonstration purposes only.

## Contributing

BalintCoder

