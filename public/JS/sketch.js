var hits;
var times;
var len;
var x;
var y;
var onlyOne;
var end;
var chances;
var blocks = 20;
var level;
var marr;
var inputName;
var record1 = [];
var record2 = [];
var submit = 0;
var timeLeft = 90;
var currentTime;
var sec, mins;
var timer;

function setup() {
	createCanvas(900, 600);
	end = -1;
	len = 1;
	hits = 0;
	pickLocation();

	setInterval(getScore, 1000);

	times = 1;
	onlyOne = 0;
	chances = 6;
	currentTime = 0;
	convertSeconds(timeLeft);
	timer = 0;

	record1.length = 0;
	record2.length = 0;

	submit = 0;
	startScreen();
}

function bubbleSort1() {
	for (i = 0; i < 30; i++)
		for (j = record1.length - 1; j > 0; j--)
			if (record1[j].score > record1[j - 1].score) {
				var tempS = record1[j];
				record1[j] = record1[j - 1];
				record1[j - 1] = tempS;
			}
}

function bubbleSort2() {
	for (i = 0; i < 30; i++)
		for (j = record2.length - 1; j > 0; j--)
			if (record2[j].score > record2[j - 1].score) {
				var tempS = record2[j];
				record2[j] = record2[j - 1];
				record2[j - 1] = tempS;
			}
}

async function getScore() {
	var data1 = {
		level: -1,
	};
	const none = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data1),
	};
	var response = await fetch("/getTheScore", none);
	var SCORE = await response.json();
	record1 = SCORE.lvl1;
	record2 = SCORE.lvl2;
}

function draw() {
	if (timer % 60 == 0 && end == 0) timeIt();
	timer++;
	if (end == 0) gameScreen();
}

function startScreen() {
	background(60);
	stroke(255);
	strokeWeight(1);
	line(width / 2, 0, width / 2, height);
	fill(190);
	stroke(0);
	rectMode(CENTER);
	rect(width / 4, height / 2, 270, 70);
	rect((3 * width) / 4, height / 2, 270, 70);
	textAlign(CENTER);
	fill(0);
	textSize(30);
	text("Slow Mode", width / 4, height / 2 + 10);
	text("Fast Mode", (3 * width) / 4, height / 2 + 10);
}

function instruction() {
	background(60);
	textSize(50);
	fill(255, 0, 255);
	text("INSTRUCTIONS:", width / 2, 50);
	fill(255, 255, 0);
	text("HIT on Mole's Head to Score", width / 2, 400);
	fill(0, 255, 255);
	text("MISS to lose Chances", width / 2, 500);
	fill(0, 255, 0);
	text("CLICK to Continue...", width / 2, 580);
	fill(162, 42, 42);
	arc(width / 2, height / 2, 80, 160, PI, 0, OPEN);
	fill(0);
	ellipse(width / 2 - 15, height / 2 - 50, 10, 20);
	ellipse(width / 2 + 15, height / 2 - 50, 10, 20);
	fill(255, 0, 0);
	ellipse(width / 2, height / 2 - 35, 20, 10);
	line(width / 2 - 26, height / 2 - 60, width / 2 + 26, height / 2 - 60);
	line(width / 2 + 20, height / 2 - 75, width / 2 + 50, height / 2 - 100);
	line(width / 2 + 20, height / 2 - 75, width / 2 + 20, height / 2 - 95);
	line(width / 2 + 20, height / 2 - 75, width / 2 + 40, height / 2 - 75);
	fill(255, 0, 0);
	textSize(30);
	text("HEAD", width / 2 + 70, height / 2 - 110);
}

function convertSeconds(s) {
	mins = int(s / 60);
	sec = s % 60;
}

function timeIt() {
	currentTime++;
	convertSeconds(timeLeft - currentTime);
	if (currentTime == timeLeft) {
		end = 1;
		endScreen();
	}
}

function gameScreen() {
	background(60);
	textSize(40);
	if (timeLeft - currentTime < 11) fill(255, 0, 0);
	else fill(255);
	text(nf(mins, 2) + ":" + nf(sec, 2), width - 70, 60);
	drawMachine();
	if (times <= 0 || times >= 30) len = -1 * len;
	if (times <= 0) pickLocation();
	times += len;
	diglet();
	marr = hits;
}

function drawMachine() {
	fill(255, 255, 0);
	rectMode(CENTER);
	rect(width / 2, 135, 800, 100);
	fill(255);
	rect(width / 2, 135, 780, 80);
	fill(0, 255, 0);
	rect(width / 2, height / 2 + 50, 800, 330);
	for (i = 0; i < 3; i++)
		for (j = 0; j < 2; j++) {
			fill(255, 0, 0);
			ellipse(150 + 300 * i, 275 + 150 * j, 100, 25);
			fill(0);
			ellipse(150 + 300 * i, 275 + 150 * j, 90, 15);
		}
	textAlign(CENTER);
	textSize(70);
	fill(255, 0, 255);
	text("Whack-A-Mole", width / 2 - 20, 60);
	fill(0, 255, 255);
	text("Hit on Mole's Head", width / 2, height - 20);
	fill(0);
	textSize(60);
	text("Score: " + hits + " Chances: " + chances, width / 2, 155);
}

function diglet() {
	fill(165, 42, 42);
	if (times < 17) {
		arc(x, y, 40 + (5 * times) / 2, 10 * times, PI, 0, OPEN);
		if (times > 6) {
			fill(0);
			ellipse(x - 15, y - 5 * (times - 6), 10, 20);
			ellipse(x + 15, y - 5 * (times - 6), 10, 20);
		}
		if (times > 9) {
			fill(255, 0, 0);
			ellipse(x, y - 5 * (times - 9), 20, 10);
		}
	} else {
		arc(x, y, 80, 160, PI, 0, OPEN);
		fill(0);
		ellipse(x - 15, y - 50, 10, 20);
		ellipse(x + 15, y - 50, 10, 20);
		fill(255, 0, 0);
		ellipse(x, y - 35, 20, 10);
	}
}

function pickLocation() {
	x = 150 + 300 * int(random(0, 3));
	y = 275 + 150 * int(random(0, 2));
	onlyOne = 0;
}

function mousePressed() {
	var hor = width / 4;
	var ver = height / 2;
	if (
		end > 0 &&
		mouseX > 2 * hor + 10 &&
		mouseX < 2 * hor + 110 &&
		mouseY > ver + 45 &&
		mouseY < ver + 75
	) {
		removeElements();
		setup();
	}
	if (
		(end == 1 || end == 3) &&
		mouseX > width / 2 - 70 &&
		mouseX < width / 2 + 70 &&
		mouseY > ver + 85 &&
		mouseY < ver + 115
	) {
		highscoreScreen();
	}
	if (
		(end == 4 || end == 3) &&
		mouseX > 2 * hor - 110 &&
		mouseX < 2 * hor - 10 &&
		mouseY > ver + 45 &&
		mouseY < ver + 75
	) {
		end = 1;
		endScreen();
	}
	if (
		end == 2 &&
		mouseX > 2 * hor - 110 &&
		mouseX < 2 * hor - 10 &&
		mouseY > ver + 45 &&
		mouseY < ver + 75
	) {
		removeElements();
		data = {
			level: level,
			name: inputName.value(),
			score: marr,
		};
		nameSubmitted();
	}
	if (
		end == 1 &&
		(submit == 0 || submit == 2) &&
		mouseX > 2 * hor - 110 &&
		mouseX < 2 * hor - 10 &&
		mouseY > ver + 45 &&
		mouseY < ver + 75
	) {
		if (submit == 0) {
			submitScreen();
		} else if (submit == 2) {
			submit = 0;
		}
	}
	if (end == -0.5) {
		end = 0;
	}
	if (end == -1) {
		if (
			mouseX > hor - 135 &&
			mouseX < hor + 135 &&
			mouseY > ver - 35 &&
			mouseY < ver + 35
		) {
			len = 1;
			level = 1;
			end = -0.5;
			instruction();
		} else if (
			mouseX > 3 * hor - 135 &&
			mouseX < 3 * hor + 135 &&
			mouseY > ver - 35 &&
			mouseY < ver + 35
		) {
			len = 2;
			level = 2;
			end = -0.5;
			instruction();
		}
	}
	if (
		end == 0 &&
		mouseX > x - 26 &&
		mouseX < x + 26 &&
		mouseY > y - 80 &&
		mouseY < y - 60 &&
		onlyOne == 0 &&
		times > 10
	) {
		hits++;
		onlyOne++;
	} else if (end == 0 && onlyOne != 1) {
		chances--;
		if (chances <= 0) {
			end = 1;
			endScreen();
		}
	}
}

function endScreen() {
	bubbleSort1();
	bubbleSort2();

	background(60);
	if (level == 1) {
		if (hits > record1[0].score) {
			newHigh();
		} else {
			stroke(255, 0, 0);
			strokeWeight(3);
			fill(255, 150, 200);
			textAlign(CENTER);
			textSize(40);
			text("HighScore by", width / 2, 3 * blocks);
			noStroke();
			fill(0, 255, 255);
			textSize(60);
			text(
				record1[0].name + ": " + record1[0].score,
				width / 2,
				6 * blocks
			);
		}
	} else if (level == 2) {
		if (hits > record2[0].score) newHigh();
		else {
			stroke(255, 0, 0);
			strokeWeight(3);
			fill(255, 150, 200);
			textAlign(CENTER);
			textSize(40);
			text("HighScore by", width / 2, 3 * blocks);
			noStroke();
			fill(0, 255, 255);
			textSize(60);
			text(
				record2[0].name + ": " + record2[0].score,
				width / 2,
				6 * blocks
			);
		}
	}
	stroke(255, 0, 0);
	strokeWeight(3);
	fill(255, 0, 0);
	textAlign(CENTER);
	textSize(60);
	text("Game Ended", width / 2, height / 2 - 2 * blocks);
	textSize(30);
	noStroke();
	strokeWeight(1);
	fill(255);
	text("Your Score: " + hits, width / 2, height / 2 + blocks + 10);
	fill(0, 255, 0);
	textSize(30);
	text("Level: " + level, width / 2, height / 2);
	resetButton();
}

function resetButton() {
	stroke(0);
	fill(160);
	rectMode(CENTER);
	rect(width / 2 + 60, height / 2 + 60, 100, 30);
	rect(width / 2 - 60, height / 2 + 60, 100, 30);
	textSize(20);
	if (end == 1 || end == 3) {
		rect(width / 2, height / 2 + 100, 140, 30);
		fill(0);
		text("Highscore List", width / 2, height / 2 + 107);
	}
	fill(0);
	text("Restart", width / 2 + 60, height / 2 + 67);
	if (end == 4 || end == 3) text("Back", width / 2 - 60, height / 2 + 67);
	else text("Submit", width / 2 - 60, height / 2 + 67);
}

function newHigh() {
	stroke(255, 0, 0);
	strokeWeight(3);
	fill(255, 150, 200);
	textAlign(CENTER);
	textSize(40);
	text("New HighScore", width / 2, 3 * blocks);
}

function highscoreScreen() {
	bubbleSort1();
	bubbleSort2();

	background(60);
	end = 4;
	resetButton();
	stroke(255, 0, 255);
	fill(180, 30, 150);
	textSize(50);
	text("Level " + level, width / 2, 2 * blocks);
	fill(255, 215, 0);
	noStroke();
	text("HighScore List:", width / 2, 4.5 * blocks);
	fill(0, 255, 255);
	textSize(20);
	if (level == 1) {
		for (i = 0; i < 10; i++) {
			text(
				i + 1 + ". " + record1[i].name + ": " + record1[i].score,
				width / 6,
				(i + 5) * (blocks + 4)
			);
			text(
				i +
				11 +
				". " +
				record1[i + 10].name +
				": " +
				record1[i + 10].score,
				width / 2,
				(i + 5) * (blocks + 4)
			);
			text(
				i +
				21 +
				". " +
				record1[i + 20].name +
				": " +
				record1[i + 20].score,
				5 * (width / 6),
				(i + 5) * (blocks + 4)
			);
		}
	} else if (level == 2) {
		for (i = 0; i < 10; i++) {
			text(
				i + 1 + ". " + record2[i].name + ": " + record2[i].score,
				width / 6,
				(i + 5) * (blocks + 4)
			);
			text(
				i +
				11 +
				". " +
				record2[i + 10].name +
				": " +
				record2[i + 10].score,
				width / 2,
				(i + 5) * (blocks + 4)
			);
			text(
				i +
				21 +
				". " +
				record2[i + 20].name +
				": " +
				record2[i + 20].score,
				5 * (width / 6),
				(i + 5) * (blocks + 4)
			);
		}
	}
	if (submit != 1) {
		submit = 2;
	}
}

function submitScreen() {
	background(60);
	end = 2;
	resetButton();
	textSize(30);
	noStroke();
	strokeWeight(1);
	fill(255);
	text("Your Score: " + hits, width / 2, height / 2 + blocks + 10);
	fill(0, 255, 0);
	textSize(30);
	text("Level: " + level, width / 2, height / 2 - 40);
	inputName = createInput();
	inputName.position(width / 2 - 130, height / 2 - 30);
	inputName.size(250, 20);
}

function nameSubmitted() {
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	};
	fetch("/api", options);

	end = 3;
	submit = 1;
	saveResult();
}

function saveResult() {
	background(60);
	resetButton();
	textSize(30);
	noStroke();
	strokeWeight(1);
	fill(255);
	text("Score: " + hits, width / 2, height / 2 + blocks + 10);
	fill(255, 0, 0);
	text(inputName.value(), width / 2, height / 2 - 5);
	fill(0, 255, 0);
	textSize(30);
	text("Level: " + level, width / 2, height / 2 - 40);
}
