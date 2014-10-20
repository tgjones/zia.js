$(function() {
    
  var canvas = document.getElementById('mainCanvas');
  
  var graphicsDevice = new Zia.GraphicsDevice(canvas);

  var program = new Zia.BasicProgram(graphicsDevice, {
    textureEnabled: true,
    lightingEnabled: true,
  });
  program.enableDefaultLighting();

  var texture = Zia.Texture2D.createFromImagePath(graphicsDevice,
    '../assets/textures/UV_Grid_Sm.jpg');
  program.texture = texture;

  var model;

  function loadModel(primitive) {
    model = Zia.GeometricPrimitive.convertToModel(
      graphicsDevice, Zia.GeometricPrimitive['create' + primitive]());

    for (var i = 0; i < model.meshes.length; i++) {
      var mesh = model.meshes[i];
      for (var j = 0; j < mesh.meshParts.length; j++) {
        mesh.meshParts[j].program = program;
      }
    }
  }

  loadModel('Teapot');

  var projectionMatrix = new Zia.Matrix4().makePerspective(45,
    graphicsDevice.viewport.aspectRatio, 0.1, 100);
  
  var viewMatrix = new Zia.Matrix4().makeLookAt(
    new Zia.Vector3(1, 1, -1.2),
    new Zia.Vector3(0, 0, 0),
    new Zia.Vector3(0, 1, 0));

  var modelMatrix = new Zia.Matrix4().identity();

  var rotationAxis = new Zia.Vector3(0, 1, 0);
  var rotationAngle = 0;

  var stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  canvas.parentElement.appendChild(stats.domElement);

  function drawScene() {
    stats.begin();

    if (graphicsDevice.resize()) {
      projectionMatrix.makePerspective(45,
        graphicsDevice.viewport.aspectRatio,
        0.1, 100);
    }

    graphicsDevice.clear(
      Zia.ClearOptions.ColorBuffer | Zia.ClearOptions.DepthBuffer,
      new Zia.Color4(0.7, 0.7, 0.7, 1), 1);

    modelMatrix.makeRotationAxis(rotationAxis, Zia.Math.degToRad(rotationAngle));
    model.draw(modelMatrix, viewMatrix, projectionMatrix);

    stats.end();
  }

  var lastTime = 0;

  function animate() {
    var timeNow = new Date().getTime();
    if (lastTime != 0) {
      var elapsed = timeNow - lastTime;
      rotationAngle += (20 * elapsed) / 1000.0;
    }
    lastTime = timeNow;
  }

  function tick() {
    requestAnimationFrame(tick);
    drawScene();
    animate();
  }

  var controls = {
    primitive: 'Teapot',
    toggleFullScreen: function() {
      Zia.HtmlUtil.toggleFullScreen(canvas.parentElement);
    }
  };

  var gui = new dat.GUI({ autoPlace: false });
  canvas.parentElement.appendChild(gui.domElement);

  var filterController = gui.add(controls, 'primitive', [
    'Cube',
    'Cylinder',
    'Plane',
    'Sphere',
    'Teapot',
    'Torus'
  ]).name('Primitive');
  filterController.onChange(function(value) {
    loadModel(value);
  });

  gui.add(controls, 'toggleFullScreen').name('Fullscreen');

  tick();

});