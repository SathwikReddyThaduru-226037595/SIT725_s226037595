# SIT725 — Task 2.2P — Express Web Server

**Author:** Sathwik (s226037595)
**Repository:** `SIT725_s226037595` — folder: `2.2P`

---

## Summary

This mini-project demonstrates a basic Express.js web server that serves a static frontend and provides a small REST API endpoint to **add two numbers** passed as query parameters. The project meets the Task 2.2P requirements (create an Express web service, perform a calculation on the server, return JSON, frontend uses `fetch()`, and API tested with `curl`).

---

## Install & Run 

1. Open terminal and `cd` to the `2.2P` folder.

```bash
# navigate to project folder
cd ~/Desktop/SIT725_s226037595/2.2P

# install dependencies (express)
npm install

# start server
npm run start
# or if the script is not set: node server.js
```

2. Server will run at `http://localhost:3000` (or the port shown in console).
3. Open `http://localhost:3000` to view the frontend.

---

## Important Endpoints

* **Add two numbers (required)**

  * `GET /add?a=10&b=20`
  * Example response:

    ```json
    { "operation": "addition", "a": 10, "b": 20, "result": 30 }
    ```

## Testing with curl 

From terminal (with server running):

```bash
# valid
curl "http://localhost:3000/add?a=10&b=20"

# negative or large values
curl "http://localhost:3000/add?a=-5&b=12"

# invalid (string) should return helpful error JSON
curl "http://localhost:3000/add?a=hello&b=20"
```
---

