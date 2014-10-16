document.addEventListener('DOMContentLoaded', function () {
    
  var canvas = document.getElementById('mainCanvas');
  
  var graphicsDevice = new Zia.GraphicsDevice(canvas);

  var program = new Zia.BasicProgram(graphicsDevice, {
    textureEnabled: true,
    lightingEnabled: true
  });
  program.enableDefaultLighting();

  window.texture = Zia.Texture.createFromImagePath(graphicsDevice,
    '../assets/textures/UV_Grid_Sm.jpg');

  var cubeBuffers = Zia.GeometricPrimitive.createVertexAndIndexBuffers(
    graphicsDevice, Zia.GeometricPrimitive.Cube);

  var projectionMatrix = new Zia.Matrix4().makePerspective(45,
    graphicsDevice.viewport.aspectRatio, 0.1, 100);

  var viewMatrix = new Zia.Matrix4().makeLookAt(
    new Zia.Vector3(0, 0, -4),
    new Zia.Vector3(0, 0, 0),
    new Zia.Vector3(0, 1, 0));

  var modelMatrix = new Zia.Matrix4().identity();

  var lastCubeUpdateTime, cubeRotation = 0;
  var rotationAxis = new Zia.Vector3(1, 0, 1).normalize();
  var modelViewMatrix = new Zia.Matrix4();

  program.view = viewMatrix;
  program.projection = projectionMatrix;
  
  graphicsDevice.setIndexBuffer(cubeBuffers.indexBuffer);
  graphicsDevice.setVertexBuffers([cubeBuffers.vertexBuffer]);

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
    modelViewMatrix.multiplyMatrices(viewMatrix, modelMatrix);

    program.texture = window.texture;
    program.model = modelMatrix;
    program.apply();

    graphicsDevice.drawIndexedPrimitives(
      Zia.PrimitiveType.TriangleList,
      0, 36);

    modelMatrix.elements[12] = 2;
    program.model = modelMatrix;
    program.apply();

    modelMatrix.elements[12] = 0;
    modelMatrix.elements[14] = 2;
    program.model = modelMatrix;
    program.apply();

    graphicsDevice.drawIndexedPrimitives(
      Zia.PrimitiveType.TriangleList,
      0, 36);

    var currentTime = (new Date).getTime();
    if (lastCubeUpdateTime) {
      var delta = currentTime - lastCubeUpdateTime;
      
      cubeRotation += (30 * delta) / 1000.0;
    }
    
    lastCubeUpdateTime = currentTime;

    requestAnimationFrame(drawScene);
  }

  requestAnimationFrame(drawScene);

  var textureFilterSelect = $('#texture-filter');
  textureFilterSelect.change(function() {
    window.texture = Zia.Texture.createFromImagePath(graphicsDevice,
      '../assets/textures/UV_Grid_Sm.jpg',
      { filter: Zia.TextureFilter[textureFilterSelect.val()] });
  });
  textureFilterSelect.change();

}, false);