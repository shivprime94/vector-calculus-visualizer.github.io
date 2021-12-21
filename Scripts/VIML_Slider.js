function VIML_Slider() {
  this.createUI = function (p, d, o, k, b) {
    var g = this
    this.priFix = k
    var l = document.getElementById(p)
    var f = 'dot'
    var j = document.createElement('DIV')
    l.appendChild(j)
    var i = document.createElement('SPAN')
    i.innerHTML = d
    var h = document.createElement('SPAN')
    h.innerHTML = o
    this.priValueWidget.style.width = '60px'
    j.appendChild(i)
    j.appendChild(this.priValueWidget)
    j.appendChild(h)
    j.appendChild(this.extraWidget)
    var e = document.createElement('TABLE')
    l.appendChild(e)
    e.style.borderStyle = f
    e.style.width = '100%' // this one============================
    var n = e.insertRow(0)
    n.style.border = 0
    var c = n.insertCell(0)
    c.style.borderStyle = f
    c.vAlign = 'top'
    c.style.width = this.defInputBoxWidth //shifts slider to the right
    this.priMinWidget.style.width = this.defInputBoxWidth
    // c.appendChild(this.priMinWidget);
    var a = n.insertCell(1)
    a.style.borderStyle = f
    a.vAlign = 'top'
    this.priSliderCanvas = document.createElement('CANVAS')
    this.priSliderCanvas.id = p + '-SLIDER-CANVAS'
    this.priSliderCanvas.width = this.defSliderWidth
    this.priSliderCanvas.height = this.defSliderHeight
    a.appendChild(this.priSliderCanvas)
    var m = document.createElement('DIV')
    if (Math.round(window.devicePixelRatio * 100 == 100)) {
      remainingWidth =
        this.priSliderCanvas.width -
        this.defSliderSpacing[0] -
        this.defSliderSpacing[1]
    } else {
      remainingWidth = window.innerWidth - 800
    }
    m.style.width =
      (remainingWidth =
        this.priSliderCanvas.width -
        this.defSliderSpacing[0] -
        this.defSliderSpacing[1]) +
      // remainingWidth
      // 700 // changes slider width
      'px'
    m.id = p + '-SLIDER_REGION'
    a.appendChild(m)
    this.priSlider = $('#' + m.id).slider({
      range: 'max',
      range: 'min',
      step: b[2],
      slide: function (r, s) {
        g.priValueWidget.value = s.value.toFixed(k)
        g.onChange(g.getValue())
      },
    })
    this.priSlider.css({ height: '0.7em' })
    this.priSlider.position({
      of: $('#' + this.priSliderCanvas.id),
      my: 'left top',
      at: 'left top',
      offset: '10 5',
      collision: 'none none',
    })
    var q = n.insertCell(2)
    q.style.borderStyle = f
    q.vAlign = 'top'
    q.style.width = this.defInputBoxWidth
    this.priMaxWidget.style.width = this.defInputBoxWidth
    // q.appendChild(this.priMaxWidget);
    this.priMaxWidget.onchange = function () {
      g.setRange(g.priMinWidget.value, g.priMaxWidget.value)
    }
    this.priMinWidget.onchange = function () {
      g.setRange(g.priMinWidget.value, g.priMaxWidget.value)
    }
    this.priValueWidget.onchange = function () {
      g.setValue(g.priValueWidget.value)
    }
    this.priRange = [b[0], b[1]]
    this.setRange(b[0], b[1])
  }
  this.setValue = function (a) {
    fValue = this.priFuncCheckValue(parseFloat(a))
    this.priSlider.slider('option', 'value', fValue)
    this.priValueWidget.value = this.priSlider
      .slider('option', 'value')
      .toFixed(this.priFix)
    this.onChange(fValue)
  }
  this.setValueNE = function (c) {
    if (c == Infinity) {
      this.priValueWidget.value = '∞'
    } else {
      fValue = parseFloat(c)
      var d = this.priSlider.slider('option', 'min'),
        b = this.priSlider.slider('option', 'max')
      var a = false
      if (fValue < d) {
        d = fValue
        a = true
      }
      if (fValue > b) {
        b = fValue
        a = true
      }
      if (a) {
        this.setRangeNE(d, b)
      }
      this.priSlider.slider('option', 'value', fValue)
      this.priValueWidget.value = this.priSlider
        .slider('option', 'value')
        .toFixed(this.priFix)
    }
  }
  this.getValue = function () {
    return parseFloat(this.priValueWidget.value)
  }
  this.getRange = function () {
    return [
      parseFloat(this.priMinWidget.value),
      parseFloat(this.priMaxWidget.value),
    ]
  }
  this.setRange = function (c, a) {
    var b = parseFloat(c)
    if (b < this.priRange[0]) {
      b = this.priRange[0]
    }
    b = b.toFixed(this.priFix)
    this.priMinWidget.value = b
    this.priSlider.slider('option', 'min', parseFloat(b))
    b = parseFloat(a)
    if (b > this.priRange[1]) {
      b = this.priRange[1]
    }
    b = b.toFixed(this.priFix)
    this.priMaxWidget.value = b
    this.priSlider.slider('option', 'max', parseFloat(b))
    this.priDrawTick()
    this.setValue(this.getValue())
  }
  this.setRangeNE = function (c, a) {
    var b = parseFloat(c)
    if (b < this.priRange[0]) {
      b = this.priRange[0]
    }
    b = b.toFixed(this.priFix)
    this.priMinWidget.value = b
    this.priSlider.slider('option', 'min', parseFloat(b))
    b = parseFloat(a)
    if (b > this.priRange[1]) {
      b = this.priRange[1]
    }
    b = b.toFixed(this.priFix)
    this.priMaxWidget.value = b
    this.priSlider.slider('option', 'max', parseFloat(b))
    this.priDrawTick()
  }
  this.setTick = function (a) {
    this.priTickList = a
    this.priDrawTick()
  }
  this.disableMin = function () {
    this.priMinWidget.disabled = true
  }
  this.disableMax = function () {
    this.priMaxWidget.disabled = true
  }
  this.onChange = function (a) { }
  this.extraWidget = document.createElement('label')
  this.defTickFontSize = 10
  this.defSliderHeight = 35
  this.defSliderWidth = 270
  this.defSliderSpacing = [10, 15]
  this.defInputBoxWidth = '50px'
  this.priMinWidget = document.createElement('INPUT')
  this.priMaxWidget = document.createElement('INPUT')
  this.priValueWidget = document.createElement('INPUT')
  this.priSlider
  this.priSliderCanvas
  this.priFix
  this.priRange
  this.priTickList = []
  this.priFuncCheckValue = function (a) {
    if (a < this.priSlider.slider('option', 'min')) {
      a = this.priSlider.slider('option', 'min')
    }
    if (a > this.priSlider.slider('option', 'max')) {
      a = this.priSlider.slider('option', 'max')
    }
    return a
  }
  this.priDrawTick = function () {
    var b = this.priSliderCanvas.getContext('2d')
    // b.font = this.defTickFontSize + "px Arial";             //font size of ticks
    b.font = 15 + 'px Arial'
    b.clearRect(0, 0, this.priSliderCanvas.width, this.priSliderCanvas.height)
    var e = this.priSlider.width(),
      h = this.defSliderSpacing[0] + 2
    if (this.priTickList.length > 0) {
      var a = this.getRange(),
        g = a[1] - a[0]
      for (var d = 0; d < this.priTickList.length; ++d) {
        if (this.priTickList[d][0] >= a[0] && this.priTickList[d][0] <= a[1]) {
          var c = (e * (this.priTickList[d][0] - a[0])) / g + h
          this.priDrawLine(b, c, this.priTickList[d][1])
        }
      }
    } else {
      var f = e / 10
      for (var d = 1; d < 10; ++d) {
        var c = d * f + h
        this.priDrawLine(b, c, '')
      }
    }
  }
  this.priDrawLine = function (b, c, a) {
    b.beginPath()
    var d = this.priSliderCanvas.height
    if (a != '') {
      var e = b.measureText(a)
      b.fillText(a, c - e.width / 2, d)
      d -= this.defTickFontSize
    }
    b.moveTo(c, 0)
    b.lineTo(c, d)
    b.strokeStyle = '#AAAAAA'
    b.stroke()
  }
}
function VIML_SliderAnimator(a) {
  this.createUI = function (l, e, h) {
    this.priAnimeStep = parseFloat(e)
    this.priInterval = h
    var f = this
    var g = document.getElementById(l)
    var d = document.createElement('TABLE')
    g.appendChild(d)
    d.style.width = '100%'
    var m = d.insertRow(0)
    m.style.border = 0
    var c = m.insertCell(0)
    this.priWButton = document.createElement('button')
    c.appendChild(this.priWButton)
    this.priWButton.innerHTML = 'Start Animation'
    this.priWButton.blur()
    this.priWMode = document.createElement('select')
    c.appendChild(this.priWMode)
    var k = document.createElement('option')
    k.text = 'Auto restart'
    k.value = 1
    this.priWMode.add(k, null)
    var j = document.createElement('option')
    j.text = 'Loop'
    j.value = 2
    this.priWMode.add(j, null)
    this.priWMode.value = 2
    var b = m.insertCell(1)
    b.innerHTML = 'Speed:&nbsp;&nbsp;'
    var n = m.insertCell(2)
    var i = document.createElement('div')
    i.id = l + '-speed-controller'
    i.style.width = '100px'
    n.appendChild(i)
    this.priRange = this.priSlider.getRange()
    this.priWSlider = $('#' + i.id).slider({
      range: 'max',
      range: 'min',
      min: (this.priRange[1] - this.priRange[0]) / 500,
      max: (this.priRange[1] - this.priRange[0]) / 50,
      value: this.priAnimeStep,
      step: (this.priRange[1] - this.priRange[0]) / 1000,
      change: function (o, p) {
        f.priAnimeStep = p.value
      },
    })
    this.priWButton.onclick = function () {
      if (f.priTimerHandle == 0) {
        f.start()
      } else {
        f.stop()
      }
    }
  }
  this.start = function () {
    this.priCurrentValue = this.priSlider.getValue()
    this.priRange = this.priSlider.getRange()
    var b = this
    this.priTimerHandle = setInterval(function () {
      b.priTimer()
    }, b.vInterval)
    this.priWButton.innerHTML = 'Stop Animation'
    this.priWMode.disabled = true
  }
  this.stop = function () {
    clearInterval(this.priTimerHandle)
    this.priTimerHandle = 0
    this.priWButton.innerHTML = 'Start Animation'
    this.priWMode.disabled = false
  }
  this.priSlider = a
  this.priAnimeStep
  this.priInterval
  this.priTimerHandle = 0
  this.priWButton
  this.priWMode
  this.priWSlider
  this.priCurrentValue
  this.priRange
  this.priDirection = 1
  this.priTimer = function () {
    switch (parseInt(this.priWMode.value)) {
      case 1:
        this.priCurrentValue += this.priAnimeStep
        if (this.priCurrentValue > this.priRange[1]) {
          this.priCurrentValue = this.priRange[0]
        }
        break
      case 2:
        this.priCurrentValue += this.priAnimeStep * this.priDirection
        if (
          this.priCurrentValue > this.priRange[1] ||
          this.priCurrentValue < this.priRange[0]
        ) {
          this.priDirection = -this.priDirection
          this.priCurrentValue += this.priAnimeStep * this.priDirection
        }
        break
      default:
        this.priCurrentValue += this.priAnimeStep
        if (this.priCurrentValue > this.priRange[1]) {
          this.priSlider.setValue(this.priRange[1])
          this.stop()
          return
        }
        break
    }
    this.priSlider.setValue(this.priCurrentValue)
  }
}
