var canvas = document.getElementById('mainCanvas');

var graphicsDevice = new Zia.GraphicsDevice(canvas);

var program = new Zia.BasicProgram(graphicsDevice);

var vertexBuffer = new Zia.VertexBuffer(graphicsDevice,
  Zia.BoxPrimitive.vertexDeclaration,
  Zia.BoxPrimitive.vertices);

var indexBuffer = new Zia.IndexBuffer(graphicsDevice,
  Zia.BoxPrimitive.indices);

var projectionMatrix = new Zia.Matrix4().makePerspective(45,
  graphicsDevice.viewport.aspectRatio, 0.1, 100);
var viewMatrix = new Zia.Matrix4().makeTranslation(0, 0, -4);
var modelMatrix = new Zia.Matrix4().identity();

program.view = viewMatrix;
program.projection = projectionMatrix;

graphicsDevice.setIndexBuffer(indexBuffer);
graphicsDevice.setVertexBuffers([vertexBuffer]);

graphicsDevice.clear(
  Zia.ClearOptions.ColorBuffer | Zia.ClearOptions.DepthBuffer,
  new Zia.Color4(0, 0, 0, 1), 1);

program.model = modelMatrix;
program.apply();

graphicsDevice.drawIndexedPrimitives(
  Zia.PrimitiveType.TriangleList,
  0, 36);