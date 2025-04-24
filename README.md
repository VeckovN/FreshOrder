# FreshOrder

## Table of Contents
 * [Project Overview](#project-overview)
 * [Technologies](#technologies)
 * [Core Features](#core-features)
 * [Setup](#setup)
 * [App Pages](#app-pages)

## Project Overview
Fresh Order is a full-stack web application designed to simplify the food ordering process by connecting clients with restaurant and enabling seamless product and order management.
The application allows guests to browse and add food items to their cart, clients to place and track their orders, and administrators to manage products, orders, and users efficiently.

## Technologies
* Frontend: HTML5, CSS3, ReactJS 
* Backend: NodeJS, Express
* Databases: MongoDB (Mongoose)
* Authorization: JWT

## User Types 
 - Guest
 - Client
 - Houseworker

## Core Features
1. Product Browsing
   - Guests can browse for food products, which are categorized into pizza, pasta, burgers, salads, drinks, and desserts.
   - Products can be added to the cart for future checkout.
    User Authentication

2. User Authentication
   - Clients must log in or register to place an order.
   - Secure user sessions by using JSON Web Tokens (JWT).

3. Order Management for Clients
   - View a history of all orders with full details of their statuses (Completed or Pending).
   - Cancel orders if they are still in the pending state.
   - E-mail Notifications: An e-mail confirmation is sent automatically to the client when an order is successful and regarding the delivery timing.

4. Personalization for Clients
   - The client can modify personal information: name, email, and address.
  
5. Product Management for Admins
   - Admin can create, update, or delete products.
   - Support for soft-deletion functionality: Products are hidden but not permanently deleted.

6. Order Management for Admins
   - Admin can view all orders with details of product names, quantity, price, and client information
   - Confirm pending orders and allocate time for delivery.

7. User Management for Admins
   - Admins can view and edit user accounts.
   

## Setup

### 1. Clone the Repository

``` bash
   git clone https://github.com/yourusername/your-project.git
   cd FreshOrder
```

### 2. Backend Setup (/api)

* Navigate to the backend folder:

``` bash
    cd api
```

* Copy the environment file:
``` bash
    cp .env.example .env
```

*  Edit the .env file and fill in your credentials:
``` bash
    CLUSTER_PASSWORD=
    MONGO_URI=your_mongodb_uri
    SECRET_KEY= 'jwt-key'
    EMAIL_USERNAME=
    EMAIL_ACC_PASSWORD=
    EMAIL_PASSWORD=
```

* Install backend dependencies:
``` bash
    npm install
```

* Start the backend server:
``` bash
    npm start
```

### 3.Frontend Setup (/client)

* Open a new terminal and navigate to the frontend folder:
``` bash
    cd ../client
```

* Install frontend dependencies:
``` bash
    npm install
```

* Start the development server:
``` bash
    npm start
```

The React app will be running at: http://localhost:3000







## App Pages 
### Home Page
![1](https://github.com/VeckovN/FreshOrder/assets/56490716/76d711fd-9339-42c4-97de-1a983a091f9f)

### Home Page Menu(Category Selected)
![2](https://github.com/VeckovN/FreshOrder/assets/56490716/e09e0851-ea9c-4725-8e64-9d3ab857ec6f)

### Home Page AboutUs
![3](https://github.com/VeckovN/FreshOrder/assets/56490716/44903283-526c-44c7-ad01-e4878e35b2ed)

###  Cart
![4](https://github.com/VeckovN/FreshOrder/assets/56490716/75930e70-9296-4794-89a0-8773e29d6256)

### Login
![6](https://github.com/VeckovN/FreshOrder/assets/56490716/540141a2-234b-4309-bc2b-68dd10069963)

### Register
![5](https://github.com/VeckovN/FreshOrder/assets/56490716/74967c46-cd7f-42b6-a57b-881411102c9a)

### Client Orders
![12](https://github.com/VeckovN/FreshOrder/assets/56490716/dc02d79a-9cc1-4dbe-90ec-673458cc9f31)

### Client Profile
![13](https://github.com/VeckovN/FreshOrder/assets/56490716/75b94b45-3f96-4d70-949d-07519a56a3aa)

## Admin Part
### Admin Orders Page
![7New](https://github.com/VeckovN/FreshOrder/assets/56490716/8e0feb5b-7153-4f5c-ae1c-c481a427a02f)
![7b](https://github.com/VeckovN/FreshOrder/assets/56490716/46f437a2-0776-4a99-b0f9-ff0d9eadf34f)

### Admin - Users
![8](https://github.com/VeckovN/FreshOrder/assets/56490716/85c0750d-e1da-4a84-885e-6a492ca5e86f)

### Admin - User Edit
![9](https://github.com/VeckovN/FreshOrder/assets/56490716/c6532549-2be8-441f-b570-838a1839187a)

### Admin - Products
![10](https://github.com/VeckovN/FreshOrder/assets/56490716/d5ef4e0f-ca71-4834-b436-a11158f148fa)
![11](https://github.com/VeckovN/FreshOrder/assets/56490716/af54d14e-2d02-4eb4-8aec-7651945fb8e2)
