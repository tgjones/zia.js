document.addEventListener('DOMContentLoaded', function () {
    
  var canvas = document.getElementById('mainCanvas');
  
  var graphicsDevice = new Zia.GraphicsDevice(canvas);

  var program = new Zia.BasicProgram(graphicsDevice, {
    vertexColorEnabled: true,
    lightingEnabled: true
  });
  program.enableDefaultLighting();

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

  var cubeVertexPositionBuffer = new Zia.VertexBuffer(graphicsDevice,
    new Zia.VertexDeclaration(
    [
      new Zia.VertexElement("aVertexPosition", 3, 0)
    ]),
    new Float32Array(
    [
      // Front face
      -1.0, -1.0,  1.0,
       1.0, -1.0,  1.0,
       1.0,  1.0,  1.0,
      -1.0,  1.0,  1.0,

      // Back face
      -1.0, -1.0, -1.0,
      -1.0,  1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0, -1.0, -1.0,

      // Top face
      -1.0,  1.0, -1.0,
      -1.0,  1.0,  1.0,
       1.0,  1.0,  1.0,
       1.0,  1.0, -1.0,

      // Bottom face
      -1.0, -1.0, -1.0,
       1.0, -1.0, -1.0,
       1.0, -1.0,  1.0,
      -1.0, -1.0,  1.0,

      // Right face
       1.0, -1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0,  1.0,  1.0,
       1.0, -1.0,  1.0,

      // Left face
      -1.0, -1.0, -1.0,
      -1.0, -1.0,  1.0,
      -1.0,  1.0,  1.0,
      -1.0,  1.0, -1.0
    ]));

  var cubeColors = [
    [1.0, 0.0, 0.0, 1.0], // Front face
    [1.0, 1.0, 0.0, 1.0], // Back face
    [0.0, 1.0, 0.0, 1.0], // Top face
    [1.0, 0.5, 0.5, 1.0], // Bottom face
    [1.0, 0.0, 1.0, 1.0], // Right face
    [0.0, 0.0, 1.0, 1.0]  // Left face
  ];

  var unpackedCubeColors = [];
  for (var i in cubeColors) {
    var color = cubeColors[i];
    for (var j = 0; j < 4; j++) {
      unpackedCubeColors = unpackedCubeColors.concat(color);
    }
  }

  var cubeVertexColorBuffer = new Zia.VertexBuffer(graphicsDevice,
    new Zia.VertexDeclaration(
    [
      new Zia.VertexElement("aVertexColor", 4, 0)
    ]),
    new Float32Array(unpackedCubeColors));

  var cubeIndexBuffer = new Zia.IndexBuffer(graphicsDevice,
    new Uint16Array(
    [
      0, 1, 2,      0, 2, 3,    // Front face
      4, 5, 6,      4, 6, 7,    // Back face
      8, 9, 10,     8, 10, 11,  // Top face
      12, 13, 14,   12, 14, 15, // Bottom face
      16, 17, 18,   16, 18, 19, // Right face
      20, 21, 22,   20, 22, 23  // Left face
    ]));

  var projectionMatrix = new Zia.Matrix4().makePerspective(45,
    graphicsDevice.viewport.aspectRatio, 0.1, 100);
  var viewMatrix = new Zia.Matrix4().makeTranslation(0, 0, -6);

  var pyramidModelMatrix = new Zia.Matrix4().identity();
  var cubeModelMatrix = new Zia.Matrix4().identity();

  var pyramidRotationAxis = new Zia.Vector3(0, 1, 0);
  var cubeRotationAxis = new Zia.Vector3(1, 1, 1).normalize();
  var tempMatrix = new Zia.Matrix4();

  var rotationPyramid = 0;
  var rotationCube = 0;

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

    pyramidModelMatrix.makeTranslation(-1.5, 0, 0);
    tempMatrix.makeRotationAxis(pyramidRotationAxis, Zia.Math.degToRad(rotationPyramid));
    pyramidModelMatrix.multiply(tempMatrix);

    program.model = pyramidModelMatrix;
    program.apply();

    graphicsDevice.drawPrimitives(
      Zia.PrimitiveType.TriangleList,
      0, 12);

    // Draw cube.

    graphicsDevice.setIndexBuffer(cubeIndexBuffer);
    graphicsDevice.setVertexBuffers(
    [
      cubeVertexPositionBuffer,
      cubeVertexColorBuffer
    ]);

    cubeModelMatrix.makeTranslation(1.5, 0, 0);
    tempMatrix.makeRotationAxis(cubeRotationAxis, Zia.Math.degToRad(rotationCube));
    cubeModelMatrix.multiply(tempMatrix);

    program.model = cubeModelMatrix;
    program.apply();

    graphicsDevice.drawIndexedPrimitives(
      Zia.PrimitiveType.TriangleList,
      0, 36);
  }

  var lastTime = 0;

  function animate() {
    var timeNow = new Date().getTime();
    if (lastTime != 0) {
      var elapsed = timeNow - lastTime;
      rotationPyramid += (90 * elapsed) / 1000.0;
      rotationCube -= (75 * elapsed) / 1000.0;
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