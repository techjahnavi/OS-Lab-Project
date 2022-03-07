var mutex = 1, full = 0, empty, x = 0;
var $output = $("#textArea");
const executeBTN = document.getElementById("executeBTN");

var track = 0;

let container = document.querySelector('.container');

function producer() {
    --mutex, ++full, --empty, x++;
    setTimeout(1000);
    console.log("Producer produced: " + x);
    $output.append("Producer produced: " + x + "\n");

    ++mutex;
}

function consumer() {
    --mutex, --full, ++empty;

    console.log("Consumer consumed: " + x);
    $output.append("Consumer consumed: " + x + "\n");

    x--;
    ++mutex;
}

function producerConsumer() {

    executeBTN.style.visibility = "hidden";

    var bufferSize = document.getElementById("bufferSize").value;
    var nProducers = document.getElementById("nProducers").value;
    var nConsumers = document.getElementById("nConsumers").value;
    var trackBTNs = document.getElementById("addedBTN");
    var buttonOut;

    empty = bufferSize;

    var buffer = new Array(bufferSize);

    if (parseInt(nProducers) > parseInt(bufferSize)) {
        alert("Number of producers can't be greater than buffer size");
        location.reload();
    }

    for (let i = 0; i < parseInt(nProducers); i++) {
        if ((mutex == 1) && (empty != 0)) {

            producer();
            buffer[i] = i + 1;

            outputBTNtext = document.createTextNode(' P' + i + ' ');

            buttonOut = '<button type="button" class="outputBTN1' + (track + 1) + ' onclick="add_entry(this.id)">' + 'P' + (track + 1) + '</button>';
            track++;
            trackBTNs.innerHTML += buttonOut;

            console.log(buffer[i]);
        }
    }

    for (let i = 0; i < parseInt(nConsumers); i++) {
        if ((mutex == 1) && (full != 0)) {
            consumer(buffer);
            buffer.pop();

            console.log(buffer[parseInt(nConsumers) - (i + 1)]);
        }
    }
}

function resetPage() {
    location.reload();
}
