
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

    // function: item generator
    function item_generate(step) {
        var index = Math.floor(Math.random() *21)
        fetch('./lateral-thinking.json')
        .then(data => data.json())
        .then((data) => {
            console.log(data[index]);
            document.querySelector('#riddle').innerHTML = data[index].question;
            var list = document.createElement('ul');
            document.querySelectorAll('.other_responses')[step].innerHTML = data[index].answer;
        })
    };

    // TIMER FUNCTION
    function timer() {
        // clearInterval(myInterval);
        let time = 0;
        myInterval = setInterval(function () {
            time++;
            document.querySelector('#time').innerHTML = time;
        }, 1000);
        document.querySelector('form').addEventListener('submit', (event) => {
            event.preventDefault;
            clearInterval(myInterval);
        });
    };
    
    // Hide the intro section + show the question
    document.querySelector('#start').addEventListener('click', () => {
        item_generate(0);

        document.querySelector('#intro').style.display = 'none';
        document.querySelector('#question').style.display = 'block';

        document.querySelector('#circles').style.display = 'flex';
        document.querySelector('#circle1').style.backgroundColor = '#BADB9D';

        // Run the timer
        timer();
    });

    // function to clear riddle, show continue slide
    function next (n){
        function reset(){
            document.querySelector('#riddle').innerHTML = '';
        };
        reset();
        // hide question block, show the continue block
        console.log(document.querySelector('#question'));
        console.log(document.querySelector(`#continue${n}`));

        document.querySelector('#question').style.display = 'none';
        document.querySelector(`#continue${n}`).style.display = 'block';
    }

    //on submit
    var n = 0;
    document.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault();
        n++;
        next(n);
        document.querySelector('#time').innerHTML = '0';
        clear_other(n);
        // CRUCIAL ^^ always have this at the end, stop form from submitting
    });

    // clear "other responses"
    function clear_other(n){
        document.querySelectorAll('.other_responses')[n].innerHTML = '';
    }
    

    document.querySelector('#continue_but1').addEventListener('click', () => {
        item_generate(1);

        // Show next question
        document.querySelector('#continue1').style.display = 'none';
        document.querySelector('#question').style.display = 'block';
        document.querySelector('#field').value = '';
       
        // Color in the second circle
        document.querySelector('#circle2').style.backgroundColor = '#BADB9D';
        document.querySelector('#submit').disabled = true;
        // run the timer again
        timer();
    })

    document.querySelector('#continue_but2').addEventListener('click', () => {
        item_generate(2);
        
        // Show next question
        document.querySelector('#continue2').style.display = 'none';
        document.querySelector('#question').style.display = 'block';
        document.querySelector('#field').value = '';
       
        // Color in the 3rd circle
        document.querySelector('#circle3').style.backgroundColor = '#BADB9D';
        document.querySelector('#submit').disabled = true;
        // run the timer again
        timer();
    })

});

    