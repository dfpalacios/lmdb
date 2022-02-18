# About The Project

LMDb is the localhost's most popular and authoritative source for movie, TV and celebrity content. Find ratings and reviews for the newest movie and TV shows.

Don't mistake this platform for other boring rip-offs that swarm the internet ~~like IMDb~~ (ಠ_ಠ)

---

The project is made up of two parts: a server and a client app.

# Server

[Express](https://expressjs.com/) with basic api, JWT authentication and simulated queries to a database with movies and users. 

Some considerations:

* Amazingly, the demo user has rated ONLY the even ranked movies (2nd, 4th, 6th, etc.). This will be reflected on the client side when the logged in user views a movie card.
* JWT token expiration is 15 minutes. The client application will request a refresh of the token when it expires. On this server the refresh tokens are stored in memory, so it is important to keep the server process alive while testing with the client.
* To simulate latency and visualize the loaders in the client application, each endpoint has a sleep of 500 ms.
* CORS enabled to allow use from any origin.
* The register endpoint will fail for the email "error@mail.com".

## Endpoints

| Type | URL | Notes |
|------|-----|-------|
| [GET] | /api/movies | Paginated list of movies, with filtering and sorting options. |
| [GET] | /api/movies/{:movieId} | Movie detail. If the user is logged in and the movie ranking is even, the user's movie rating is included in the response.
|  [POST] | /api/movies/{:movieId/stars} | Movie score update (logged in users only). Unfortunately, requests are not persisted... :(
|  [POST] | /api/register | User register.
|  [POST] | /api/token/refresh | Token register.
| [POST] | /api/login |  User login.
|  [POST] | /api/token/reject | Removes a refresh token from memory. Thought to be used by web administrators.

# Client app

Built With:

- [React.js](https://reactjs.org/)
- [Create React App](https://create-react-app.dev/)
- [axios](https://github.com/axios/axios) for API requests.
- [React Router](https://reactrouter.com/) for app routing.
- [Material UI](https://mui.com/) to build the following components:
  - Modals
  - Ratings
  - Movies list (with DataGrid)
  - Forms (login, register, search form and categories filter).

## Features

- All components retrieve information through requests to the server.
- Only functional components have been built.
- The React Context is used to manage the modals and the user session.
- Visitors browsing the page can:
  - Filter and sort movies by title and rating.
  - Search for a movie by title.
  - View the details of a movie on an individual page. If the user is not logged in, they will be prompted to log in to grade. If the user is logged in, they will be able to rate the movie (or update the rating).
  - Access a private profile screen (just an empty page). If the user is not logged in, they will be redirected to the home page when entering the url in the browser.
  - Login or simulate a register.

# Getting Started

## Prerequisites

- npm

  ```
  npm install npm@latest -g
  ```

## Installation


1. Clone the repo

    ```
    git clone https://github.com/dfpalacios/lmdb.git
    ```

2. Create a /server/.env file with the necessary environment variables for the server:

    ```
    PORT=1337 # your port
    TOKEN_KEY=xxxxxxxxx # a random token
    ```

3. Open a terminal and run the following commands:

    ```
    cd ./server
    npm install
    npm run start
    ```

4. Create a /client/.env file with the necessary environment variables for the client:

    ```
    REACT_APP_API_URL=http://localhost:1337 # server base url
    ```

3. Open another terminal and run the following commands:

    ```
    cd ./client
    npm install
    npm run start
    ```

Done! The browser should launch the client app in the browser. You can use the following user to login:

| Email | Password |
|------| -------- |
| demo@demo.com | demo |

# Usage

Demo:

- Server: https://lmdb-api.herokuapp.com/ 
- Client: https://lmdb.vercel.app/

# Contact

David Fernández Palacios - davidfernandezpalacios@gmail.com

Project Link: https://github.com/dfpalacios/lmdb
