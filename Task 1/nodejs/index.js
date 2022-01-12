const express = require('express');
const cors = require('cors');
const Axios = require('axios');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.get('/albums/:artist', async (req, res) => {
    try {
        const { artist } = req.params
        Axios.get(`https://itunes.apple.com/search?term=${artist}&media=music&entity=album&attribute=artistTerm&limit=200`).then(({ data }) => {
            let albums = []
            if (data.results) {
                albums = data.results.filter((v, i, a) => a.findIndex(t => (t.collectionName === v.collectionName && t.artistName === v.artistName)) === i)
            }
            res.json(albums);
        });
    } catch (error) {
        res.status(400).send({ error: true, msg: error });
    }
});

app.all("*", (req, res) =>
    res.status(404).send({
        error: true,
        msg: `Endpoint ${req.originalUrl} could not be found`,
    })
);
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});