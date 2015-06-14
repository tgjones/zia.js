document.addEventListener('DOMContentLoaded', function () {

  var canvas = document.getElementById('mainCanvas');

  var graphicsDevice = new Zia.GraphicsDevice(canvas);

  var program = new Zia.BasicProgram(graphicsDevice, {
    lightingEnabled: true
  });
  program.diffuseColor = new Zia.Vector3(0, 1, 1);
  program.enableDefaultLighting();

  var cubeModel = Zia.GeometricPrimitive.convertToModel(
    graphicsDevice, Zia.GeometricPrimitive.createCube());

  for (var i = 0; i < cubeModel.meshes.length; i++) {
    var mesh = cubeModel.meshes[i];
    for (var j = 0; j < mesh.meshParts.length; j++) {
      mesh.meshParts[j].program = program;
    }
  }

  var projectionMatrix = Zia.Matrix4.createPerspectiveFieldOfView(
    Zia.MathUtil.PI_OVER_FOUR, graphicsDevice.viewport.aspectRatio, 0.1, 100,
    new Zia.Matrix4());
  var viewMatrix = Zia.Matrix4.createLookAt(
    new Zia.Vector3(0, 1, -2),
    new Zia.Vector3(0, 0, 0),
    new Zia.Vector3(0, 1, 0),
    new Zia.Matrix4());
  var modelMatrix = new Zia.Matrix4();

  var rotationAxis = new Zia.Vector3(0, 1, 0);
  var rotationAngle = 0;

  function drawScene() {
    if (graphicsDevice.resize()) {
      Zia.Matrix4.createPerspectiveFieldOfView(
        Zia.MathUtil.PI_OVER_FOUR, graphicsDevice.viewport.aspectRatio, 0.1, 100,
        projectionMatrix);
    }

    graphicsDevice.clear(
      Zia.ClearOptions.ColorBuffer | Zia.ClearOptions.DepthBuffer,
      new Zia.Color4(0, 0, 0, 1), 1);

    Zia.Matrix4.createFromAxisAngle(
      rotationAxis,
      Zia.MathUtil.degToRad(rotationAngle),
      modelMatrix);

    cubeModel.draw(modelMatrix, viewMatrix, projectionMatrix);
  }

  var lastTime = 0;

  function animate() {
    var timeNow = new Date().getTime();
    if (lastTime != 0) {
      var elapsed = timeNow - lastTime;
      rotationAngle += (50 * elapsed) / 1000.0;
    }
    lastTime = timeNow;
  }

  function tick() {
    requestAnimationFrame(tick);
    drawScene();
    animate();
  }

  tick();

}, false);
