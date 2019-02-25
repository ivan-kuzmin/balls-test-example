import Ball from './Ball'

export default function sketch(p) {
  p.props = {}
  p.fps = 0
  p.selectedBalls = []
  p.moveBalls = true
  p.startTime = 1
  p.gameTime = 3
  p.demoSpeed = 1
  p.defaultColor = p.color("blue")
  p.targetColor = p.color("red")
  p.selectedColor = p.color(0,255,0)

  p.setup = function() {
    p.createCanvas(p.wrapper.offsetWidth, p.wrapper.offsetHeight)
    p.frameRate(60)
    p.ellipseMode(p.RADIUS)
    p.textFont('Courier New')
    p.textStyle(p.BOLD)
    p.textSize(15)
    p.onSetAppState({ startNewGame })
    createBalls(p.demoSpeed)
  }

  p.draw = function() {
    p.background(230)
    p.cursor(p.ARROW)
    if (p.selectedBalls.length !== p.props.targetBallsCount) {
      p.balls.forEach(ball => {
        ball.display()
        if (p.moveBalls) { ball.move() }
        if (p.startGame) { ball.hover() }
      })
    } else {
      const targetBalls = {}
      for (let ball of p.reversedBalls.slice(0, p.props.targetBallsCount)) {
        targetBalls[ball.id] = { x: (ball.x).toFixed(3), y: (ball.y).toFixed(3) }
      }
      p.onSetAppState({
        targetBalls: targetBalls,
        selectedBalls: p.selectedBalls,
      }, p.props.generateResult)
      p.balls = []
      p.reversedBalls = []
      p.selectedBalls = []
    }
    p.text(`Level: ${p.props.level}`, 30, 30)
    p.text(`Trials: ${p.props.playedGames}/${p.props.countOfGames}`, 30, 50)
    if (p.frameCount%20 === 0) { p.fps = p.frameRate() }
    p.text(`FPS: ${p.fps.toFixed(1)}`, 30, 70)
  }

  p.mousePressed = function() {
    if (p.startGame) {
      p.reversedBalls = [...p.balls].reverse()
      for (let ball of p.reversedBalls) {
        if (ball.d < ball.rad) {
          ball.clicked()
          break
        }
      }
    }
  }

  p.windowResized = function() {
    p.resizeCanvas(p.wrapper.offsetWidth, p.wrapper.offsetHeight)
    clearInterval(p.timeOut1)
    clearInterval(p.timeOut2)
    p.onSetAppState({ newGame: false }, startNewGame)
  }

  function createBalls(speed) {
    const { ballsCount, targetBallsCount } = p.props
    p.minTargetId = ballsCount - targetBallsCount
    p.balls = []
    for (let i=0; i<ballsCount; i++) { p.balls[i] = new Ball(p, i, i>=p.minTargetId ? p.targetColor : p.defaultColor, speed) }
  }

  function startNewGame() {
    let { newGame, speed, ballsCount } = p.props
    createBalls(newGame ? speed : p.demoSpeed)
    p.reversedBalls = []
    p.selectedBalls = []
    p.moveBalls = true
    p.startGame = false
    if (newGame) {
      p.moveBalls = false
      p.timeOut1 = setTimeout(() => {
        p.moveBalls = true
        for (let i=p.minTargetId; i<ballsCount; i++) { p.balls[i].color = p.defaultColor }
        p.timeOut2 = setTimeout(() => {
          p.moveBalls = false
          p.startGame = true
        }, p.gameTime*1000)
      }, p.startTime*1000)
    }
  }
}
