

function Game() {
    this.timerSeconds = 20;
    this.questionImage = 'https://s9.postimg.org/he226x19b/question2.jpg';
    this.finishImage = 'https://s9.postimg.org/iui62mti7/crossflag.png';
    this.correctImage = 'https://s9.postimg.org/au3ve429r/correct.jpg';
    this.wrongImage = 'https://s9.postimg.org/6xqji49kf/wrong.png';
    this.state = 0; // loading_images:0, timer_counting:1, matching_process:2, show_reset:3
    this.loadedImageCount = 0;
    this.matchedImageCount = 0;
    this.images = [
        'https://s18.postimg.org/nus1asogp/apple.jpg',
        'https://s18.postimg.org/dxh0hq955/shirt.jpg',
        'https://s18.postimg.org/7c4ahw0zd/avacado.jpg',
        'https://s18.postimg.org/opekwryvd/ball.png',
        'https://s18.postimg.org/to23bauyh/car.png',
        'https://s18.postimg.org/avq87pj4p/chess.jpg',
        'https://s18.postimg.org/prorf9zo9/dino.jpg',
        'https://s18.postimg.org/tbap53a3t/flower.jpg',
        'https://s18.postimg.org/81n2u998p/teddy.jpg',
        'https://s18.postimg.org/sw4h9k4w9/art.jpg',
        'https://s18.postimg.org/4sdplc70p/basketball.jpg',
        'https://s18.postimg.org/unxg4g13t/boy.png',
        'https://s18.postimg.org/7mguys1h5/cube.jpg',
        'https://s18.postimg.org/g4qb31fop/cube2.jpg',
        'https://s18.postimg.org/42ux8yr1l/cup.jpg',
        'https://s18.postimg.org/8or1hapfd/cupwater.jpg',
        'https://s18.postimg.org/ecxc88bs9/design.png',
        'https://s18.postimg.org/ghhp99nop/gift.png',
        'https://s18.postimg.org/i9ao45jw9/glasses.jpg',
        'https://s18.postimg.org/3q3j2qj1l/greenapple.jpg',
        'https://s18.postimg.org/kdv156vsp/pika.jpg',
        'https://s18.postimg.org/pp9xpxcqh/pot.jpg',
        'https://s18.postimg.org/oa8d1692h/shield.jpg',
        'https://s18.postimg.org/67fa9ysnd/tomato.jpg',
        'https://s18.postimg.org/omzr7fz2x/torch.jpg',
        'https://s18.postimg.org/9r17zsxy1/toy.jpg',
        'https://s18.postimg.org/ykas0h43t/trumpet.jpg',
        'https://s18.postimg.org/6k6og78d5/wheel.jpg'
    ];
    this.imageCount = 9;
    this.selectedImages = [];
    this.createImageGrid();
    this.correctPosition = -1;
    this.imageTransitionTime = 1200;
}

Game.prototype.showLoader = function () {
    document.getElementsByClassName('loader')[0].style.opacity = 1;
};

Game.prototype.createImageGrid = function () {
    this.targetImage = new Image(null, this.questionImage, document.getElementById('targetBox'), 'targetImage');

    let imagesLength = this.images.length - 1;
    for (let i = 0; i < this.imageCount; i++) {
        if (!(i % 3)) {
            var parentDiv = document.createElement('div');
            parentDiv.setAttribute('id', `row${i}`);
            document.body.appendChild(parentDiv);
        }

        const nextImageIndex = Math.floor(Math.random() * (imagesLength - i));
        this.selectedImages[i] = new Image(i, this.images[nextImageIndex], parentDiv, `img${i}`);

        const temp = this.images[nextImageIndex];
        this.images[nextImageIndex] = this.images[imagesLength - i];
        this.images[imagesLength - i] = temp;
        imagesLength--;
    }
};

Game.prototype.imageLoaded = function () {
    this.loadedImageCount++;

    if (this.loadedImageCount == this.imageCount + 1) {
        this.displayImages();
    }
};

Game.prototype.displayImages = function () {
    this.selectedImages.forEach((image) => {
        image.showImage();
    });

    this.targetImage.showImage();
    document.getElementsByClassName('loader')[0].style.display = 'none';
    this.startTimer();
};

Game.prototype.coverImages = function () {
    this.selectedImages.forEach((image) => {
        image.coverImage();
    });

    this.state = 2;

    const gameThis = this;
    setTimeout(() => {
        gameThis.setTargetImage();
    }, 0);
};

Game.prototype.startTimer = function () {
    this.state = 1;
    const gameThis = this;
    let seconds = this.timerSeconds;
    document.getElementById('timer').innerHTML = `Timer: <br>${seconds} seconds`;
    const timer = setInterval(() => {
        document.getElementById('timer').innerHTML = `Timer: <br>${--seconds} seconds`;

        if (seconds == 0) {
            clearInterval(timer);
            document.getElementById('timer').innerHTML = '';
            gameThis.coverImages();
        }
    }, 1000);
};

Game.prototype.setTargetImage = function () {
    const remainingMatches = this.selectedImages.length - this.matchedImageCount;

    if (remainingMatches) {
        let targetImageIndex = Math.floor(Math.random() * (remainingMatches - 1));

        for (let i = 0; i < this.selectedImages.length; i++) {
            if (this.selectedImages[i].state == 3) {
                continue;
            } else if (targetImageIndex) {
                targetImageIndex--;
                continue;
            }

            document.getElementById('targetImage').src = this.selectedImages[i].url || '';
            this.correctPosition = this.selectedImages[i].position;
            break;
        }
    }
};

Game.prototype.showCorrect = function () {
    document.getElementById('decision').innerHTML = `<img class="sq-image" style="border: 0" src=${this.correctImage}>`;
    setTimeout(() => {
        document.getElementById('decision').innerHTML = '';
    }, 0.9 * game.imageTransitionTime);
};

Game.prototype.showWrong = function () {
    document.getElementById('decision').innerHTML = `<img class="sq-image" style="border: 0" src=${this.wrongImage}>`;
    setTimeout(() => {
        document.getElementById('decision').innerHTML = '';
    }, 500);
};

function Image(position, url, parentDiv, id) {
    this.position = position;
    this.url = url;
    this.state = 0; // loading:0, show:1, cover:2, matched:3
    this.element = this.createImageElement(url, parentDiv, id);
}

Image.prototype.createImageElement = function (url, parentDiv, id) {
    const newImg = document.createElement('img');
    newImg.setAttribute('id', id);
    newImg.setAttribute('class', 'sq-image');
    newImg.setAttribute('src', url);
    newImg.setAttribute('onload', 'imageLoaded()');
    newImg.style.opacity = 0;
    parentDiv.appendChild(newImg);
    return newImg;
};

Image.prototype.coverImage = function () {
    this.state = 2;
    this.element.src = game.questionImage;
    this.element.setAttribute('onclick', `imageOnClick(${this.position})`);
};

Image.prototype.showImage = function () {
    this.state = 1;
    this.element.style.opacity = 1;
};

Image.prototype.removeImage = function () {
    game.setTargetImage();
};

let game;
function startGame() {
    document.body.innerHTML =
        '<div style="margin-bottom: 50px">' +
        '   <div class="timer sq-image" style="border: 0">' +
        '       <br> <b id="timer"></b>' +
        '   </div>' +
        '   <div id="targetBox" style="display: inline-block;">' +
        '       <div id="targetText"><b>FIND MATCH</b></div>' +
        '   </div>' +
        '   <div id="decision" class="sq-image" style="border: 0">' +
        '   </div>' +
        '</div>' +
        '<div style="height: 0; width: 0">' +
        '   <div class="loader"></div>' +
        '</div>';
    game = new Game();

    const decisionImgs = document.createElement('div');
    decisionImgs.innerHTML = `${'<div style="display: none">' +
        '   <img src='}${game.correctImage}>` +
        `   <img src=${game.wrongImage}>` +
        '</div>';
    document.body.appendChild(decisionImgs);
}

setTimeout(() => {
    startGame();
}, 0);

function imageLoaded() {
    game.imageLoaded();
}

function imageOnClick(selectedPosition) {
    if (selectedPosition == game.correctPosition) {
        game.showCorrect();
        game.matchedImageCount++;

        game.selectedImages[selectedPosition].element.src = game.selectedImages[selectedPosition].url;
        game.selectedImages[selectedPosition].state = 3;

        setTimeout(() => {
            game.selectedImages[selectedPosition].element.outerHTML = '<div class="sq-image sq-matched"></div>';
        }, game.imageTransitionTime);

        if (game.matchedImageCount == game.imageCount) {
            setTimeout(() => {
                document.getElementById('targetText').innerHTML = '<b>GAME OVER</b>';
                document.getElementById('targetImage').src = game.finishImage;
                document.getElementById('decision').innerHTML =
                    '<button id="reset" style="display: inline-block" onclick="reset()">RESET GAME</button>';
            }, 1.1 * game.imageTransitionTime);
        } else {
            setTimeout(() => {
                game.setTargetImage();
            }, game.imageTransitionTime);
        }
    } else {
        game.showWrong();
    }
}

function reset() {
    startGame();
}
