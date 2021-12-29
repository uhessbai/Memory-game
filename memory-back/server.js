
/*

Here is the file where we will handle data and send it back to the client
It will be stored in scores18.json and scores36.json
values stored are : 
    -pseudo
    -timer
    -tries
You can see how it is stored in both previously mentioned files

There is mainly 3 parts in this file : 
    1 : setting values
    2 : internal functions (in scorehandler)
    3 : functions for communicating with cliend (GET and POST)
*/



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
//const score_path = './scores.json';

const score_18_path = './scores18.json';
const score_36_path = './scores36.json';

app.use(cors());
// parsing json
app.use(express.json());


var score_board_18 = {
    usr: [],
}

var score_board_36 = {
    usr: [],
}

const scoreHandler = {
    // this will be the obj containing data that we will pushed in a json object 
   // (psd = pseudo, tmr = timer, trs = tries, diff = difficulty)


    // adding score to score_board depending on difficulty
    save_score: function writeScoreFile(psd, tmr, trs, diff, res) {
        var path = ""
        if (diff == 18) {
            score_board_18.usr.push({pseudo: psd, timer: tmr, tries: trs});
            score_re = score_board_18;
            path = score_18_path;
            console.log("difficulty 18")
            console.log(score_board_18.usr);
            
        }
        else {
            score_board_36.usr.push({pseudo: psd, timer: tmr, tries: trs});
            score_re = score_board_36;
            path = score_36_path;
            console.log("difficulty 36")
            console.log(score_board_36.usr);
        }
        // saving score in appropriate score file
        var data = JSON.stringify(score_re);
        console.log("var data : ")
        console.log(data)
        fs.writeFileSync(path, data, {'flags': 'wx'}, (err) => {
            if (err) {
                throw err;
            }
            else {
                console.log("JSON data is saved.");
                res.end('Saving score ok');
            }
        });
    },

    read_score: function readScoreFile(score_path, res) {
        console.log("reading score")
        // calling module fs for checking if file exists, if so, read it, then we convert value to json format
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


    // at launch we save previous scores stored in scores.json in a object so that in next push
    // scores wont be erased

    init_server: function initServer() {
        // read scores18.json and scors36.json
        score_18 = scoreHandler.read_score(score_18_path);
        score_36 = scoreHandler.read_score(score_36_path);
        // putting score in score_boards
        // object.keys help us to find keys in data we readd from scores18.json and scores36.json
        // map help us to create an object ordered and iterable
        const ord_score_18 = Object.keys(score_18).map(function (key) {
            return score_18[key];
        });
        const ord_score_36 = Object.keys(score_36).map(function (key) {
            return score_36[key];
        });
        // now that we can make a loop, we push values in our local boards 
        for (const key in ord_score_18[0]) {
            score_board_18.usr.push({pseudo: ord_score_18[0][key].pseudo, timer: ord_score_18[0][key].timer, tries: ord_score_18[0][key].tries});
        }
        for (const key in ord_score_36[0]) {
            score_board_36.usr.push({pseudo: ord_score_36[0][key].pseudo, timer: ord_score_36[0][key].timer, tries: ord_score_36[0][key].tries});
        }
    },

    // same principle here, we gather keys and then make it iterable
    order_score: function orderScore(score) {
        const ord_score = Object.keys(score).map(function (key) {
            console.log(score[key]);
            return score[key];
        });
        var parsed = [];
        // sorting values by time
        var parsed = ord_score[0].sort((a, b) => {
            return a.timer - b.timer;
        });
        return parsed;
    },
}

scoreHandler.init_server();

app.get("/getscores", (req, res) => {
     // gathering scores
    var ordened_score = []
    ordened_score[0] = scoreHandler.order_score(score_board_18);
    ordened_score[1] = scoreHandler.order_score(score_board_36);

    console.log(ordened_score[0]);
    console.log(ordened_score[1]);
    scoreHandler.send_to_client(res, ordened_score);
});

app.post("/setscores", function (req, res) {
    // preparing data 
    console.log("SETSCORE")
    
    var usr_pseudo = req.body.pseudo;
    var usr_timer = req.body.chrono;
    var usr_tries = req.body.tries;
    var difficulty = req.body.difficulty;

    scoreHandler.save_score(usr_pseudo, usr_timer, usr_tries, difficulty, function(error) {
    });
});

// listening to request and responses 
app.listen(8080, () => {
    console.log('server running on port 8080');
});
