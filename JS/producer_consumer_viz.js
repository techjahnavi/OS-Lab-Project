var mutex = 1, full = 0, empty, item = 0; //initialised semaphore mutex in the form of int. 
var $output = $("#textArea");
const executeBTN = document.getElementById("executeBTN");

var btnLocation = 0;  //initialised btnLocation variable to keep track of location of placed buttons

let container = document.querySelector('.container');

function producer() {
    --mutex, ++full, --empty, item++;   //while producer function is running, the mutex is set to 0. This is so that no other processes run while the producer function is running.
    console.log("Producer produced: " + item);
    $output.append("Producer produced: " + item + "\n");

    ++mutex;    //mutex is incremented back to 1 to signify the completion of producer process.
}

function consumer() {
    --mutex, --full, ++empty;   //similar to the above producer process. 

    console.log("Consumer consumed: " + item);
    $output.append("Consumer consumed: " + item + "\n");

    item--;
    ++mutex;
}

function producerConsumer() {

    executeBTN.style.visibility = "hidden";

    var bufferSize = document.getElementById("bufferSize").value;
    var nProducers = document.getElementById("nProducers").value;
    var nConsumers = document.getElementById("nConsumers").value;

    var btnContainer = document.getElementById("outputBTNcontainer");

    empty = bufferSize;

    var buffer = new Array(bufferSize);

    if (parseInt(nProducers) > parseInt(bufferSize)) {
        alert("Number of producers can't be greater than buffer size.");
        location.reload();
    }

    if (parseInt(nConsumers) > parseInt(nProducers)) {
        alert("Number of consumers can't be greater than number of producers.");
        location.reload();
    }

    else {
        //this loop calls producer function that produces items and also adds an item into buffer array.
        for (let i = 0; i < parseInt(nProducers); i++) {
            if ((mutex == 1) && (empty != 0)) {
                producer();
                buffer[i] = i + 1;
            }
        }

        //this loop calls consumer function that consumes items and also pops the last element from the buffer array.
        for (let i = 0; i < parseInt(nConsumers); i++) {
            if ((mutex == 1) && (full != 0)) {
                consumer();
                buffer.pop();
            }
        }

        //this for loop shows buttons on screen in a row for visualisation purpose.
        for (let i = 0; i < parseInt(nProducers) - parseInt(nConsumers); i++) {
            outputBTNtext = document.createTextNode(' P' + i + ' ');
            var buttonOut = '<button type="button" class="outputBTN1' + (btnLocation + 1) + ' onclick="add_entry(this.id)">' + 'P' + (btnLocation + 1) + '</button>';
            btnLocation++;
            btnContainer.innerHTML += buttonOut;
        }
    }
}

function resetPage() {
    location.reload();
}
