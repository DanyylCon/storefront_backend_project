# Store  Backend project

    This is the second project in a Full Stack Javascript Course. It is a NodeJS RESTful api that is written in Typescript and uses postgres as a database. It uses technologies and concepts like DB migrations, CORS, REST, password hash/salt/pepper (bcrypt) and JWT tokens. 

## Setting up

    1. Install postgres and psql locally. Install postgres on to your local environment in order to use the features of the database. You can also install psql or use a different terminal to work on your local postgres database.
    2. Using psql or other terminal log in to your database and run the following commands in order to create the development and test databases:
        -CREATE USER danny WITH PASSWORD 'password123';
        -CREATE DATABASE shop;
        -CREATE DATABASE test;
        -\c shop
        -GRANT ALL PRIVILEGES ON DATABASE shop TO danny;
        -\c test
        -GRANT ALL PRIVILEGES ON DATABASE test TO danny;

        This will create the databases that we will use and run our migrations on. == Note: username (danny), password and database names (shop & test) can be changed to anything you like but they will have to match your environment variables. ==

