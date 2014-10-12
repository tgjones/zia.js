document.addEventListener('DOMContentLoaded', function () {
    
  var canvas = document.getElementById('mainCanvas');
  
  var graphicsDevice = new Zia.GraphicsDevice(canvas);

  var program = new Zia.BasicProgram(graphicsDevice, {
    textureEnabled: true
  });

  var texture = Zia.Texture.createFromImagePath(graphicsDevice, '../assets/textures/UV_Grid_Sm.jpg');

  var vertexBuffer = new Zia.VertexBuffer(graphicsDevice,
    Zia.BoxPrimitive.vertexDeclaration);
  vertexBuffer.setData(Zia.BoxPrimitive.vertices);

  var indexBuffer = new Zia.IndexBuffer(graphicsDevice);
  indexBuffer.setData(Zia.BoxPrimitive.indices);

  var projectionMatrix = new Zia.Matrix4().makePerspective(45,
    graphicsDevice.viewport.aspectRatio, 0.1, 100);
  var viewMatrix = new Zia.Matrix4().makeTranslation(0, 0, -6);
  var modelMatrix = new Zia.Matrix4().identity();

  var lastCubeUpdateTime, cubeRotation = 0;
  var rotationAxis = new Zia.Vector3(1, 0, 1).normalize();
  var modelViewMatrix = new Zia.Matrix4();

  program.view = viewMatrix;
  program.projection = projectionMatrix;
  program.texture = texture;
  
  graphicsDevice.setIndexBuffer(indexBuffer);
  graphicsDevice.setVertexBuffers([vertexBuffer]);

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

}, false);