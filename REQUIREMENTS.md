# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index '/products' [GET] Display all products
- Show  '/products/:id' [GET] Display information about a product by referencing its id
- Create [token required] '/products' [POST] Create a single product 
- [OPTIONAL] Top 5 most popular products '/fiveMostPopular' [GET] Display the 5 most popular products 
- [OPTIONAL] Products by category (args: product category) '/products/category/:cat' [GET] Display the products by a certain category

#### Users
- Index [token required]   '/users' [GET] Display all the users 
- Show [token required]    '/users/:id' [GET] Display information about one user by referencing their id
- Create N[token required] '/users' [POST] Create new user

#### Orders
- Current Order by user (args: user id)[token required] '/orders/users/:id' [GET] Display orders of user where id is the user id stored in the order 
- [OPTIONAL] Completed Orders by user (args: user id)[token required] '/orders/users/:id/completed' [GET] Display the orders which are completed by referencing the user id stored in the order 

*ADDED*
- Create order (args: user_id, status) '/orders/users/:id' [POST] Create order by using user_id and status
- Delete orders () '/orders' [DELETE] Deletes all orders (More for testing purposes) 

## Data Shapes
#### Product
-  id SERIAL PRIMARY KEY integer
- name VARCHAR
- price integer
- [OPTIONAL] category VARCHAR 

#### User
- id SERIAL PRIMARY KEY
- firstName VARCHAR
- lastName  VARCNAR
- password  VARCHAR

#### Orders
- id                                     SERIAL PRIMARY KEY integer
- id of each product in the order        FOREIGN KEY integer REFERENCING products.id
- quantity of each product in the order  integer 
- user_id                                FOREIGN KEY integer REFERENCING users.id
- status of order (active or complete)   VARCHAR 

