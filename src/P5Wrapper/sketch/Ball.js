export default function Ball(p, i, color, speed) {
  this.id = i
  this.rad = p.props.radius
  this.x = p.random(3*this.rad, p.width-3*this.rad)
  this.y = p.random(3*this.rad, p.height-3*this.rad)
  this.xspeed = p.random(0, 1)
  this.yspeed = 1 - this.xspeed
  this.xdirection = p.random(0, 1) > 0.5 ? -1 : 1
  this.ydirection = p.random(0, 1) > 0.5 ? -1 : 1
  this.color = color
  this.selected = false

  this.move = () => {
    this.x += this.xspeed * this.xdirection * speed
    this.y += this.yspeed * this.ydirection * speed
    if (this.x > p.width - this.rad || this.x < this.rad) { this.xdirection *= -1 }
    if (this.y > p.height - this.rad || this.y < this.rad) { this.ydirection *= -1 }
  }

  this.hover = () => {
    this.d = p.dist(p.mouseX, p.mouseY, this.x, this.y)
    if (this.d < this.rad) { p.cursor(p.HAND) }
  }

  this.clicked = () => {
    if (this.d < this.rad) { this.selected = !this.selected }
    this.color = this.selected ? p.selectedColor : p.defaultColor
    let timerId = setInterval(() => { this.rad += this.selected ? 0.1 : -0.1 })
    setTimeout(() => { clearInterval(timerId) }, 100)
    if (this.selected) {
      p.selectedBalls.push(this)
    } else {
      let index = p.selectedBalls.indexOf(this)
      if (index > -1) { p.selectedBalls.splice(index, 1) }
    }
  }

  this.display = () => {
    p.push()
    p.fill(this.color)
    p.strokeWeight(2)
    p.ellipse(this.x, this.y, this.rad, this.rad)
    p.pop()
  }
}
