# Zia.js

## What is Zia.js?

Zia.js is an object-oriented, WebGL-based game framework. Right now it's focused
on graphics. Sound, networking and general-purpose game APIs will be added later
(if there's enough interest).

Zia.js is not a graphics engine, and it's not a game engine. It could help with 
building either of those, but it's not one of those. It is a framework that can 
be used to build a game, or a game engine.

Just like XNA gave game developers a friendly set of APIs to use to build games 
on Windows-based platforms, I'm hoping to do the same for the web with Zia.js. 
The analogy with XNA isn't an accident. Just like XNA provided graphics API that 
were recognisably built on Direct3D, and yet higher-level and easier than 
Direct3D, so Zia.js provides graphics APIs that are built on WebGL.

## What does it look like?

``` javascript
var canvas = document.getElementById('mainCanvas');

var graphicsDevice = new Zia.GraphicsDevice(canvas);

var program = new Zia.BasicProgram(graphicsDevice, {
  lightingEnabled: true
});
program.diffuseColor = new Zia.Vector3(0.5, 1, 0.5);
program.enableDefaultLighting();

var cubePrimitive = Zia.GeometricPrimitive.createCube();

var vertexData = Zia.GeometricPrimitive.mergeVertexData(
  cubePrimitive.positions, cubePrimitive.normals,
  cubePrimitive.textureCoordinates);
var vertices = new Float32Array(vertexData);

var vertexBuffer = new Zia.VertexBuffer(graphicsDevice,
  new Zia.VertexDeclaration(
  [
    new Zia.VertexElement("aVertexPosition", 3, 0),
    new Zia.VertexElement("aVertexNormal", 3, 3 * 4),
    new Zia.VertexElement("aTextureCoord", 2, 6 * 4)
  ]),
  vertices);

var indexBuffer = new Zia.IndexBuffer(graphicsDevice,
  new Uint16Array(cubePrimitive.indices));

var projectionMatrix = new Zia.Matrix4().makePerspective(45,
  graphicsDevice.viewport.aspectRatio, 0.1, 100);
var viewMatrix = new Zia.Matrix4().makeLookAt(
  new Zia.Vector3(1, 1, -1.5),
  new Zia.Vector3(0, 0, 0),
  new Zia.Vector3(0, 1, 0));
var modelMatrix = new Zia.Matrix4().identity();

graphicsDevice.setIndexBuffer(indexBuffer);
graphicsDevice.setVertexBuffer(vertexBuffer);

graphicsDevice.clear(
  Zia.ClearOptions.ColorBuffer | Zia.ClearOptions.DepthBuffer,
  new Zia.Color4(0, 0, 0, 1), 1);

program.viewMatrix = viewMatrix;
program.projectionMatrix = projectionMatrix;
program.modelMatrix = modelMatrix;
program.apply();

graphicsDevice.drawIndexedPrimitives(
  Zia.PrimitiveType.TriangleList,
  0, 36);
```

## Why not use Three.js?

Most sensible people who want to build a game will choose one of the excellent graphics or game engines already available for WebGL, such as Three.js or Babylon.js. And so they should. But there is another group of people who like things a bit closer to the metal (although bear in mind this is Javascript, where you're already so far from the metal that it's hard to remember what metal even looks like).

Zia.js is for that group of people. I'm one of them myself. I spent years playing around with XNA, and was disappointed when it was cancelled. But these are exciting times for 3D graphics; WebGL is now supported in all major browsers, including Internet Explorer and Safari on iOS. Regardless of whether it is "the" future for games, WebGL opens up unbelievably exciting possibilities.

## Why not use vanilla WebGL?

Great question. If you have experience with OpenGL, then you'll probably get up and running with WebGL very quickly. But if (like me) you come from Direct3D / XNA, WebGL will be... perplexing. Its state-based configuration methods, where you first bind a resource and call global methods that affect whatever you bound, take some getting used to. If you just want something similar to XNA, but for WebGL, then Zia.js is for you.

## Why create yet another WebGL framework?

Like I said above, Zia.js is lower-level than Three.js or Babylon.js, and higher-level than WebGL. There are other object-oriented WebGL wrappers out there. I have reviewed some of them, but the ones I looked at either weren't maintained, or didn't have the type of API I was looking for.

## What does the name mean?

Zia (pronounced zee-yah) stands for Zia Is Acronymed (a little in-joke for the ex-XNA-ers in the audience).

Zia is also an Arabic name meaning "light", which seems appropriate for a rendering framework.