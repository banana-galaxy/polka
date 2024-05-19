document.getElementById('settings').style.visibility = 'hidden'
document.getElementById('game').style.visibility = 'hidden'
let playing = false
let resetting = false
let x = 0
let y = 0
let radius = 60
let mouse_x = -1
let mouse_y = -1
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

function roundUp(num) {
  let str = String(num)
  return Number(str.split(".")[0])
}

function getDistance(coords1, coords2) {
  let delta_x = Math.abs(coords1[0] - coords2[0])
  let delta_y = Math.abs(coords1[1] - coords2[1])
  return Math.sqrt(delta_x**2 + delta_y**2)
}

function randrange(start, stop) {
  let num = Math.random() * stop
  while (num < start) {
    num = Math.random() * stop
  }
  return num
}

function reset() {
  spawn_times = []
  let average = document.getElementById('average')
  average.innerText = "100"
  let current = document.getElementById('current')
  current.innerText = "100"
  let container = document.getElementById('container')
  container.innerHTML = ""
  resetting = true
  setTimeout(()=>{
    resetting=false
    spawnDot()
  }, 3000)
}

function spawnDot() {
  x = Math.random() * (901-(radius*2))
  y = Math.random() * (901-(radius*2))

  if (mouse_x === -1) {} else {
    while (getDistance([x,y], [mouse_x, mouse_y]) < 450) {
      x = Math.random() * (901-(radius*2))
      y = Math.random() * (901-(radius*2))
    } 
  }

  let dot = document.createElementNS("http://www.w3.org/2000/svg",'svg');
  dot.setAttribute("width", `${radius*2}px`)
  dot.setAttribute("height", `${radius*2}px`)
  dot.style.marginLeft = String(x) + "px"
  dot.style.marginTop = String(y) + "px"
  let circle_container = document.createElementNS("http://www.w3.org/2000/svg",'g')
  let circle = document.createElementNS("http://www.w3.org/2000/svg",'circle')
  circle.setAttribute("cx", `${radius}`)
  circle.setAttribute("cy", `${radius}`)
  circle.setAttribute("r",`${radius}`)
  circle.style.fill = dot_color[current_color]
  circle_container.appendChild(circle)
  dot.appendChild(circle_container)
  toggleColor()


  dot.onmouseover = (e) => {
    if (!resetting) {
      let container = document.getElementById('container')
      let rect = container.getBoundingClientRect()
      mouse_x = e.clientX - rect.left
      mouse_y = e.clientY - rect.top
      container.innerHTML = ""
      let average = document.getElementById('average')
      spawn_times.push(Date.now() - spawn_time)
      let current = document.getElementById('current')
      current.innerText = spawn_times[spawn_times.length-1]
      average.innerText = String(roundUp(sum(spawn_times) / spawn_times.length))
      setTimeout(() => {
        spawnDot()
      }, randrange(250, 501))
    }
  }
  let container = document.getElementById('container')
  container.appendChild(dot)
  spawn_time = Date.now()
}

function play() {
  playing = true
  document.getElementById('menu').style.visibility = 'hidden'
  document.getElementById('game').style.visibility = 'visible'
  setTimeout(spawnDot, 3000)
}
