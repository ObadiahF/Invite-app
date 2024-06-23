import 'dotenv/config';
import express from 'express';
import cors from "cors";
import { createEvent, checkAccessToken, getEvent, getUser, addUserToEvent, removeUserFromEvent, createUser, deleteUser } from './db/db.js';
const app = express();
const port = process.env.serverPort;

app.use(express.json())
app.use(cors())

app.post("/create", async (req, res) => {
    try {
        const data = await req.body;
        const accessToken = data.access_token;
        const validToken = await checkAccessToken(accessToken)
        if (!validToken) {
            res.status(403).json({
            error: "Invalid Token, please ask Obadiah for a token."
        })
        } else {
            const event = await createEvent(data, validToken)
            if (!event) {
                console.log("error with event")
                res.sendStatus(400)
            }
            res.status(200).json({
                link: event
            })
        }
    } catch(e) {
        res.sendStatus(400);
    }
});

app.get("/event/:id", async (req, res) => {
    //"event/:id/:uid"
    try {
        const id = req.params.id
        //const uid = req.params.uid
        //!id || !uid
        if (!id) {
            res.sendStatus(403)
        }

        const event = await getEvent(id);
        if (event) {
            res.status(200).json(event);
        } else {
            res.sendStatus(404)
        }


    } catch(e) {
        console.log(e);
        res.sendStatus(400)
    }
})

app.get("/user/:id", async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            res.sendStatus(403)
        }

        const user = await getUser(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.sendStatus(404)
        }


    } catch (e) {
        console.log(e);
        res.sendStatus(400)
    }
});

app.post("/invite", async (req, res) => {
    try {
        const { name, number } = await req.body;
        const user = await createUser(name, number)
        if (!user) {
            console.log("error with creating user")
            res.sendStatus(400)
        }
        res.sendStatus(200);
        
    } catch (e) {
        res.sendStatus(400);
    }
});

app.post("/edit/event/:id", async (req, res) => {
    try {
        const evId = req.params.id
        const data = await req.body;
        const { uid, mode, guests, message } = data;

        const event = await getEvent(evId);

        if (!event) {
            res.sendStatus(404)
        };

        const user = await getUser(uid);
        let name = "Guest";
        if (user) {
            name = user.name;
        }

        if (mode === "going") {
            const wasSuccessful = await addUserToEvent(evId, name, guests)
            if (!wasSuccessful) res.sendStatus(500)

        } else if (mode === "not going") {
            const wasSuccessful = await removeUserFromEvent(evId, name, message)
            if (!wasSuccessful) res.sendStatus(500)
        } else {
            res.sendStatus(400)
        }
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(400);
    }
});

app.post("/delete-user", async (req, res) => {
    try {
        const { number } = await req.body;
        const info = await deleteUser(number);
        if (info.deletedCount > 0) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
})


app.listen(port, () => {
    console.log(`Listening on port: http://localhost:${port}/`)
})