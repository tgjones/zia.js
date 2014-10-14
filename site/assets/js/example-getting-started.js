document.addEventListener('DOMContentLoaded', function () {
    
  var canvas = document.getElementById('mainCanvas');
  
  var graphicsDevice = new Zia.GraphicsDevice(canvas);

  var program = new Zia.BasicProgram(graphicsDevice, {
    vertexColorEnabled: true
  });

  var pyramidVertexPositionBuffer = new Zia.VertexBuffer(graphicsDevice,
    new Zia.VertexDeclaration(
    [
      new Zia.VertexElement("aVertexPosition", 3, 0)
    ]),
    new Float32Array(
    [
      // Front face
       0.0,  1.0,  0.0,
      -1.0, -1.0,  1.0,
       1.0, -1.0,  1.0,

      // Right face
       0.0,  1.0,  0.0,
       1.0, -1.0,  1.0,
       1.0, -1.0, -1.0,

      // Back face
       0.0,  1.0,  0.0,
       1.0, -1.0, -1.0,
      -1.0, -1.0, -1.0,

      // Left face
       0.0,  1.0,  0.0,
      -1.0, -1.0, -1.0,
      -1.0, -1.0,  1.0
    ]));

  var pyramidVertexColorBuffer = new Zia.VertexBuffer(graphicsDevice,
    new Zia.VertexDeclaration(
    [
      new Zia.VertexElement("aVertexColor", 4, 0)
    ]),
    new Float32Array(
    [
      // Front face
      1.0, 0.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0,
      0.0, 0.0, 1.0, 1.0,

      // Right face
      1.0, 0.0, 0.0, 1.0,
      0.0, 0.0, 1.0, 1.0,
      0.0, 1.0, 0.0, 1.0,

      // Back face
      1.0, 0.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0,
      0.0, 0.0, 1.0, 1.0,

      // Left face
      1.0, 0.0, 0.0, 1.0,
      0.0, 0.0, 1.0, 1.0,
      0.0, 1.0, 0.0, 1.0
    ]));

  var projectionMatrix = new Zia.Matrix4().makePerspective(45,
    graphicsDevice.viewport.aspectRatio, 0.1, 100);
  var viewMatrix = new Zia.Matrix4().makeTranslation(0, 0, -4);

  var pyramidModelMatrix = new Zia.Matrix4().identity();

  var pyramidRotationAxis = new Zia.Vector3(0, 1, 0);

  var rotationPyramid = 0;

  function drawScene() {
    if (graphicsDevice.resize()) {
      projectionMatrix.makePerspective(45,
        graphicsDevice.viewport.aspectRatio,
        0.1, 100);
    }

    graphicsDevice.clear(
      Zia.ClearOptions.ColorBuffer | Zia.ClearOptions.DepthBuffer,
      new Zia.Color4(0, 0, 0, 1), 1);

    program.view = viewMatrix;
    program.projection = projectionMatrix;

    // Draw pyramid.

    graphicsDevice.setIndexBuffer(null);
    graphicsDevice.setVertexBuffers(
    [
      pyramidVertexPositionBuffer,
      pyramidVertexColorBuffer
    ]);

    pyramidModelMatrix.makeRotationAxis(pyramidRotationAxis,
      Zia.Math.degToRad(rotationPyramid));

    program.model = pyramidModelMatrix;
    program.apply();

    graphicsDevice.drawPrimitives(
      Zia.PrimitiveType.TriangleList,
      0, 12);
  }

  var lastTime = 0;

  function animate() {
    var timeNow = new Date().getTime();
    if (lastTime != 0) {
      var elapsed = timeNow - lastTime;
      rotationPyramid += (90 * elapsed) / 1000.0;
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