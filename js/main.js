document.addEventListener('DOMContentLoaded',() => {
    const grid = document.querySelector('.grid');
    const doodler = document.createElement('div');
    let doodlerLeftSpace = 50;
    let doodlerBottomSpace = 150;
    let isGameOver = false;
    let platformCount = 5;

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
        doodler.style.left = `${doodlerLeftSpace}px`;
        doodler.style.bottom = `${doodlerBottomSpace}px`;
    }

    function createPlatforms() {
        for(let i = 0; i < platformCount; i++) {
            let platformGap = 600 / platformCount;
            let newPlatBottom = 100 + i * platformGap;
            let platform = new Platform(newPlatBottom);
        }
    }

    function start() {
        if(!isGameOver) {
            createDoodler();
            createPlatforms();
        }
    }

    /** @todo attach to button, dont start automatically */
    start();
})