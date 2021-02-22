const grille = document.querySelector('.field')
const score = document.querySelector('.score')
let resultat = 0
let allDivs
let aliens = []
let heros = 229
let direction = 1
let width = 20
score.innerText = `Score : ${resultat}`

function Alien(index, etat, anim) {
    this.index = index,
        this.etat = etat,
        this.anim = anim
}

function createAliens() {
    for (i = 1; i < 53; i++) {
        if (i === 13) {
            i = 21;
            let newalien = new Alien(i, 0, 0)
            aliens.push(newalien)
        } else if (i === 33) {
            i = 41
            let newalien = new Alien(i, 0, 0)
            aliens.push(newalien);
        }
        else {
            let newalien = new Alien(i, 0, 0)
            aliens.push(newalien)
        }
    }
}

function createGrille() {

    let index = 0;

    for (i = 0; i < 240; i++) {
        if (index === 0) {
            const bloc = document.createElement('div')
            bloc.setAttribute('data-left', 'true')
            grille.appendChild(bloc)
            index++
        } else if (index === 19) {
            const bloc = document.createElement('div')
            bloc.setAttribute('data-right', 'true')
            grille.appendChild(bloc)
            index = 0
        }
        else {
            const bloc = document.createElement('div')
            grille.appendChild(bloc)
            index++
        }
    }

}
function afficheAliens() {
    allDivs = document.querySelectorAll('.field div')
    aliens.forEach(element => {
        allDivs[element.index].classList.add('ennemy')


    })

}

function deplacerTireur(e) {
    allDivs[heros].classList.remove('heros')
    if (e.key === "ArrowLeft") {
        if (heros > 220) {
            heros -= 1
        }
    }
    if (e.key === "ArrowRight") {
        if (heros < 239) {
            heros += 1
        }
    }
    allDivs[heros].classList.add('heros')
}



createGrille()
createAliens()
afficheAliens()
deplacerTireur(0)
let descendreRight = true;
let descendreLeft = true;
let invadersId = setInterval(moveAliens, 500)
document.addEventListener('keydown', deplacerTireur)

function moveAliens() {
    allDivs.forEach(element => {
        element.classList.toggle('move')
    })


    aliens.forEach(element => {
        if (allDivs[element.index].getAttribute('data-right') === 'true') {
            if (descendreRight) {
                direction = 20;
                setTimeout(() => {
                    descendreRight = false;
                }, 50);
            } else if (descendreRight === false) {
                direction = -1
            }
            descendreLeft = true;
        }
        if (allDivs[element.index].getAttribute('data-left') === 'true') {
            if (descendreLeft) {
                direction = 20;
                setTimeout(() => {
                    descendreLeft = false;
                }, 50);
            } else if (descendreLeft === false) {
                direction = 1
            }
            descendreRight = true;
        }

    })

    aliens.forEach(element => {
        allDivs[element.index].classList.remove('ennemy')
    })
    aliens.forEach(element => {
        element.index += direction
    })
    aliens.forEach(element => {
        allDivs[element.index].classList.add('ennemy')

    })

    if (allDivs[heros].classList.contains('ennemy')) {
        clearInterval(invadersId)
        grille.innerHTML = `<p class = "final">Perdu Looser</p><button class="button">REJOUER</button>`
        const button = document.querySelector('.button')
        button.addEventListener('click', () => {
            window.location.reload()
        })
    }
    aliens.forEach(element => {
        if (aliens[element.index] > allDivs.length - width) {
            clearInterval(invadersId)
            grille.innerHTML = `<p class = "final">Perdu Looser</p><button class="button">REJOUER</button>`
            const button = document.querySelector('.button')
            button.addEventListener('click', () => {
                window.location.reload()
            })
        }
    })
}

function tirer(e) {
    let laserId
    let laserEnCours = heros

    function deplacementLaser() {
        allDivs[laserEnCours].classList.remove('laser')
        laserEnCours -= width
        allDivs[laserEnCours].classList.add('laser')


        if (allDivs[laserEnCours].classList.contains('ennemy')) {
            allDivs[laserEnCours].classList.remove('laser')
            allDivs[laserEnCours].classList.remove('ennemy')
            allDivs[laserEnCours].classList.add('boom')

            aliens = aliens.filter(element => element.index !== laserEnCours)

            setTimeout(() => {
                allDivs[laserEnCours].classList.remove('boom')
            }, 250)
            clearInterval(laserId)

            resultat++
            score.innerText = `Score : ${resultat}`

            if (resultat === 36) {
                clearInterval(invadersId)
                grille.innerHTML = `<p class = "final">GAGNÉ</p><button class="button">REJOUER</button>`
                const button = document.querySelector('.button')
                button.addEventListener('click', () => {
                    window.location.reload()
                })
            }

        }


        if (laserEnCours < width) {
            clearInterval(laserId)
            setTimeout(() => {
                allDivs[laserEnCours].classList.remove('laser')
            }, 100)
        }

    }
    if (e.keyCode === 32) {
        laserId = setInterval(() => {
            deplacementLaser()
        }, 100)
    }

}
document.addEventListener('keyup', tirer)