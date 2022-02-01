# Store  Backend project

This is the second project in a Full Stack Javascript Course. It is a NodeJS RESTful api 
that is written in Typescript and uses postgres as a database. It uses technologies and 
concepts like DB migrations, CORS, REST, password hash/salt/pepper (bcrypt) and JWT tokens. 

## Setting up

1. Install postgres and psql locally. Install postgres on to your local environment in order 
to use the features of the database. You can also install psql or use a different terminal to 
work on your local postgres database.
2. Using psql or other terminal log in to your database and run the following commands in order 
to create the development and test databases:
- CREATE USER danny WITH PASSWORD 'password123';
- CREATE DATABASE shop;
- CREATE DATABASE test;
- \c shop
- GRANT ALL PRIVILEGES ON DATABASE shop TO danny;
- \c test
- GRANT ALL PRIVILEGES ON DATABASE test TO danny;

This will create the databases that we will use and run our migrations on. 
**Note: username (danny), password and database names (shop & test) can be changed to 
anything you like but they will have to match your environment variables.**

3. Clone this repo to your local machine

4. Run the command 'npm install' to install all the dependencies needed

5. Create a .env file and add the following environment variables: 
```
PORT=3001
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=shop
POSTGRES_DB_TEST=test
POSTGRES_USER=danny
POSTGRES_PASSWORD=password123
ENV=dev
BCRYPT_PEPPER=secretpass
SALT_ROUNDS=10
TOKEN_SECRET=bigsecret
TEST_USER_FIRST=John
TEST_USER_LAST=Smith
TEST_USER_PASS=testpass
```
This is exactly what my .env file looks like but you can and maybe have to change it to work on your machine.
PORT is the port number on which the app will run. POSTGRES variables are for your local db setup, where HOST
is your localhost address and DB, DB_TEST, USER and PASSWORD should match the user and dbs you created locally
from your terminal. ENV is the environment (ie. test or dev). BCRYPT_PEPPER, SALT_ROUNDS are for bcrpyt password
hashing. TOKEN_SECRET is the string against which jwts are checked. TEST_USER variables are for a test user which
is needed to run unit and endpoint testing. 

6. npm run test - command to run all tests

7. db-mirgate up - command to run the migrations to create the tables we need to use the app

8. npm run start - command to start the app

## Using Postman to communicate with the app