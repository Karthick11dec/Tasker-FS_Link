const express = require('express');
const mongodb = require('mongodb');
const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const mongoClient = mongodb.MongoClient;
const dbUrl = process.env.DBURL || 'mongodb://127.0.0.1:27017';
// const dbUrl = 'mongodb://127.0.0.1:27017';
const PORT = process.env.PORT || 3001;
const database = 'Tasksubmit';
const userCollection = 'Student';

const app = express();

app.use(express.json());
app.use(cors());

const { authenticate, createJWT } = require('./auth');

app.get('/', (req, res) => {
    res.send("ss i am from Task submission project");
});

app.get('/totalstudent', async (req, res) => {
    try {
        let client = await mongoClient.connect(dbUrl);
        let opendb = client.db(database);
        let data = await opendb.collection(userCollection).find({ Totaluser: "total" }).toArray();
        if (data) {
            res.json({ data });
        }
        client.close();
    } catch (error) {
        res.json({ message: "error while fetching total student count from server" });
    }
});

app.post('/register', async (req, res) => {
    try {
        let client = await mongoClient.connect(dbUrl);
        let opendb = client.db(database);
        let already = await opendb.collection(userCollection).findOne({ Email: req.body.Email });
        if (!already) {
            let salt = await bcryptjs.genSalt(10);
            let hash = await bcryptjs.hash(req.body.Password, salt);
            let data = await opendb.collection(userCollection)
                .insertOne({
                    Totaluser: "total",
                    Firstname: req.body.Firstname,
                    Lastname: req.body.Lastname,
                    Email: req.body.Email,
                    Password: hash,
                    Gender: req.body.Gender,
                    DOB: req.body.Dob,
                    Mobile: req.body.Mobile,
                    Telephone: req.body.Tele,
                    Blood: req.body.Blood,
                    Address: req.body.Address,
                    Height: req.body.Height,
                    Weight: req.body.Weight
                });
            res.json({ message: "Registered Succesfully", data });
        } else {
            res.json({ message: "you already having an account...please login to continue...", already });
        }
        client.close();
    } catch (error) {
        res.json({ message: "something went wrong with register", error });
    }
});

app.post('/login', async (req, res) => {
    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db(database);
        let user = await db.collection(userCollection).findOne({ Email: req.body.Email });
        if (user) {
            let result = await bcryptjs.compare(req.body.Password, user.Password);
            if (result) {
                let admin = (result == true) && (user.Email == process.env.ADMIN);
                const token = await createJWT({ user });
                res.json({ message: "Login Successfully...Allow us", token, admin });
            } else {
                res.json({ message: 'Password not valid' });
            }
        } else {
            res.json({ message: 'User not found' });
        }
    } catch (error) {
        res.json({ message: 'Something went wrong', error });
    }
});

app.post('/link', async (req, res) => {
    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db(database);
        let user = await db.collection(userCollection).findOne({ Email: req.body.Email });
        if (user) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD,
                },
            });
            let mailOptions = {
                from: process.env.EMAIL,
                to: user.Email,
                subject: 'Reset Password',
                text: 'click here to reset password',
                html:
                    '<h3>Reset your password Here</h3><a href="http://localhost:3000/reset">Click Here</a>'
            };
            transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json({ message: "mail sent to your targetmail..check it", data })
                }
            });
        } else {
            res.json({ message: "email is not valid" });
        }
        client.close();
    } catch (error) {
        res.json({ message: 'Something went wrong', error });
    }
});

app.put('/reset', async (req, res) => {
    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db(database);
        let data = await db.collection(userCollection).findOne({ Email: req.body.Email });
        if (data) {
            let result = await bcryptjs.compare(req.body.Password, data.Password);
            if (!result) {
                let salt = await bcryptjs.genSalt(10);
                let hash = await bcryptjs.hash(req.body.Password, salt);
                let set = await db.collection(userCollection)
                    .findOneAndUpdate({ Email: req.body.Email }, { $set: { Password: hash } });
                res.json({ message: "new password update successfully!!!", set });
            } else {
                res.json({ message: "entered password is same as existing one" });
            }
        } else {
            res.json({ message: "user not found" });
        }
        client.close();
    } catch (error) {
        res.json({ message: 'Something went wrong', error });
    }
});

app.get('/users', [authenticate], async (req, res) => {
    try {
        let client = await mongoClient.connect(dbUrl);
        let opendb = client.db(database);
        let collection = await opendb.collection(userCollection).find({ Email: req.body.auth.Email }).toArray();
        client.close();
        res.json({
            collection
        })
    } catch (error) {
        res.json({ message: "something went wrong", error })
    }
});

app.put("/updatepro", [authenticate], async (req, res) => {
    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db(database);
        let collection = await db.collection(userCollection).findOne({ Email: req.body.auth.Email });
        if (collection) {
            let update = await db.collection(userCollection).findOneAndUpdate(
                { Email: req.body.auth.Email },
                {
                    $set: {
                        Firstname: req.body.Firstname,
                        Lastname: req.body.Lastname,
                        Email: req.body.auth.Email,
                        Gender: req.body.Gender,
                        DOB: req.body.DOB,
                        Mobile: req.body.Mobile,
                        Telephone: req.body.Telephone,
                        Blood: req.body.Blood,
                        Address: req.body.Address,
                        Height: req.body.Height,
                        Weight: req.body.Weight,
                    }
                }
            );
            res.json({ message: "update successfully", update });
        }
        client.close();
    } catch (error) {
        res.json({ error })
    }
})

app.post("/addtask", [authenticate], async (req, res) => {
    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db(database);

        //// ---- for date ---- ////
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

        ///--------/////////

        let add = await db.collection(userCollection).insertMany([
            {
                Task: req.body.auth.Email,
                Number: req.body.Number,
                Title: req.body.Title,
                Details: req.body.Details,
                Rule: req.body.Rule,
                Link1: req.body.Link1,
                Link2: req.body.Link2,
                date: today,
                time: new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
            },
            {
                Arr: "All Tasks",
                Number: req.body.Number,
                Title: req.body.Title,
                Details: req.body.Details,
                Rule: req.body.Rule,
                Link1: req.body.Link1,
                Link2: req.body.Link2,
                date: today,
                time: new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
            }
        ])
        res.json({ message: "task added", add })
        client.close();
    } catch (error) {
        res.json({ error })
    }
})

app.get("/gettask", [authenticate], async (req, res) => {
    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db(database);
        let collection = await db.collection(userCollection)
            .find({ Task: req.body.auth.Email })
            .sort({ date: -1, time: -1 })
            .toArray();
        if (collection) {
            res.json({ collection });
        }
        client.close();
    } catch (error) {
        res.json({ error })
    }
})

app.post("/filter", [authenticate], async (req, res) => {
    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db(database);
        let collection = await db.collection(userCollection)
            .find({ Task: req.body.auth.Email, date: req.body.From })
            .sort({ date: -1, time: -1 })
            .toArray();
        if (collection) {
            res.json({ message: "collection found", collection })
        }
        client.close();
    } catch (error) {
        res.json({ error })
    }
})

app.get("/popup", [authenticate], async (req, res) => {
    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db(database);
        let collection = await db.collection(userCollection)
            .find({ user: "submittor" })
            .sort({ date: -1, time: -1 })
            .toArray();
        if (collection) {
            res.json({ collection });
        }
        client.close();
    } catch (error) {
        res.json({ error })
    }
})

//------------- student process ---------------------//

app.post('/query', [authenticate], async (req, res) => {
    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db(database);

        //// ----- for date --- /////////
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

        //// -------------- ///////////

        let collection = await db.collection(userCollection).findOne({ Email: req.body.auth.Email });
        if (collection) {
            let query = await db.collection(userCollection).insertOne({
                Query: req.body.auth.Email,
                Name: req.body.Name,
                Batch: req.body.Batch,
                Head: req.body.Head,
                Body: req.body.Body,
                date: today,
                time: new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
            })
            res.json({ message: "Your query has been submitted", query });
        }
        else {
            res.json({ message: "User not Found in the database" });
        }
        client.close();
    } catch (error) {
        res.json({ error })
    }
})

app.get("/doubt", [authenticate], async (req, res) => {
    try {
        let connect = await mongoClient.connect(dbUrl);
        let db = connect.db(database);
        let data = await db.collection(userCollection)
            .find({ Query: req.body.auth.Email })
            .sort({ date: -1, time: -1 })
            .toArray();
        if (data) {
            res.json({ data })
        }
        else {
            let nocollection = "No collections avail for this account"
            res.json({ message: nocollection });
        }
        connect.close();
    } catch (error) {
        console.log(error);
        res.json({ error })
    }
})

app.get("/gettask1", [authenticate], async (req, res) => {
    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db(database);
        let collection = await db.collection(userCollection)
            .find({ Arr: "All Tasks" })
            .sort({ date: -1, time: -1 })
            .toArray();
        if (collection) {
            res.json({ collection });
        }
        client.close();
    } catch (error) {
        res.json({ error })
        console.log(error)
    }
})

app.post("/submit/:id", [authenticate], async (req, res) => {
    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db(database);
        let id = mongodb.ObjectID(req.params.id);

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

        let data = await db.collection(userCollection).findOne({ _id: id });
        // console.log(data);
        let check2 = await db.collection(userCollection).find({ user: "submittor" }).toArray();
        // console.log(check2);
        let verify = check2.some((check) => {
            return (check.mail === req.body.auth.Email && check.Title === data.Title)
        })
        // console.log(verify)

        if (!verify) {
            let one = await db.collection(userCollection).insertMany([
                { //this is for submittor list at admin
                    user: "submittor",
                    mail: req.body.auth.Email,
                    URL: req.body.submit,
                    Title: data.Title,
                    Detail: data.Details,
                    Fname: req.body.auth.Firstname,
                    Lname: req.body.auth.Lastname,
                    date: today,
                    time: new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
                },
                { // this is for submissoin of student
                    Data: req.body.auth.Email,
                    URL: req.body.submit,
                    Title: data.Title,
                    Detail: data.Details,
                    date: today,
                    time: new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
                }
            ])
            // console.log(one)
            res.json({ message: "yes", one })
        }
        else {
            res.json({ message: "already you were Submit" })
        }
        client.close();
    } catch (error) {
        res.json({ error })
    }
})

app.get("/studenttask", [authenticate], async (req, res) => {
    try {
        let client = await mongoClient.connect(dbUrl);
        let db = client.db(database);
        let collection = await db.collection(userCollection)
            .find({ Data: req.body.auth.Email })
            .sort({ date: -1, time: -1 })
            .toArray();
        if (collection) {
            res.json({ collection });
        }
        client.close();
    } catch (error) {
        res.json({ error })
        console.log(error)
    }
})

app.listen(PORT, () => { console.log(`Your Awesome Task submission portal run successfully...@ ${PORT}`) })