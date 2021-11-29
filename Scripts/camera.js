function CCamera() {
  this.m_vEye = new CVector3(0, 0, 10)
  this.m_vCenter = new CVector3(0, 0, 8)
  this.m_vUpper = new CVector3(0, 1, 0)
  this.m_vSide = new CVector3(0, 0, 0)
  this.m_vDir = new CVector3(0, 0, 0)
  this.m_vInitCenter = new CVector3(0, 0, 8)
  this.m_mLookat = new CMatrix4()
  this.m_mRotate = new CMatrix4()
  this.m_vDir.SetSub(this.m_vCenter, this.m_vEye)
  this.m_vSide.SetCross(this.m_vDir, this.m_vUpper)
  this.m_vDir.Normalize()
  this.m_vUpper.Normalize()
  this.m_vSide.Normalize()
  this.m_mLookat.SetLookAt(this.m_vEye, this.m_vCenter, this.m_vUpper)
  this.UpdatePrivate = function () {
    this.m_vDir.SetSub(this.m_vCenter, this.m_vEye)
    this.m_vSide.SetCross(this.m_vDir, this.m_vUpper)
    this.m_vDir.Normalize()
    this.m_vUpper.Normalize()
    this.m_vSide.Normalize()
  }
  this.UpdateMatrix = function () {
    this.m_mLookat.SetLookAt(this.m_vEye, this.m_vCenter, this.m_vUpper)
  }
  this.SetCamera = function (c, a, b) {
    this.m_vEye.SetVec(c)
    this.m_vCenter.SetVec(a)
    this.m_vUpper.SetVec(b)
    this.UpdatePrivate()
  }
  this.SetMatrix = function (a) {
    this.m_mLookat.SetMat(a)
  }
  this.GetDistance = function () {
    var a = this.m_vCenter.GetSub(this.m_vEye)
    return a.Mag()
  }
  this.EyePitch = function (a) {
    var b
    this.m_mRotate.SetAngleMatrix(a, this.m_vSide)
    b = this.m_mRotate.GetDotVector3(this.m_vDir)
    this.m_vDir.SetVec(b)
    this.m_vUpper.SetCross(this.m_vSide, this.m_vDir)
    this.m_vUpper.Normalize()
    this.m_vCenter.SetAdd(this.m_vEye, this.m_vDir)
  }
  this.EyeYaw = function (a) {
    var b
    this.m_mRotate.SetAngleMatrix(a, this.m_vUpper)
    b = this.m_mRotate.GetDotVector3(this.m_vDir)
    this.m_vDir.SetVec(b)
    this.m_vSide.SetCross(this.m_vDir, this.m_vUpper)
    this.m_vCenter.SetAdd(this.m_vEye, this.m_vDir)
  }
  this.EyeRoll = function (a) {
    var b
    this.m_mRotate.SetAngleMatrix(a, this.m_vDir)
    b = this.m_mRotate.GetDotVector3(this.m_vUpper)
    this.m_vUpper.SetVec(b)
    this.m_vSide.SetCross(this.m_vDir, this.m_vUpper)
  }
  this.PanX = function (a) {
    var b = this.m_vSide.GetScale(a)
    this.m_vEye.Add(b)
    this.m_vCenter.Add(b)
  }
  this.PanY = function (a) {
    var b = this.m_vUpper.GetScale(a)
    this.m_vEye.Add(b)
    this.m_vCenter.Add(b)
  }
  this.PanZ = function (a) {
    var b = this.m_vDir.GetScale(a)
    this.m_vEye.Add(b)
    this.m_vCenter.Add(b)
  }
  this.PanXWithSC = function (a) {
    var b = this.m_vSide.GetScale(a)
    this.m_vEye.Add(b)
    this.m_vCenter.Add(b)
    this.m_vInitCenter.Add(b)
  }
  this.PanYWithSC = function (a) {
    var b = this.m_vUpper.GetScale(a)
    this.m_vEye.Add(b)
    this.m_vCenter.Add(b)
    this.m_vInitCenter.Add(b)
  }
  this.PanZWithSC = function (a) {
    var b = this.m_vDir.GetScale(a)
    this.m_vEye.Add(b)
    this.m_vCenter.Add(b)
    this.m_vInitCenter.Add(b)
  }
  this.EyePanX = function (a) {
    var b = this.m_vSide.GetScale(a)
    this.m_vEye.Add(b)
  }
  this.EyePanY = function (a) {
    var b = this.m_vUpper.GetScale(a)
    this.m_vEye.Add(b)
  }
  this.EyePanZ = function (a) {
    var b = this.m_vDir.GetScale(a)
    this.m_vEye.Add(b)
  }
  this.CenterPanX = function (a) {
    var b = this.m_vSide.GetScale(a)
    this.m_vCenter.Add(b)
  }
  this.CenterPanY = function (a) {
    var b = this.m_vUpper.GetScale(a)
    this.m_vCenter.Add(b)
  }
  this.CenterPanZ = function (a) {
    var b = this.m_vDir.GetScale(a)
    this.m_vCenter.Add(b)
  }
  this.CenterPitch = function (a) {
    var c
    this.m_mRotate.SetAngleMatrix(a, this.m_vSide)
    c = this.m_mRotate.GetDotVector3(this.m_vDir)
    this.m_vDir.SetVec(c)
    this.m_vDir.Normalize()
    this.m_vUpper.SetCross(this.m_vSide, this.m_vDir)
    this.m_vUpper.Normalize()
    c.SetSub(this.m_vInitCenter, this.m_vEye)
    var b = this.m_vDir.GetScale(c.Mag())
    this.m_vEye.SetSub(this.m_vInitCenter, b)
    this.m_vCenter.SetAdd(this.m_vEye, this.m_vDir)
  }
  this.CenterYaw = function (a) {
    var c
    this.m_mRotate.SetAngleMatrix(a, this.m_vUpper)
    c = this.m_mRotate.GetDotVector3(this.m_vDir)
    this.m_vDir.SetVec(c)
    this.m_vDir.Normalize()
    this.m_vSide.SetCross(this.m_vDir, this.m_vUpper)
    this.m_vSide.Normalize()
    c.SetSub(this.m_vInitCenter, this.m_vEye)
    var b = this.m_vDir.GetScale(c.Mag())
    this.m_vEye.SetSub(this.m_vInitCenter, b)
    this.m_vCenter.SetAdd(this.m_vEye, this.m_vDir)
  }
  this.CenterRoll = function (a) {
    var b
    this.m_mRotate.SetAngleMatrix(a, this.m_vDir)
    b = this.m_mRotate.GetDotVector3(this.m_vUpper)
    this.m_vUpper.SetVec(b)
    this.m_vSide.SetCross(this.m_vDir, this.m_vUpper)
  }
  this.Printf = function () {
    var a
    a = '<br> vEye = '
    a += this.m_vEye.Printf()
    a += '<br> vCenter = '
    a += this.m_vCenter.Printf()
    a += '<br> vUpper = '
    a += this.m_vUpper.Printf()
    a += '<br> vSide = '
    a += this.m_vSide.Printf()
    a += '<br> vDir = '
    a += this.m_vDir.Printf()
    a += '<br> vLookat = '
    a += this.m_mLookat.Printf()
    return a
  }
}
