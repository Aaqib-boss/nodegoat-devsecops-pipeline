# NodeGoat

**Project Repository:**  
https://github.com/shehanrevon/nodegoat-devsecops-pipeline

Being lightweight, fast, and scalable, Node.js is becoming a widely adopted platform for developing web applications. This project provides an environment to learn how OWASP Top 10 security risks apply to web applications developed using Node.js and how to effectively address them.

## Getting Started

OWASP Top 10 for Node.js web applications:

### Know it!

This application bundled a tutorial page that explains the OWASP Top 10 vulnerabilities and how to fix them.

Once the application is running, you can access the tutorial page at http://localhost:4000/tutorial (or the port you have configured).

### Do it!

[A Vulnerable Node.js App for Ninjas](http://nodegoat.herokuapp.com/) to exploit, toast, and fix.

You may like to [set up your own copy](#how-to-set-up-your-copy-of-nodegoat) of the app to fix and test vulnerabilities. Hint: Look for comments in the source code.

##### Default user accounts

The database comes pre-populated with these user accounts created as part of the seed data:

- Admin Account - u: `admin` p: `Admin_123`
- User Accounts - u: `user1` p: `User1_123`, u: `user2` p: `User2_123`
- New users can also be added using the sign-up page.

## How to Set Up Your Copy of NodeGoat

### OPTION 1 - Run NodeGoat on your machine

1. Install [Node.js](http://nodejs.org/) - NodeGoat requires Node v8 or above.

2. Clone the GitHub repository:

```bash
git clone https://github.com/shehanrevon/nodegoat-devsecops-pipeline.git
```

3. Go to the directory:

```bash
cd nodegoat-devsecops-pipeline
```

4. Install node packages:

```bash
npm install
```

5. Set up MongoDB. You can either install MongoDB locally or create a remote instance.

6. Populate MongoDB with the seed data required for the app:

```bash
npm run db:seed
```

7. Start the server:

```bash
npm start
```

The NodeGoat application will be available at:

```text
http://localhost:4000/
```

Alternatively, start the server with nodemon:

```bash
npm run dev
```

### Customizing the Default Application Configuration

By default, the application will be hosted on port 4000 and will connect to a MongoDB instance at `localhost:27017`.

To change this, set the environment variables:

- `PORT`
- `MONGODB_URI`

## OPTION 2 - Run NodeGoat on Docker

The repository includes the Dockerfile and `docker-compose.yml` necessary to set up the application and database instance.

1. Install Docker and Docker Compose.

2. Clone this repository:

```bash
git clone https://github.com/shehanrevon/nodegoat-devsecops-pipeline.git
```

3. Go to the directory:

```bash
cd nodegoat-devsecops-pipeline
```

4. Build the images:

```bash
docker-compose build
```

5. Run the application:

```bash
docker-compose up
```

The application will be available at:

```text
http://localhost:4000/
```

## Contributing

Please follow the contributing guide in `CONTRIBUTING.md`.

## Code of Conduct

This project is bound by the Code of Conduct available in `CODE_OF_CONDUCT.md`.

## License

Code licensed under the Apache License v2.0.
