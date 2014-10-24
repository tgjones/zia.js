$(function() {

  var canvas = document.getElementById('mainCanvas');
  
  var graphicsDevice = new Zia.GraphicsDevice(canvas);
  graphicsDevice.rasterizerState = new Zia.RasterizerState({
    isFrontClockwise: true
  });

  var program = new Zia.BasicProgram(graphicsDevice, {
    textureEnabled: true,
    lightingEnabled: true
  });
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
    Zia.MathUtil.PI_OVER_FOUR,
    graphicsDevice.viewport.aspectRatio, 0.1, 100,
    new Zia.Matrix4());

  var viewMatrix = Zia.Matrix4.createLookAt(
    new Zia.Vector3(0, 0, -4),
    new Zia.Vector3(0, 0, 0),
    new Zia.Vector3(0, 1, 0),
    new Zia.Matrix4());

  var modelMatrix = Zia.Matrix4.createScale(
    new Zia.Vector3(5, 1, 10),
    new Zia.Matrix4());

  var stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  canvas.parentElement.appendChild(stats.domElement);

  function drawScene() {
    stats.begin();

    if (graphicsDevice.resize()) {
      Zia.Matrix4.createPerspectiveFieldOfView(
        Zia.MathUtil.PI_OVER_FOUR,
        graphicsDevice.viewport.aspectRatio,
        0.1, 100,
        projectionMatrix);
    }

    graphicsDevice.clear(
      Zia.ClearOptions.ColorBuffer | Zia.ClearOptions.DepthBuffer,
      new Zia.Color4(0, 0, 0, 1), 1);

    program.texture = window.texture;

    cubeModel.draw(modelMatrix, viewMatrix, projectionMatrix);

    stats.end();

    requestAnimationFrame(drawScene);
  }

  var controls = {
    filter: 'MinMagMipNearest',
    toggleFullScreen: function() {
      Zia.HtmlUtil.toggleFullScreen(canvas.parentElement);
    }
  };

  var gui = new dat.GUI({ autoPlace: false, width: 345 });
  canvas.parentElement.appendChild(gui.domElement);

  var filterController = gui.add(controls, 'filter', [
    'MinMagMipNearest',
    'MinMagNearestMipLinear',
    'MinNearestMagLinearMipNearest',
    'MinNearestMagMipLinear',
    'MinLinearMagMipNearest',
    'MinLinearMagNearestMipLinear',
    'MinMagLinearMipNearest',
    'MinMagMipLinear',
    'MinMagNearest',
    'MinNearestMagLinear',
    'MinLinearMagNearest',
    'MinMagLinear'
  ]).name('Filter');
  filterController.onChange(function(value) {
    window.texture = Zia.Texture2D.createFromImagePath(graphicsDevice,
      '../assets/textures/texture6.jpg',
      { filter: Zia.TextureFilter[value] });
  });
  filterController.setValue(controls.filter);

  gui.add(controls, 'toggleFullScreen').name('Fullscreen');

  requestAnimationFrame(drawScene);

});