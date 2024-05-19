document.getElementById('settings').style.visibility = 'hidden'
document.getElementById('game').style.visibility = 'hidden'
let playing = false
let x = 0
let y = 0
let spawn_time = 0

function spawnDot() {
  x = Math.random() * 851
  y = Math.random() * 851
  let dot = document.createElement('img')
  dot.setAttribute("src", "dot.svg")
  dot.setAttribute("width", "50")
  dot.setAttribute("height", "50")
  dot.style.marginLeft = String(x) + "px"
  dot.style.marginTop = String(y) + "px"
  dot.onmouseover = () => {
    let container = document.getElementById('container')
    container.innerHTML = ""
    console.log(Date.now() - spawn_time)
    setTimeout(() => {
      spawnDot()
    }, Math.random() * 2000)
  }
  let container = document.getElementById('container')
  container.appendChild(dot)
  spawn_time = Date.now()
}

function play() {
  playing = true
  document.getElementById('menu').style.visibility = 'hidden'
  document.getElementById('game').style.visibility = 'visible'
  spawnDot()
}
