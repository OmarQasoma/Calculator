const screen = document.querySelector('.calculator-screen');
const keys = document.querySelector('.calculator-keys');

keys.addEventListener('click', event => {
    const { target } = event;

    const { value } = target;

    if (!target.matches('button'))
        return;
   

    if ( target.classList.contains('operator') ) {
        console.log("operator"+value);
        return;

    }

    if ( target.classList.contains('a-c') ) {
        console.log("A-C: "+value);
        return;

    }

      if ( target.classList.contains('equal-sign') ) {
        console.log("= "+value);
        return;

    }

    console.log("number: "+value);

});      


function handleEgyal() {
    console.log("= "+value);
}   

function calculate( firstNum, secondNum, operator) {
   
}   