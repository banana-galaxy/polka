document.getElementById('settings').style.visibility = 'hidden'
document.getElementById('game').style.visibility = 'hidden'
let playing = false
let x = 0
let y = 0
let spawn_time = 0
let dot_color = ["#C485FF", "#FF99B6"]
let current_color = 0
let spawn_times = []

function toggleColor() {
  if (current_color === 1) {
    current_color = 0
  } else {
    current_color = 1
  }
}


function sum(list) {
  let total = 0;

  for (let i = 0; i < list.length; i++) {
    total += list[i]
  }

  return total
}


function spawnDot() {
  x = Math.random() * 751
  y = Math.random() * 751
  /*let dot = document.createElement('img')
  dot.setAttribute("src", "dot.svg")
  dot.setAttribute("width", "50")
  dot.setAttribute("height", "50")
  dot.style.marginLeft = String(x) + "px"
  dot.style.marginTop = String(y) + "px"
  dot.onmouseover*/
  let dot = document.createElementNS("http://www.w3.org/2000/svg",'svg');
  dot.setAttribute("width", "100px")
  dot.setAttribute("height", "100px")
  dot.style.marginLeft = String(x) + "px"
  dot.style.marginTop = String(y) + "px"
  let circle_container = document.createElementNS("http://www.w3.org/2000/svg",'g')
  let circle = document.createElementNS("http://www.w3.org/2000/svg",'circle')
  circle.setAttribute("cx", "50")
  circle.setAttribute("cy", "50")
  circle.setAttribute("r", "50")
  circle.style.fill = dot_color[current_color]
  circle_container.appendChild(circle)
  dot.appendChild(circle_container)
  toggleColor()


  dot.onmouseover = () => {
    let container = document.getElementById('container')
    container.innerHTML = ""
    let average = document.getElementById('average')
    spawn_times.push(Date.now() - spawn_time)
    average.innerText = String(sum(spawn_times) / spawn_times.length)
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
