# Handcrafted Webshop


## About
This project started as an idea to create a webshop for my girlfriend's handcrafted items, utilizing all the knowledge I have acquired. As the title suggests, this application should be used to advertise items that are handcrafted. When you install the application and log in as admin, you will be able to use the admin site, "/admin" to create new items, where you can add details or photos. The application also includes a shopping cart feature, allowing users to add items they want to purchase, complete their orders, or delete them if not needed. Additionally, users can create new accounts and make purchases as well. Right now, the application is not responsive yet, but when I have the time for it, I will change that!

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

1. You have to download both  <a href="https://git-scm.com/" target="_blank"><img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git"/></a> and  <a href="https://www.docker.com/" target="_blank"><img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/></a>.
2. Install them.
3. After both are installed, run the Docker Desktop application.
4. Create a folder for your application (e.g., Project).
5. Go to the folder where you want to store your application.
6. Click on the address bar at the top, type `cmd`, and press Enter to open a command prompt in that folder.
7. Copy-paste the following command into the command prompt:

```bash
git clone https://github.com/BalintCoder/Webshop.git
```

8. Then, click on the route again to highlight it, and type `cmd` again. Type:

```bash
cd WebshopProject
```

Press Enter, then type:

```bash
echo. > .env
```

This will create an empty `.env` file which is needed for running the application.

9. Last but not least, go back to the folder called `Webshop` with the command in cmd:

```bash
cd ..
```

Then type in the following:

```bash
docker compose up --build
```

This will create the containers for the application (database, backend-server, frontend).

10. After they are created, go back to Docker Desktop and check if all the containers are running. Usually, after the installation, the backend-server container stops running. Don't be afraid; just start the container, and it will run afterwards.

11. Now, all you have to do is type the following in the search bar:

```bash
localhost:5173/
```

You will see the application running and ready to be logged in or create a new account.

## Admin Login (Demo Credentials)
To access the admin panel and create new items, use the following credentials:

- **Email:** admin@admin.com  
- **Password:** admin123  

⚠️ These credentials are for demonstration purposes only.

## Contributing

[![BalintCoder's GitHub Profile](https://img.shields.io/badge/GitHub-BalintCoder-blue?style=for-the-badge&logo=github&logoColor=white)](https://github.com/BalintCoder)
