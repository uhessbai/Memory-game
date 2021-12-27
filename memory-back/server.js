// include http module to send request to frnt and include url in order to save score (we will read client url which will contain score and pseudo)
const http = require('http');
const url = require('url')
// allow us to read files 
const fs = require('fs');
// adding express libraries to handle request and CORS issues
const express = require('express');
const cors = require('cors');
const { json } = require('express');
// start express which will be called with app.get 
const app = express();
const score_path = './scores.json';

app.use(cors());
// parsing json
app.use(express.json());


var score_board = {
    usr: [],
};

const scoreHandler = {
    // this will be the obj containing data that we will pushed in a json object 
   // (psd = pseudo, tmr = timer)

    save_score: function writeScoreFile(psd, tmr, res) {
        score_board.usr.push({pseudo: psd, timer: tmr});
        console.log(score_board.usr);
        var data = JSON.stringify(score);
        fs.writeFileSync(score_path, data, {'flags': 'wx'}, (err) => {
            if (err) {
                throw err;
            }
            else {
                console.log("JSON data is saved.");
                res.end('Saving score ok');
            }
        });
    },

    read_score: function readScoreFile(res) {
        if (fs.existsSync(score_path)) {
            var data = fs.readFileSync(score_path);
            if (data) {
                var re_score = JSON.parse(data);
                return re_score
            }
      }
      return null
    },

    send_to_client: function sendScoreToClient(res, score) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(score));
    },

    // as function says we will order user's scores
    order_score: function orderScore(score) {
        const ord_score = Object.keys(score).map(function (key) {
            console.log(score[key]);
            return score[key];
        });
        console.log(ord_score)
        var parsed = [];
        var parsed = ord_score[0].sort((a, b) => {
            return a.timer - b.timer;
        });
        return parsed;
    },

    // att launch we save previous scores stored in scores.json in a object so that in next push
    // scores wont be erased

    init_server: function initServer() {
        score = scoreHandler.read_score();
        const ord_score = Object.keys(score).map(function (key) {
            return score[key];
        });
        for (const key in ord_score[0]) {
            console.log(ord_score[0][key]);
            score_board.usr.push({pseudo: ord_score[0][key].pseudo, timer: ord_score[0][key].timer});
        }
    },
}

scoreHandler.init_server();

app.get("/getscores", (req, res) => {
     // gathering scores
    var score = scoreHandler.read_score(res);
    ordened_score = scoreHandler.order_score(score);
    console.log(ordened_score);
    scoreHandler.send_to_client(res, score);
});

app.post("/setscores", function (req, res) {
    // preparing data 
    console.log("SETSCORE")
    
    var usr_pseudo = req.body.pseudo;
    var usr_timer = req.body.chrono;
    scoreHandler.save_score(usr_pseudo, usr_timer, function(error) {
    });
});

// listening to request and responses 
app.listen(8080, () => {
    console.log('server running on port 8080');
});
