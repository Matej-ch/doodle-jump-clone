document.addEventListener('DOMContentLoaded',() => {
    const grid = document.querySelector('.grid');
    const doodler = document.createElement('div');
    const startBtn = document.getElementById('start-button');
    const scoreEl = document.getElementById('score');

    let doodlerLeftSpace = 50;
    let startPoint = 150;
    let doodlerBottomSpace = startPoint;
    let isGameOver = false;
    let platformCount = 5;
    let platforms= [];
    let upTimerId;
    let downTimerId;
    let movePlatformsTimerId;
    let isJumping = false;
    let isGoingLeft = false;
    let isGoingRight = false;
    let leftTimerId;
    let rightTimerId;
    let score = 0;

    class Platform {
        constructor(newPlatBottom) {
            this.bottom = newPlatBottom;
            this.left = Math.random() * 315;
            this.visual = document.createElement('div');

            const visual = this.visual;
            visual.classList.add('platform');
            visual.style.left = this.left + 'px';
            visual.style.bottom = this.bottom + 'px';
            grid.appendChild(visual);
        }
    }


    function createDoodler() {
        grid.appendChild(doodler);
        doodler.classList.add('doodler');
        doodlerLeftSpace = platforms[0].left;
        doodler.style.left = `${doodlerLeftSpace}px`;
        doodler.style.bottom = `${doodlerBottomSpace}px`;
    }

    function createPlatforms() {
        platforms = [];
        for(let i = 0; i < platformCount; i++) {
            let platformGap = 600 / platformCount;
            let newPlatBottom = 100 + i * platformGap;
            let platform = new Platform(newPlatBottom);
            platforms.push(platform);
        }
    }

    function movePlatforms() {
        if(doodlerBottomSpace > 200) {
            platforms.forEach(platform => {
                platform.bottom -= 4;
                let visual = platform.visual;
                visual.style.bottom = platform.bottom + 'px';

                if(platform.bottom < 10) {
                    let firstPlatform = platforms[0].visual;
                    firstPlatform.classList.remove('platform');
                    score++;
                    platforms.shift();
                    let newPlatform = new Platform(600);
                    platforms.push(newPlatform);
                }
            })
        }
    }

    function jump() {
        clearInterval(downTimerId);
        isJumping = true;
        upTimerId = setInterval(function () {
            doodlerBottomSpace += 20;
            doodler.style.bottom = doodlerBottomSpace + 'px';
            if(doodlerBottomSpace > startPoint + 200) {
                fall();
            }
        },30);
    }

    function fall() {
        clearInterval(upTimerId);
        isJumping = false;
        downTimerId = setInterval(function () {
            doodlerBottomSpace -= 5;
            doodler.style.bottom = doodlerBottomSpace + 'px';
            if(doodlerBottomSpace <= 0) {
                gameOver();
            }

            platforms.forEach(platform => {
                if((doodlerBottomSpace >= platform.bottom)
                    && (doodlerBottomSpace <= platform.bottom + 15)
                    && (doodlerLeftSpace + 60 >= platform.left)
                    && (doodlerLeftSpace <= platform.left + 85)
                    && !isJumping) {

                    startPoint = doodlerBottomSpace;
                    jump();
                }
            })

        },30);
    }

    function control(e) {
        if(e.code === 'ArrowLeft' || e.code === 'KeyA') {
            moveLeft();
        }

        if(e.code === 'ArrowRight' || e.code === 'KeyD') {
            moveRight();
        }

        if(e.code === 'ArrowUp' || e.code === 'KeyW') {
            moveStraight();
        }
    }

    function moveLeft() {

        clearInterval(leftTimerId);
        clearInterval(rightTimerId);
        isGoingRight = false;
        isGoingLeft = true;

        if(isGoingRight) {
            clearInterval(rightTimerId);
            isGoingRight = false;
        }
        isGoingLeft = true;
        leftTimerId = setInterval(function () {
            if(doodlerLeftSpace >= 0) {
                doodlerLeftSpace -= 5;
                doodler.style.left =doodlerLeftSpace + 'px';
            } else moveRight()
        },20);
    }

    function moveRight() {
        clearInterval(leftTimerId);
        clearInterval(rightTimerId);
        isGoingLeft = false;
        isGoingRight = true;

        if(isGoingLeft) {
            clearInterval(leftTimerId);
            isGoingLeft = false;
        }
        isGoingRight = true;
        rightTimerId = setInterval(function () {
            ///400 - 60 width of board - doodler
            if(doodlerLeftSpace <=340) {
                doodlerLeftSpace += 5;
                doodler.style.left = doodlerLeftSpace + 'px';
            } else moveLeft()
        },20);
    }

    function moveStraight() {
        isGoingLeft = false;
        isGoingRight = false;
        clearInterval(rightTimerId);
        clearInterval(leftTimerId);
    }

    function start() {
        if(!isGameOver) {
            createPlatforms();
            createDoodler();
            movePlatformsTimerId = setInterval(movePlatforms,30);
            jump();
            document.addEventListener('keyup',control);
        }
    }

    function gameOver() {
        isGameOver = true;
        while(grid.firstChild) {
            grid.removeChild(grid.firstChild);
        }
        scoreEl.innerText = `${score}`;
        clearInterval(upTimerId);
        clearInterval(downTimerId);
        clearInterval(movePlatformsTimerId);
        clearInterval(leftTimerId);
        clearInterval(rightTimerId);
        isJumping = false;
        isGoingLeft = false;
        isGoingRight = false;
        startBtn.innerText = 'Start';
    }

    startBtn.addEventListener('click', e=> {
        if(e.target.innerText === 'Start') {
            isGameOver = false;
            e.target.innerText = 'Stop';
            start();
        } else {
            e.target.innerText = 'Start';
            gameOver();
        }
    })
})