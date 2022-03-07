var mutex = 1, full = 0, empty, x = 0;
var $output = $("#textArea");
const submitBTN = document.getElementById("submitBTN");


function producer() {
    --mutex, ++full, --empty, x++;
    setTimeout(1000);
    console.log("Producer produced: " + x);
    $output.append("Producer produced: " + x + "\n");
    ++mutex;
}

function consumer() {
    --mutex, --full, ++empty;
    // setTimeout(1000);
    console.log("Consumer consumed: " + x);
    $output.append("Consumer consumed: " + x + "\n");
    x--;
    ++mutex;
}

function producerConsumer() {

    submitBTN.style.visibility = "hidden";

    var bufferSize = document.getElementById("bufferSize").value;
    var nProducers = document.getElementById("nProducers").value;
    var nConsumers = document.getElementById("nConsumers").value;

    empty = bufferSize;
    var buffer = new Array(bufferSize);

    if (nProducers > bufferSize) {
        alert("Number of producers can't be greater than buffer size");
    }

    for (let i = 0; i < nProducers; i++) {
        if ((mutex == 1) && (empty != 0)) {

            producer();
            buffer[i] = i + 1;
            console.log(buffer[i]);
        }
    }

    for (let i = 0; i < nConsumers; i++) {
        if ((mutex == 1) && (full != 0)) {
            consumer(buffer);
            buffer.pop();
            console.log(buffer[nConsumers - (i + 1)]);
        }
    }


}

function resetPage() {
    location.reload();
}
