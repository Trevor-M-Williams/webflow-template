import { Fireworks } from 'fireworks-js'

const quote = document.querySelector('.quote')
setTimeout(() => {
  quote.style.opacity = 1
}, 500)

const ben = document.querySelector('.ben')
setTimeout(() => {
  ben.style.opacity = 1
}, 1000)

setTimeout(() => {
  quote.style.transform = 'translateY(0)'
}, 2000)

const keypad = document.querySelector('.keypad')
setTimeout(() => {
  keypad.style.opacity = 1
}, 3000)

const keys = document.querySelectorAll('.key')
keys.forEach((key) => {
  if (key.classList.contains('green')) return
  if (key.classList.contains('red')) return
  key.addEventListener('click', handleClick)
})

const greenKey = document.querySelector('.key.green')
greenKey.addEventListener('click', handleSubmit)

const redKey = document.querySelector('.key.red')
redKey.addEventListener('click', handleClear)

const display = document.querySelector('.display')

function handleClick(e) {
  if (display.textContent.length === 4) return
  if (display.textContent === 'Error') display.textContent = ''
  const key = e.target
  const keyValue = key.textContent
  display.textContent += keyValue
}

function handleClear() {
  display.textContent = ''
}

function handleEnter() {
  setTimeout(() => {
    display.textContent = 'Success'
  }, 0)

  setTimeout(() => {
    hideForeground()
  }, 1000)

  setTimeout(() => {
    openPanels()
  }, 1500)

  setTimeout(() => {
    hidePanels()
    startFireworks()
  }, 3500)

  setTimeout(() => {
    showWinMessage()
  }, 6500)
}

function handleSubmit() {
  const code = display.textContent
  if (code.length !== 4) return
  const isValid = validateCode(code)
  if (isValid) {
    handleEnter()
  } else {
    display.textContent = 'Error'
  }
}

function hideForeground() {
  const foreground = document.querySelector('.foreground')
  foreground.classList.add('hide')
}

function hidePanels() {
  const panels = document.querySelectorAll('.panel')
  panels[0].classList.add('hide')
  panels[1].classList.add('hide')
}

function openPanels() {
  const panels = document.querySelectorAll('.panel')
  panels[0].classList.add('slide-left')
  panels[1].classList.add('slide-right')
}

function showWinMessage() {
  const winMessage = document.querySelector('.win-message')
  winMessage.classList.add('show')
}

function startFireworks() {
  const container = document.querySelector('.background')
  const fireworks = new Fireworks(container, {
    autoresize: true,
    opacity: 0.5,
    acceleration: 1,
    friction: 0.97,
    gravity: 1.5,
    particles: 50,
    traceLength: 3,
    traceSpeed: 10,
    explosion: 5,
    intensity: 30,
    flickering: 50,
    lineStyle: 'round',
    hue: {
      min: 0,
      max: 360,
    },
    delay: {
      min: 30,
      max: 60,
    },
    rocketsPoint: {
      min: 50,
      max: 50,
    },
    lineWidth: {
      explosion: {
        min: 1,
        max: 3,
      },
      trace: {
        min: 1,
        max: 2,
      },
    },
    brightness: {
      min: 50,
      max: 80,
    },
    decay: {
      min: 0.015,
      max: 0.03,
    },
    mouse: {
      click: false,
      move: false,
      max: 1,
    },
  })
  fireworks.start()

  setTimeout(() => {
    fireworks.waitStop()
  }, 3000)
}

function validateCode(code) {
  const date = new Date()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  if (hours < 10) hours = '0' + hours
  if (minutes < 10) minutes = '0' + minutes
  const time = `${hours}${minutes}`
  return time === code
}
