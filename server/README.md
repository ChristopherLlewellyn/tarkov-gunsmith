# Setup

### Prerequisites
Install both [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/).

Note: If you install Docker Desktop, it comes with Docker Compose.

### Select Environment (dev/production)
By default, the configuration is set to dev. To run in production, open ```DockerFile``` and edit the last line from: 

```CMD ["/etc/start.sh"]``` 

to:

```CMD ["/etc/start.sh", "prod"]```

### Configure .env
In your .env file, change the ```DB_HOST``` value to ```db```, and ```PWD``` value to whatever your project's working directory is, for example: 

```C:\Users\YourUsername\Documents\Workspace\tarkov-armory\server```

Make sure to set all other .env variables, such as mail server details and API keys.

### Build API Container

In the Project's root folder, run:

```bash
docker-compose -f docker-compose.yml -p tarkov-armory build
```

### Start Container

To start the container, run:

```bash
docker-compose -f docker-compose.yml -p tarkov-armory up -d
```

### Running Adonis Migrations (and any other commands)
Enter into the bash shell by running:

```bash
docker exec -it tarkov_armory bash
```

...and from there, run database migrations using ```adonis migration:run```

...and also seed the database using ```adonis seed```

### Accessing the API
The API can now be accessed via ```http://127.0.0.1:3333/api```