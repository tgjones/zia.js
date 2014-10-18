document.addEventListener('DOMContentLoaded', function () {
    
  var canvas = document.getElementById('mainCanvas');
  
  var graphicsDevice = new Zia.GraphicsDevice(canvas);

  var program = new Zia.BasicProgram(graphicsDevice, {
    textureEnabled: true,
    lightingEnabled: true,
  });
  program.enableDefaultLighting();

  var texture = Zia.Texture.createFromImagePath(graphicsDevice,
    '../assets/textures/UV_Grid_Sm.jpg');
  program.texture = texture;

  var model;

  function loadModel(primitiveFunc) {
    model = Zia.GeometricPrimitive.convertToModel(
      graphicsDevice, Zia.GeometricPrimitive[primitiveFunc]());

    for (var i = 0; i < model.meshes.length; i++) {
      var mesh = model.meshes[i];
      for (var j = 0; j < mesh.meshParts.length; j++) {
        mesh.meshParts[j].program = program;
      }
    }
  }

  loadModel('createTeapot');

  var projectionMatrix = new Zia.Matrix4().makePerspective(45,
    graphicsDevice.viewport.aspectRatio, 0.1, 100);
  
  var viewMatrix = new Zia.Matrix4().makeLookAt(
    new Zia.Vector3(1, 1, -1.5),
    new Zia.Vector3(0, 0, 0),
    new Zia.Vector3(0, 1, 0));

  var modelMatrix = new Zia.Matrix4().identity();

  var rotationAxis = new Zia.Vector3(0, 1, 0);
  var rotationAngle = 0;

  function drawScene() {
    if (graphicsDevice.resize()) {
      projectionMatrix.makePerspective(45,
        graphicsDevice.viewport.aspectRatio,
        0.1, 100);
    }

    graphicsDevice.clear(
      Zia.ClearOptions.ColorBuffer | Zia.ClearOptions.DepthBuffer,
      new Zia.Color4(0, 0, 0, 1), 1);

    modelMatrix.makeRotationAxis(rotationAxis, Zia.Math.degToRad(rotationAngle));
    model.draw(modelMatrix, viewMatrix, projectionMatrix);
  }

  var lastTime = 0;

  function animate() {
    var timeNow = new Date().getTime();
    if (lastTime != 0) {
      var elapsed = timeNow - lastTime;
      rotationAngle += (30 * elapsed) / 1000.0;
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