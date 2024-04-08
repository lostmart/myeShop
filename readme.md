# MyShop Backend

The MyShop backend is a robust and scalable server application built with Node.js, Express, and TypeScript. It serves as the backbone for the MyShop eCommerce platform, handling user authentication, product management, orders, and payments.

## Features

- **RESTful API:** Design and implementation of RESTful API endpoints to interact with the frontend application.
- **User Authentication and Authorization:** Securely manage user sessions and permissions using JWT.
- **Product Management:** API endpoints for creating, retrieving, updating, and deleting product information.
- **Order Processing:** Manage customer orders, from creation to payment processing.
- **Payment Integration:** Secure integration with payment gateways like Stripe or PayPal for processing transactions.

## Getting Started

Follow these instructions to get your backend server up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:

- Node.js (LTS version)
- npm (comes with Node.js)
- MongoDB (local or remote instance)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/lostmart/myeShop.git
cd myeShop
```

2. Install NPM packages:

```bash
npm install
```

3. Create a .env file in the root directory and populate it with necessary environment variables:

```makefile
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=4000
```

4. Compile TypeScript to JavaScript and start the server:

```bash
npm run build
npm start
```

NOTE: Alternatively, for development purposes, you can run the TypeScript compiler in watch mode and start the server with nodemon:

```bash
npm run dev
```
