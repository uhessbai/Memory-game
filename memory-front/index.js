/* this function will handle events made on index.html when page has been fully loaded
 two functions will be there:
    -one for saving the username 
    -one for displaying scores
*/
document.addEventListener('DOMContentLoaded', () => {
    displayScores()

});

// score_tab will contain scores from difficulty 18 (score_tab[0]) and 36 (score_tab[1]) 
scores_tab = []


function displayScores() {
        // Get call to display scores on main menu, 
        $.ajax ({
            url: "http://0.0.0.0:8080/getscores",
            type: 'GET',
            contentType: 'json',
            success: function(res) {    
                // send user's scores to div with id "scorelist"
                var mainContainer = document.getElementById("scoreList");
                console.log("displaying score");
                console.log(res[0]);
                scores_tab = res;
                // inserting res[0] because difficulty 18 is the default's one selected
                insert_score_div(res[0], mainContainer);
            },
            error: function(error){
                console.log("Getting score issue");
                console.log(error);
            }
        })
}

// for each user score, we add a div child element in element scorelist
function insert_score_div (res, mainContainer) {
    for (var key in res) {
        var div = document.createElement("div");
        div.innerHTML = (res[key].pseudo) + ' :' +  res[key].timer  + ' s';
        mainContainer.appendChild(div);
    }
}

function switchScore(diff) {
    var mainContainer = document.getElementById("scoreList");
    // removing scorelist child elements
    mainContainer.innerHTML =  '';
    if (diff == 18) {
        to_display = scores_tab[0];
    }
    else {
        to_display = scores_tab[1];
    }
    insert_score_div(to_display, mainContainer);
    
}

// function called by the input type on the form 
function saveOptions () {

    // submit pseudo inside of textbox
    const name = document.getElementById('name').value;
   // checking which radio is checked, if diff18 is not selected then it's the other one
    if (document.getElementById('diff18').checked) {
        difficulty = document.getElementById('diff18').value;
      }
    else  {
        difficulty = document.getElementById('diff36').value;
      }
    // store pseudo for the session
    sessionStorage.setItem("NAME", name);
    // store difficulty for the session
    sessionStorage.setItem("DIFFICULTY", difficulty);
    return;
}
