/* this function will handle events made on index.html when page has been fully loaded
 two functions will be there:
    -one for saving the username 
    -one for displaying scores
*/
document.addEventListener('DOMContentLoaded', () => {

});
    
// function called by the input type on the form 
function saveOptions () {

    // submit pseudo inside of textbox
    const name = document.getElementById('name').value;
   // checking which radio is checked, if diff16 is not selected then it's the other one
    if (document.getElementById('diff16').checked) {
        difficulty = document.getElementById('diff16').value;
      }
    else  {
        difficulty = document.getElementById('diff32').value;
      }
    // store pseudo for the session
    sessionStorage.setItem("NAME", name);
    // store difficulty for the session
    sessionStorage.setItem("DIFFICULTY", difficulty);
    return;
}


function displayScores() {
    
}