/* this function will handle events made on index.html when page has been fully loaded
 two functions will be there:
    -one for saving the username 
    -one for displaying scores
*/
document.addEventListener('DOMContentLoaded', () => {
    displayScores()

});

function displayScores() {
        // Get function to display scores on main menu, 
        $.ajax ({
            url: "http://0.0.0.0:8080/getscores",
            type: 'GET',
            contentType: 'json',
            success: function(res) {    
                // send user's scores to div with id "scorelist"
                var mainContainer = document.getElementById("scoreList");
                console.log("displaying score")
                console.log(res[0])
                for (var key in res[0]) {
                    console.log("ooooo")
                    var div = document.createElement("div");
                    div.innerHTML = (res[0][key].pseudo) + ' :' +  res[0][key].timer  + ' s';
                    mainContainer.appendChild(div);
                }
            },
            error: function(error){
                console.log("Getting score issue")
                console.log(error)
            }
        })
    
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
