# Handcrafted Webshop


## About
This project started as an idea to create a webshop for my girlfriend's handcrafted itmes, utilizing all the knowledge I have acquired. As the title suggests this application should be used to advertise items that are handcrafted. When you installed your application and logged in as admin, you will be able to use the admin site, "/admin" to create new items. Where you can add its details or photo. The application also includes a shopping cart feature, allowing users to add items they want to purchase and complete their orders. Additionally, users can create new accounts and make purchases with them as well. Right now the application is not responsive yet, however when i will have the time for it, i will change that! 

## Built using
- React/ Vite
- Tailwind CSS
- ASP.NET
- MySQL
- Docker


## Installation

1. You have to install git (https://git-scm.com/downloads) and after that docker desktop (https://www.docker.com/products/docker-desktop/)
2. Install them.
3. After both of them are installed run the docker desktop applicaiton.
4. Create a folder for your application (eg. Project)
5. Go to the folder where you want to store your application.
6. At the top you can see the route for the folder that you are in. Click on it to be highlited and type ```cmd``` and press enter.
7. After that copy paste it to there the following: ``` git clone https://github.com/BalintCoder/Webshop.git ```
8. Then click on the route again to be highlited and type cmd again, type ```cd WebshopProject``` press enter, then type in the following: ```echo. > .env``` It will create an empty ```.env``` file which is needed for running the application.
9. Last but not least, go back to the folder called ```Webshop``` with the comment in cmd ```cd..``` and type in the following ``` docker compose up --build``` It will create the containers for the application(database, backend-server, fronted)
10. After they were created go back to the docker desktop and check if all of the containers are running. Usually after the installation the backend-server container stops running, dont be afraid just start the container and it will run afterwards.
11.Right now all you have to do is just type in the search bar the following: ```localhost:5173/``` and you will see the application running, and ready to be logged in or create a new account.


## Contributing

BalintCoder

