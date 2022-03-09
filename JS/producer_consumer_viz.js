var mutex = 1, full = 0, empty, item = 0; //initialised semaphore mutex in the form of int. 
var $output = $("#textArea");
const executeBTN = document.getElementById("executeBTN");

var btnLocation = 0;  //initialised btnLocation variable to keep track of location of placed buttons

// Time Complexity = O(1)
function producer() {
    // while producer function is running, the mutex is set to 0. This is so that no other processes run while the producer function is running.
    --mutex, ++full, --empty, item++;

    console.log("Producer produced: " + item);
    $output.append("Producer produced: " + item + "\n");

    ++mutex;    //mutex is incremented back to 1 to signify the completion of producer process.
}

// Time Complexity = O(1)
function consumer() {
    --mutex, --full, ++empty;

    console.log("Consumer consumed: " + item);
    $output.append("Consumer consumed: " + item + "\n");

    item--;
    ++mutex;
}

// Time Complexity = O(n)
function producerConsumer() {

    executeBTN.style.visibility = "hidden";

    var bufferSize = document.getElementById("bufferSize").value;
    var nProducers = document.getElementById("nProducers").value;
    var nConsumers = document.getElementById("nConsumers").value;

    var btnContainer = document.getElementById("outputBTNcontainer");

    empty = bufferSize;

    // Checks if entered value is integer.
    if ((Number.isInteger(parseInt(nProducers)) == false) || (Number.isInteger(parseInt(nConsumers)) == false) || (Number.isInteger(parseInt(bufferSize)) == false)) {
        alert("Input value must be integer.");
        resetPage();
    }

    // Checks if a value is entered.
    if (nProducers.length == 0 || nConsumers.length == 0 || bufferSize.length == 0) {
        alert("Please enter input in all fields.");
        resetPage();
    }

    // Checks if entered value is positive.
    if (parseInt(nProducers) < 0 || parseInt(nConsumers) < 0 || parseInt(bufferSize) < 0) {
        alert("Buffer size, Number of produced items, and number of items to be consumed should be greater than 0.");
        resetPage();
    }

    // Checks if number of produced items is greater than size of buffer.
    if (parseInt(nProducers) > parseInt(bufferSize)) {
        alert("Number of items produced can't be greater than buffer size.");
        resetPage();
    }

    // Check if number of items to be consumed is greater than number of items produced. 
    if (parseInt(nConsumers) > parseInt(nProducers)) {
        alert("Number of items consumed can't be greater than number of items produced.");
        resetPage();
    }

    else {
        //this loop calls producer function that produces an item.
        for (let i = 0; i < parseInt(nProducers); i++) {
            if ((mutex == 1) && (empty != 0)) {
                producer();
            }
        }

        //this loop calls consumer function that consumes an item.
        for (let i = 0; i < parseInt(nConsumers); i++) {
            if ((mutex == 1) && (full != 0)) {
                consumer();
            }
        }

        //this for loop shows buttons on screen in a row for visualisation purpose.
        for (let i = 0; i < parseInt(nProducers) - parseInt(nConsumers); i++) {
            var buttonOut = '<button type="button" class="outputBTN1' + (btnLocation + 1) + ' onclick="add_entry(this.id)">' + 'P' + (btnLocation + 1) + '</button>';
            btnLocation++;
            btnContainer.innerHTML += buttonOut;
        }
    }
}

function resetPage() {
    location.reload();
}
