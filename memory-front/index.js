/* this function will handle events made on index.html when page has been fully loaded
 two functions will be there:
    -one for saving the username 
    -one for displaying scores
*/
document.addEventListener('DOMContentLoaded', () => {

    // function called by the input type on the form 
    function savePseudo () {
    
        // submit pseudo inside of textbox
        const name = document.getElementById('name').value;  
        // store pseudo for the session
        sessionStorage.setItem("NAME", name);
        return;
    }


    function displayScores() {
        
    }

});