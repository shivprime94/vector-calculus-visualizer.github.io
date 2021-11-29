function VIML_Board3D(i, a) {
  var h = this
  h.board = JXG.JSXGraph.initBoard(i, {
    boundingbox: a,
    axis: false,
    grid: false,
    keepaspectratio: true,
    showCopyright: false,
    showNavigation: false,
  })
  h.m_delta = 0.1
  h.m_vLambdaScale = 5
  h.m_bTraceOn = false
  h.m_vTraceInterval = 2
  h.m_vAxisXLength = 7
  h.m_vAxisYLength = 3
  h.m_vAxisZLength = 7
  var d = [-1, 0, 0]
  var c = new Array()
  var e = null
  this.mProjection = new CMatrix4()
  this.cCamera = new CCamera()
  h.InitBoard = function () {
    h.mProjection.SetPerspective(45, 1, 0.1, 10)
    h.cCamera.SetCamera(
      new CVector3(-20, 10, -10),
      new CVector3(0, 0, 0),
      new CVector3(0, 1, 0)
    )
    h.cCamera.m_vInitCenter = new CVector3(0, 0, 0)
    h.cCamera.UpdateMatrix()
    j()
    f()
  }
  h.LoadPoints = function (l) {
    var m = 0
    var n = h.ProjectPoint(l[m][0], l[m][1], l[m][2])
    c.push(n)
    for (m = 1; m < l.length; m++) {
      n = h.ProjectPoint(l[m][0], l[m][1], l[m][2])
      c.push(n)
      v3Dline = h.board.createElement('line', [c[m - 1], c[m]], {
        fixed: true,
        straightFirst: false,
        straightLast: false,
        strokeColor: 'green',
        strokeWidth: '3',
      })
      if (h.m_bTraceOn && m % h.m_vTraceInterval == 0) {
        var o = h.ProjectPoint(0, 0, l[m][2])
        h.board.createElement('line', [n, o], {
          fixed: true,
          straightFirst: false,
          straightLast: false,
          strokeColor: 'gray',
          strokeWidth: '1',
        })
      }
    }
  }
  h.UpdatePoints = function (l) {
    b()
    g()
    h.LoadPoints(l)
  }
  h.UpdateSinglePoint = function (l, n, m) {}
  h.ProjectPoint = function (l, o, n) {
    var m = this.mProjection
      .GetMultiply(this.cCamera.m_mLookat)
      .GetDotVector(new CVector4(l, o, n, 1))
    return [m.m_fV[0] / m.m_fV[3], m.m_fV[1] / m.m_fV[3]]
  }
  h.onKey = function () {}
  var g = function () {
    h.board = JXG.JSXGraph.initBoard(i, {
      boundingbox: a,
      axis: false,
      grid: false,
      keepaspectratio: true,
      showCopyright: false,
      showNavigation: false,
    })
    j()
    f()
  }
  var b = function () {
    c = []
    JXG.JSXGraph.freeBoard(h.board)
  }
  var f = function () {
    var o = h.ProjectPoint(0, 0, 0.25 * h.m_vLambdaScale)
    var n = h.ProjectPoint(0, 0, 0.5 * h.m_vLambdaScale)
    var m = h.ProjectPoint(0, 0, 0.75 * h.m_vLambdaScale)
    var l = h.ProjectPoint(0, 0, 1 * h.m_vLambdaScale)
    h.board.createElement('point', o, {
      fixed: true,
      size: 0.3,
      strokeColor: 'black',
      fillColor: 'black',
      name: 'λ/4',
    })
    h.board.createElement('point', n, {
      fixed: true,
      size: 0.3,
      strokeColor: 'black',
      fillColor: 'black',
      name: 'λ/2',
    })
    h.board.createElement('point', m, {
      fixed: true,
      size: 0.3,
      strokeColor: 'black',
      fillColor: 'black',
      name: '3λ/4',
    })
    h.board.createElement('point', l, {
      fixed: true,
      size: 0.3,
      strokeColor: 'black',
      fillColor: 'black',
      name: 'λ',
    })
  }
  var k = function () {
    var u = 1
    var t = h.ProjectPoint(0, 0, 0)
    var m = h.ProjectPoint(u, 0, 0)
    var q = h.ProjectPoint(u, u, 0)
    var o = h.ProjectPoint(0, u, 0)
    var n = h.ProjectPoint(0, u, u)
    var r = h.ProjectPoint(0, 0, u)
    var l = h.ProjectPoint(u, 0, u)
    var p = h.ProjectPoint(u, u, u)
    h.board.createElement('point', t, {
      fixed: true,
      style: 3,
      name: ' o ',
      strokeColor: 'blue',
    })
    h.board.createElement('point', m, {
      fixed: true,
      style: 3,
      name: 'x  ',
      strokeColor: 'blue',
    })
    h.board.createElement('point', q, {
      fixed: true,
      style: 3,
      name: 'xy ',
      strokeColor: 'blue',
    })
    h.board.createElement('point', o, {
      fixed: true,
      style: 3,
      name: ' y ',
      strokeColor: 'blue',
    })
    h.board.createElement('point', n, {
      fixed: true,
      style: 3,
      name: ' yz',
      strokeColor: 'blue',
    })
    h.board.createElement('point', r, {
      fixed: true,
      style: 3,
      name: '  z',
      strokeColor: 'blue',
    })
    h.board.createElement('point', l, {
      fixed: true,
      style: 3,
      name: 'x z',
      strokeColor: 'blue',
    })
    h.board.createElement('point', p, {
      fixed: true,
      style: 3,
      name: 'xyz',
      strokeColor: 'blue',
    })
    h.board.createElement('line', [t, m], {
      fixed: true,
      strokeColor: '#0bf5ec',
      straightFirst: false,
      straightLast: false,
      name: '',
      withLabel: false,
    })
    h.board.createElement('line', [t, o], {
      fixed: true,
      strokeColor: '#0bf5ec',
      straightFirst: false,
      straightLast: false,
      name: '',
      withLabel: false,
    })
    h.board.createElement('line', [t, r], {
      fixed: true,
      strokeColor: '#0bf5ec',
      straightFirst: false,
      straightLast: false,
      name: '',
      withLabel: false,
    })
    h.board.createElement('line', [q, p], {
      fixed: true,
      strokeColor: '#0bf5ec',
      straightFirst: false,
      straightLast: false,
      name: '',
      withLabel: false,
    })
    h.board.createElement('line', [n, p], {
      fixed: true,
      strokeColor: '#0bf5ec',
      straightFirst: false,
      straightLast: false,
      name: '',
      withLabel: false,
    })
    h.board.createElement('line', [l, p], {
      fixed: true,
      strokeColor: '#0bf5ec',
      straightFirst: false,
      straightLast: false,
      name: '',
      withLabel: false,
    })
    h.board.createElement('line', [o, q], {
      fixed: true,
      strokeColor: '#0bf5ec',
      straightFirst: false,
      straightLast: false,
      name: '',
      withLabel: false,
    })
    h.board.createElement('line', [o, n], {
      fixed: true,
      strokeColor: '#0bf5ec',
      straightFirst: false,
      straightLast: false,
      name: '',
      withLabel: false,
    })
    h.board.createElement('line', [l, m], {
      fixed: true,
      strokeColor: '#0bf5ec',
      straightFirst: false,
      straightLast: false,
      name: '',
      withLabel: false,
    })
    h.board.createElement('line', [l, r], {
      fixed: true,
      strokeColor: '#0bf5ec',
      straightFirst: false,
      straightLast: false,
      name: '',
      withLabel: false,
    })
    h.board.createElement('line', [n, r], {
      fixed: true,
      strokeColor: '#0bf5ec',
      straightFirst: false,
      straightLast: false,
      name: '',
      withLabel: false,
    })
    h.board.createElement('line', [q, m], {
      fixed: true,
      strokeColor: '#0bf5ec',
      straightFirst: false,
      straightLast: false,
      name: '',
      withLabel: false,
    })
  }
  var j = function () {
    var m = h.ProjectPoint(h.m_vAxisXLength, 0, 0)
    var l = h.ProjectPoint(-h.m_vAxisXLength, 0, 0)
    var o = h.ProjectPoint(0, h.m_vAxisYLength, 0)
    var n = h.ProjectPoint(0, -h.m_vAxisYLength, 0)
    var q = h.ProjectPoint(0, 0, h.m_vAxisZLength)
    var p = h.ProjectPoint(0, 0, -h.m_vAxisZLength)
    h.board.createElement('line', [m, l], {
      strokeColor: '#999999',
      firstArrow: true,
      name: 'x',
      withLabel: true,
      fixed: true,
      straightFirst: false,
      straightLast: false,
    })
    h.board.createElement('line', [o, n], {
      strokeColor: '#999999',
      firstArrow: true,
      name: 'y',
      withLabel: true,
      fixed: true,
      straightFirst: false,
      straightLast: false,
    })
    h.board.createElement('line', [q, p], {
      strokeColor: '#999999',
      firstArrow: true,
      name: 'z',
      withLabel: true,
      fixed: true,
      straightFirst: false,
      straightLast: false,
    })
  }
  h.KeyMapping = function (l) {
    var m
    if (!l) {
      l = window.event
    }
    if (l.which) {
      m = l.which
    } else {
      if (l.keyCode) {
        m = l.keyCode
      }
    }
    switch (m) {
      case 38:
        h.cCamera.CenterPitch(0.5)
        h.cCamera.UpdateMatrix()
        break
      case 40:
        h.cCamera.CenterPitch(-0.5)
        h.cCamera.UpdateMatrix()
        break
      case 37:
        h.cCamera.CenterYaw(0.5)
        h.cCamera.UpdateMatrix()
        break
      case 39:
        h.cCamera.CenterYaw(-0.5)
        h.cCamera.UpdateMatrix()
        break
      case 33:
        h.cCamera.m_vEye.Add(h.cCamera.m_vDir)
        h.cCamera.m_vCenter.Add(h.cCamera.m_vDir)
        h.cCamera.UpdateMatrix()
        break
      case 34:
        h.cCamera.m_vEye.Sub(h.cCamera.m_vDir)
        h.cCamera.m_vCenter.Sub(h.cCamera.m_vDir)
        h.cCamera.UpdateMatrix()
        break
      case 35:
        h.cCamera.CenterRoll(0.5)
        h.cCamera.UpdateMatrix()
        break
      case 36:
        h.cCamera.CenterRoll(-0.5)
        h.cCamera.UpdateMatrix()
        break
    }
    h.board.update()
    h.onKey()
  }
  document.onkeydown = h.KeyMapping
}
