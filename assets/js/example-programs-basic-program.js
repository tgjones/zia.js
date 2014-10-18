document.addEventListener('DOMContentLoaded', function () {
    
  var canvas = document.getElementById('mainCanvas');
  
  var graphicsDevice = new Zia.GraphicsDevice(canvas);

  var program = new Zia.BasicProgram(graphicsDevice, {
    textureEnabled: true,
    lightingEnabled: true,
    perPixelLightingEnabled: true
  });
  program.enableDefaultLighting();

  var texture = Zia.Texture.createFromImagePath(graphicsDevice,
    '../assets/textures/UV_Grid_Sm.jpg');
  program.texture = texture;

  var cubeModel = Zia.GeometricPrimitive.convertToModel(
    graphicsDevice, Zia.GeometricPrimitive.createTeapot());

  for (var i = 0; i < cubeModel.meshes.length; i++) {
    var mesh = cubeModel.meshes[i];
    for (var j = 0; j < mesh.meshParts.length; j++) {
      mesh.meshParts[j].program = program;
    }
  }

  var projectionMatrix = new Zia.Matrix4().makePerspective(45,
    graphicsDevice.viewport.aspectRatio, 0.1, 100);

  var viewMatrix = new Zia.Matrix4().makeLookAt(
    new Zia.Vector3(1, 1, -1),
    new Zia.Vector3(0, 0, 0),
    new Zia.Vector3(0, 1, 0));

  var modelMatrix = new Zia.Matrix4().identity();

  var lastCubeUpdateTime, cubeRotation = 0;
  var rotationAxis = new Zia.Vector3(1, 0, 1).normalize();
  
  function drawScene() {
    if (graphicsDevice.resize()) {
      projectionMatrix.makePerspective(45,
        graphicsDevice.viewport.aspectRatio,
        0.1, 100);
    }

    graphicsDevice.clear(
      Zia.ClearOptions.ColorBuffer | Zia.ClearOptions.DepthBuffer,
      new Zia.Color4(0, 0, 0, 1), 1);

    modelMatrix.makeRotationAxis(rotationAxis, Zia.Math.degToRad(cubeRotation));

    cubeModel.draw(modelMatrix, viewMatrix, projectionMatrix);

    var currentTime = (new Date).getTime();
    if (lastCubeUpdateTime) {
      var delta = currentTime - lastCubeUpdateTime;
      
      cubeRotation += (10 * delta) / 1000.0;
    }
    
    lastCubeUpdateTime = currentTime;

    requestAnimationFrame(drawScene);
  }

  requestAnimationFrame(drawScene);

}, false);