document.addEventListener('DOMContentLoaded', function () {
    
  var canvas = document.getElementById('mainCanvas');
  
  var graphicsDevice = new Zia.GraphicsDevice(canvas);

  var program = new Zia.EnvironmentMapProgram(graphicsDevice);
  program.enableDefaultLighting();

  var texture = Zia.Texture2D.createWhiteTexture(graphicsDevice);

  var environmentMap = Zia.TextureCube.createFromImagePaths(graphicsDevice, [
    '../assets/textures/cube/posx.jpg',
    '../assets/textures/cube/negx.jpg',
    '../assets/textures/cube/posy.jpg',
    '../assets/textures/cube/negy.jpg',
    '../assets/textures/cube/posz.jpg',
    '../assets/textures/cube/negz.jpg']);

  var model = Zia.GeometricPrimitive.convertToModel(
    graphicsDevice, Zia.GeometricPrimitive.createTeapot());

  var projectionMatrix = new Zia.Matrix4().makePerspective(45,
    graphicsDevice.viewport.aspectRatio, 0.1, 100);

  var cameraPositionMatrix = new Zia.Matrix4();
  var cameraPosition = new Zia.Vector3();
  var cameraTarget = new Zia.Vector3(0, 0, 0);
  var cameraUp = new Zia.Vector3(0, 1, 0);
  var viewMatrix = new Zia.Matrix4();
  var modelMatrix = new Zia.Matrix4().identity();

  var lastCubeUpdateTime, rotationAngle = 0;
  var rotationAxis = new Zia.Vector3(1, 0, 1).normalize();

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
      new Zia.Color4(0.4, 0.4, 0.4, 1), 1);

    cameraPositionMatrix.makeRotationY(Zia.Math.degToRad(rotationAngle));
    cameraPosition.set(0, 1, -1.5).applyMatrix4(cameraPositionMatrix);

    viewMatrix.makeLookAt(
      cameraPosition,
      cameraTarget,
      cameraUp);

    model.draw(modelMatrix, viewMatrix, projectionMatrix);

    var currentTime = (new Date).getTime();
    if (lastCubeUpdateTime) {
      var delta = currentTime - lastCubeUpdateTime;
      rotationAngle += (10 * delta) / 1000.0;
    }
    
    lastCubeUpdateTime = currentTime;

    stats.end();

    requestAnimationFrame(drawScene);
  }

  function vector3ToColorArray(v) {
    return v.toArray().map(function(x) {
      return x * 255.0;
    });
  }

  function colorArrayToVector3(c) {
    return new Zia.Vector3(
      c[0] / 255.0,
      c[1] / 255.0,
      c[2] / 255.0);
  }

  var controls = {
    // textureEnabled: true,
    // lightingEnabled: true,
    // perPixelLightingEnabled: true,

    diffuseColor: vector3ToColorArray(program.diffuseColor),
    //specularColor: vector3ToColorArray(program.specularColor),
    //specularPower: program.specularPower,
    emissiveColor: vector3ToColorArray(program.emissiveColor),
    ambientLightColor: vector3ToColorArray(program.ambientLightColor),

    toggleFullScreen: function() {
      Zia.HtmlUtil.toggleFullScreen(canvas.parentElement);
    }
  };

  function createProgram() {
    if (program !== null) {
      program.destroy();
    }
    program = new Zia.EnvironmentMapProgram(graphicsDevice, {
      //textureEnabled: controls.textureEnabled,
      // lightingEnabled: controls.lightingEnabled,
      // perPixelLightingEnabled: controls.perPixelLightingEnabled
    });
    program.enableDefaultLighting();
    program.texture = texture;
    program.environmentMap = environmentMap;
    program.diffuseColor = colorArrayToVector3(controls.diffuseColor);
    // program.specularColor = colorArrayToVector3(controls.specularColor);
    // program.specularPower = controls.specularPower;
    program.emissiveColor = colorArrayToVector3(controls.emissiveColor);
    program.ambientLightColor = colorArrayToVector3(controls.ambientLightColor);

    for (var i = 0; i < model.meshes.length; i++) {
      var mesh = model.meshes[i];
      for (var j = 0; j < mesh.meshParts.length; j++) {
        mesh.meshParts[j].program = program;
      }
    }
  }

  createProgram();

  var gui = new dat.GUI({ autoPlace: false });
  canvas.parentElement.appendChild(gui.domElement);

  var f1 = gui.addFolder('Basic parameters');
  // f1.add(controls, 'textureEnabled').
  //   name('Texture').
  //   onChange(createProgram);
  // f1.add(controls, 'lightingEnabled').
  //   name('Lighting').
  //   onChange(createProgram);
  // f1.add(controls, 'perPixelLightingEnabled').
  //   name('Per-pixel lighting').
  //   onChange(createProgram);

  var f2 = gui.addFolder('Colors');
  f2.addColor(controls, 'diffuseColor').
    name('Diffuse color').
    onChange(createProgram);
  // f2.addColor(controls, 'specularColor').
  //   name('Specular color').
  //   onChange(createProgram);
  // f2.add(controls, 'specularPower', 1, 64).
  //   name('Specular power').
  //   onChange(createProgram);
  f2.addColor(controls, 'emissiveColor').
    name('Emissive color').
    onChange(createProgram);

  var f3 = gui.addFolder('Lighting');
  f3.addColor(controls, 'ambientLightColor').
    name('Ambient light color').
    onChange(createProgram);

  var f4 = gui.addFolder('Misc');
  f4.add(controls, 'toggleFullScreen').name('Fullscreen');
  f4.open();

  requestAnimationFrame(drawScene);

}, false);