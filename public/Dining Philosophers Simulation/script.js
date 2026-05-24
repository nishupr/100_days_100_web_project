var logDiv = document.getElementById('statusLog');

var philStates = [
    "Thinking",
    "Thinking",
    "Thinking",
    "Thinking",
    "Thinking"
];

// true = fork is free
var forks = [true, true, true, true, true];

var simStarted = false;
var deadlockShown = false;

function addLog(msg) {
    logDiv.innerHTML = msg + '<br>' + logDiv.innerHTML;
}

function updateUI(id, cssClass, label) {

    var el = document.getElementById('p' + id);

    el.className = 'phil ' + cssClass;

    el.innerHTML = 'P' + id + '<br>' + label;
}

function tryPickupForks(id) {

    // FIXED FOR YOUR VISUAL LAYOUT
    var left = (id + 4) % 5;
    var right = id;

    var deadlockMode =
        document.getElementById('deadlockMode').checked;

    // DEADLOCK MODE
    if (deadlockMode) {

        // Everyone grabs only left fork
        if (forks[left] === true) {

            forks[left] = false;

            document.getElementById('f' + left).className =
                'fork held';

            addLog(
                'P' + id +
                ' grabbed LEFT fork F' + left +
                ', waiting for RIGHT fork F' + right
            );

            checkDeadlockCondition();
        }

        return false;
    }

    var firstFork, secondFork;

    // P4 picks in reverse order to avoid deadlock
    if (id === 4) {

        firstFork = right;
        secondFork = left;

    } else {

        firstFork = left;
        secondFork = right;
    }

    // Check if both forks available
    if (
        forks[firstFork] === true &&
        forks[secondFork] === true
    ) {

        forks[firstFork] = false;
        forks[secondFork] = false;

        document.getElementById('f' + firstFork).className =
            'fork held';

        document.getElementById('f' + secondFork).className =
            'fork held';

        addLog(
            'P' + id +
            ' picked forks F' +
            firstFork +
            ' and F' +
            secondFork
        );

        return true;
    }

    return false;
}

function releaseForks(id) {

    // FIXED FOR YOUR VISUAL LAYOUT
    var left = (id + 4) % 5;
    var right = id;

    forks[left] = true;
    forks[right] = true;

    document.getElementById('f' + left).className =
        'fork';

    document.getElementById('f' + right).className =
        'fork';
}

function checkDeadlockCondition() {

    var hungryCount = 0;
    var forksAvailable = 0;

    for (var i = 0; i < 5; i++) {

        if (philStates[i] === "Hungry") {
            hungryCount++;
        }

        if (forks[i] === true) {
            forksAvailable++;
        }
    }

    // Deadlock detected
    if (
        hungryCount === 5 &&
        forksAvailable === 0 &&
        deadlockShown === false
    ) {

        deadlockShown = true;

        document.getElementById('alert').style.display =
            "block";

        addLog(
            '>>> DEADLOCK DETECTED! All philosophers waiting forever.'
        );
    }
}

function processLife(id) {

    // THINKING
    philStates[id] = "Thinking";

    updateUI(id, "thinking", "Think");

    addLog('P' + id + ' is thinking...');

    var thinkTime =
        4000 + Math.floor(Math.random() * 3000);

    setTimeout(function () {

        // HUNGRY
        philStates[id] = "Hungry";

        updateUI(id, "hungry", "Hungry");

        addLog(
            'P' + id +
            ' is hungry and trying to pick forks...'
        );

        var retryTimer = setInterval(function () {

            if (philStates[id] !== "Hungry") {

                clearInterval(retryTimer);
                return;
            }

            var gotForks = tryPickupForks(id);

            // SUCCESS
            if (gotForks === true) {

                clearInterval(retryTimer);

                philStates[id] = "Eating";

                updateUI(id, "eating", "Eating");

                addLog(
                    'P' + id +
                    ' is EATING'
                );

                // EATING TIME
                setTimeout(function () {

                    releaseForks(id);

                    addLog(
                        'P' + id +
                        ' released forks and started thinking again.'
                    );

                    processLife(id);

                }, 5000);
            }

        }, 1000);

    }, thinkTime);
}

function startSim() {

    if (simStarted) {

        alert("Simulation already running!");
        return;
    }

    simStarted = true;

    addLog('--- Simulation Started ---');

    for (var i = 0; i < 5; i++) {

        (function (id) {

            setTimeout(function () {

                processLife(id);

            }, id * 1000);

        })(i);
    }
}