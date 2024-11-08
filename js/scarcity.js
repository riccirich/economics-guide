let resources = {
    energy: 50,
    time: 50,
    money: 50
};

let currentTask = 0;

const tasks = [
    {
        text: "You have a chance to work overtime.",
        choices: [
            { text: "Work overtime (+20 Money, -10 Energy)", effects: { money: +20, energy: -10, time: 0 } },
            { text: "Decline the offer (No change)", effects: { money: 0, energy: 0, time: 0 } }
        ]
    },
    {
        text: "You can go to a concert with friends.",
        choices: [
            { text: "Go to the concert (-10 Money, -5 Energy, -10 Time)", effects: { money: -10, energy: -5, time: -10 } },
            { text: "Stay home (+5 Energy, +5 Time)", effects: { money: 0, energy: +5, time: +5 } }
        ]
    },
    {
        text: "You have an opportunity to take a class.",
        choices: [
            { text: "Take the class (-15 Money, -15 Time)", effects: { money: -15, energy: 0, time: -15 } },
            { text: "Skip the class (+5 Money)", effects: { money: +5, energy: 0, time: 0 } }
        ]
    }
];

function startGame() {
    currentTask = 0;
    updateResources();
    showTask();
}

function updateResources() {
    document.getElementById('energy').textContent = resources.energy;
    document.getElementById('time').textContent = resources.time;
    document.getElementById('money').textContent = resources.money;
}

function showTask() {
    if (currentTask < tasks.length) {
        const task = tasks[currentTask];
        document.getElementById('taskText').textContent = task.text;
        document.getElementById('choice1').textContent = task.choices[0].text;
        document.getElementById('choice2').textContent = task.choices[1].text;
        document.getElementById('taskArea').style.display = 'none';
        document.getElementById('choices').style.display = 'block';
    } else {
        endGame();
    }
}

function makeChoice(choiceIndex) {
    const effects = tasks[currentTask].choices[choiceIndex - 1].effects;
    resources.money += effects.money;
    resources.energy += effects.energy;
    resources.time += effects.time;

    updateResources();

    if (resources.energy <= 0 || resources.time <= 0 || resources.money <= 0) {
        endGame("out");
    } else {
        currentTask++;
        showTask();
    }
}

function endGame(reason = "finished") {
    document.getElementById('choices').style.display = 'none';
    document.getElementById('endScreen').style.display = 'block';

    if (reason === "out") {
        document.getElementById('summary').textContent = "Game over! You ran out of resources.";
    } else {
        document.getElementById('summary').textContent = `You completed the game! Final Resources - Money: ${resources.money}, Energy: ${resources.energy}, Time: ${resources.time}`;
    }
}

function restartGame() {
    resources = { energy: 50, time: 50, money: 50 };
    document.getElementById('endScreen').style.display = 'none';
    document.getElementById('taskArea').style.display = 'block';
    startGame();
}