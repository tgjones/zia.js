// -----------------------------------------------------------------------------
// The following code is a port of SharpDX https://github.com/sharpdx/sharpdx
// -----------------------------------------------------------------------------
// Copyright (c) 2010-2014 SharpDX - Alexandre Mutel
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
// -----------------------------------------------------------------------------
// The following code is a port of DirectXTk http://directxtk.codeplex.com
// -----------------------------------------------------------------------------
// Microsoft Public License (Ms-PL)
//
// This license governs use of the accompanying software. If you use the
// software, you accept this license. If you do not accept the license, do not
// use the software.
//
// 1. Definitions
// The terms "reproduce," "reproduction," "derivative works," and
// "distribution" have the same meaning here as under U.S. copyright law.
// A "contribution" is the original software, or any additions or changes to
// the software.
// A "contributor" is any person that distributes its contribution under this
// license.
// "Licensed patents" are a contributor's patent claims that read directly on
// its contribution.
//
// 2. Grant of Rights
// (A) Copyright Grant- Subject to the terms of this license, including the
// license conditions and limitations in section 3, each contributor grants
// you a non-exclusive, worldwide, royalty-free copyright license to reproduce
// its contribution, prepare derivative works of its contribution, and
// distribute its contribution or any derivative works that you create.
// (B) Patent Grant- Subject to the terms of this license, including the license
// conditions and limitations in section 3, each contributor grants you a
// non-exclusive, worldwide, royalty-free license under its licensed patents to
// make, have made, use, sell, offer for sale, import, and/or otherwise dispose
// of its contribution in the software or derivative works of the contribution
// in the software.
//
// 3. Conditions and Limitations
// (A) No Trademark License- This license does not grant you rights to use any
// contributors' name, logo, or trademarks.
// (B) If you bring a patent claim against any contributor over patents that
// you claim are infringed by the software, your patent license from such
// contributor to the software ends automatically.
// (C) If you distribute any portion of the software, you must retain all
// copyright, patent, trademark, and attribution notices that are present in the
// software.
// (D) If you distribute any portion of the software in source code form, you
// may do so only under this license by including a complete copy of this
// license with your distribution. If you distribute any portion of the software
// in compiled or object code form, you may only do so under a license that
// complies with this license.
// (E) The software is licensed "as-is." You bear the risk of using it. The
// contributors give no express warranties, guarantees or conditions. You may
// have additional consumer rights under your local laws which this license
// cannot change. To the extent permitted under your local laws, the
// contributors exclude the implied warranties of merchantability, fitness for a
// particular purpose and non-infringement.
var Zia;
(function (Zia) {
    var GeometricPrimitive;
    (function (GeometricPrimitive) {
        /** Creates a torus primitive. */
        function createTorus(diameter, thickness, tessellation) {
            if (diameter === void 0) { diameter = 1.0; }
            if (thickness === void 0) { thickness = 0.33; }
            if (tessellation === void 0) { tessellation = 32; }
            if (tessellation < 3) {
                throw "tessellation parameter out of range";
            }
            var positions = [];
            var normals = [];
            var textureCoordinates = [];
            var indices = [];
            var stride = tessellation + 1;
            var translateTransform = Zia.Matrix4.createTranslation(new Zia.Vector3(diameter / 2, 0, 0), new Zia.Matrix4());
            var transform = new Zia.Matrix4();
            // First we loop around the main ring of the torus.
            for (var i = 0; i <= tessellation; i++) {
                var u = i / tessellation;
                var outerAngle = i * Zia.MathUtil.TWO_PI / tessellation - Zia.MathUtil.PI_OVER_TWO;
                // Create a transform matrix that will align geometry to
                // slice perpendicularly though the current ring position.
                Zia.Matrix4.createRotationY(outerAngle, transform).multiply(translateTransform);
                // Now we loop along the other axis, around the side of the tube.
                for (var j = 0; j <= tessellation; j++) {
                    var v = 1 - j / tessellation;
                    var innerAngle = j * Zia.MathUtil.TWO_PI / tessellation + Math.PI;
                    var dx = Math.cos(innerAngle), dy = Math.sin(innerAngle);
                    // Create a vertex.
                    var normal = new Zia.Vector3(dx, dy, 0);
                    var position = normal.clone(new Zia.Vector3()).multiplyScalar(thickness / 2);
                    var textureCoordinate = new Zia.Vector2(u, 1 - v);
                    position.applyMatrix4(transform);
                    normal.transformDirection(transform);
                    positions.push(position);
                    normals.push(normal);
                    textureCoordinates.push(textureCoordinate);
                    // And create indices for two triangles.
                    var nextI = (i + 1) % stride;
                    var nextJ = (j + 1) % stride;
                    indices.push(i * stride + j);
                    indices.push(nextI * stride + j);
                    indices.push(i * stride + nextJ);
                    indices.push(i * stride + nextJ);
                    indices.push(nextI * stride + j);
                    indices.push(nextI * stride + nextJ);
                }
            }
            return {
                positions: positions,
                normals: normals,
                textureCoordinates: textureCoordinates,
                indices: indices
            };
        }
        GeometricPrimitive.createTorus = createTorus;
        ;
    })(GeometricPrimitive = Zia.GeometricPrimitive || (Zia.GeometricPrimitive = {}));
})(Zia || (Zia = {}));
