document.addEventListener('DOMContentLoaded',() => {
    const grid = document.querySelector('.grid');
    const doodler = document.createElement('div');
    let doodlerLeftSpace = 50;
    let doodlerBottomSpace = 250;
    let isGameOver = false;
    let platformCount = 5;
    let platforms= [];
    let upTimerId;
    let downTimerId;
    let movePlatformsTimerId;
    let isJumping = false;

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
            })
        }
    }

    function jump() {
        clearInterval(downTimerId);
        isJumping = true;
        upTimerId = setInterval(function () {
            doodlerBottomSpace += 20;
            doodler.style.bottom = doodlerBottomSpace + 'px';
            if(doodlerBottomSpace > 350) {
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
        },30);
    }

    function control(e) {
        if(e.key === 'ArrowLeft') {

        }

        if(e.key === 'ArrowRight') {

        }

        if(e.key === 'ArrowUp') {

        }
    }

    function start() {
        if(!isGameOver) {
            createPlatforms();
            createDoodler();
            movePlatformsTimerId = setInterval(movePlatforms,30);
            jump();
        }
    }

    function gameOver() {
        isGameOver = true;
        clearInterval(upTimerId);
        clearInterval(downTimerId);
        clearInterval(movePlatformsTimerId);
    }

    /** @todo attach to button, dont start automatically */
    start();
})