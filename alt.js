
document.addEventListener('DOMContentLoaded', function() {

    // by default submit is disabled
    document.querySelector('#submit').disabled = true;

    // BUTTON DISABLE 
    document.querySelector('#field').onkeyup = () => {
        if (document.querySelector('#field').value.length > 0){
            document.querySelector('#submit').disabled = false; 
        } else{
            document.querySelector('#submit').disabled = true; 
        }
        // if backspace, disable again
    }

    // GUESSES
    document.querySelector('form').onsubmit = () => {

        const guess = document.querySelector('#field').value;

        // create placeholder variables for the actual values first
        const li = document.createElement('li');
        li.innerHTML = guess;
        document.querySelector('#guesses').append(li);        

        // Set the CONTENT in the HTML of the element named li and set it to 'guess' variable
        document.querySelector('#field').value='';

        document.querySelector('#submit').disabled = true;

        return false;
        // CRUCIAL ^^ always have this at the end, stop form from submitting
    };

    // DEFINING TIMER FUNCTION
    function timer (n) {
        let time = 60;
        myInterval = setInterval(function () {
            time--;
            document.querySelector('#time').innerHTML = time;
            if (time < 1){
                clearInterval(myInterval);
                function clear(){
                    var guesses = document.querySelector('#guesses');

                    var child = guesses.lastElementChild;
                    // while the variable 'child' exists
                    while (child) {
                        guesses.removeChild(child);
                        child = guesses.lastElementChild;
                        // re-setting the last element child 
                    }
                }
                function reset(){
                    document.querySelector('#item').innerHTML = '';
                }
                clear();
                reset();
                document.querySelector('#field').value = '';
                document.querySelector('#question').style.display = 'none';
                document.querySelector(`#continue${n}`).style.display = 'block';
            }
        }, 1000);
    };
    // item generator
    function item_generate(step) {
        var index = Math.floor(Math.random() *26)
        fetch('./question-bank.json')
        .then(data => data.json())
        .then((data) => {
            // console.log(data[index])
            document.querySelector('#item').innerHTML = data[index].item;
            var list = document.createElement('ul');
            document.querySelectorAll('.other_responses')[step].innerHTML = data[index].guesses.join(', ')
        })
    }
    
    // clear "other responses"
    function clear_other(){
        document.querySelector('.other_responses').innerHTML = '';
    }

    // Hide the intro section + show the question
    document.querySelector('#start').addEventListener('click', () => {
        item_generate(0);

        document.querySelector('#intro').style.display = 'none';
        document.querySelector('#question').style.display = 'block';

        document.querySelector('#circles').style.display = 'flex';
        document.querySelector('#circle1').style.backgroundColor = '#87D2D1';

        // Run the timer
        timer(1);
        })

    document.querySelector('#continue_but1').addEventListener('click', () => {
        item_generate(1);

        // Show next question
        document.querySelector('#continue1').style.display = 'none';
        document.querySelector('#question').style.display = 'block';
       
        // Color in the second circle
        document.querySelector('#circle2').style.backgroundColor = '#87D2D1';
        // run the timer again
        timer(2);
        clear_other()
    })

    document.querySelector('#continue_but2').addEventListener('click', () => {
        item_generate(2);
        
        // Show next question
        document.querySelector('#continue2').style.display = 'none';
        document.querySelector('#question').style.display = 'block';
       
        // Color in the second circle
        document.querySelector('#circle3').style.backgroundColor = '#87D2D1';
        // run the timer again
        timer(3);
        clear_other();
    })

});

    