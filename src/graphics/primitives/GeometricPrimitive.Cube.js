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
        var cubeFaceCount = 6;
        var faceNormals = [
            new Zia.Vector3(0, 0, 1),
            new Zia.Vector3(0, 0, -1),
            new Zia.Vector3(1, 0, 0),
            new Zia.Vector3(-1, 0, 0),
            new Zia.Vector3(0, 1, 0),
            new Zia.Vector3(0, -1, 0)
        ];
        var textureCoordinates = [
            new Zia.Vector2(1, 1),
            new Zia.Vector2(1, 0),
            new Zia.Vector2(0, 0),
            new Zia.Vector2(0, 1)
        ];
        var side1 = new Zia.Vector3();
        var side2 = new Zia.Vector3();
        /** Creates a cube primitive. */
        function createCube(size) {
            if (size === void 0) { size = 1.0; }
            var positions = [];
            var normals = [];
            var texCoords = [];
            var indices = [];
            size /= 2.0;
            // Create each face in turn.
            for (var i = 0; i < cubeFaceCount; i++) {
                var normal = faceNormals[i];
                // Get two vectors perpendicular both to the face normal and to each other.
                var basis = (i >= 4) ? new Zia.Vector3(0, 0, 1) : new Zia.Vector3(0, 1, 0);
                side1.set(normal.x, normal.y, normal.z);
                Zia.Vector3.cross(side1, basis, side1);
                side2.set(normal.x, normal.y, normal.z);
                Zia.Vector3.cross(side2, side1, side2);
                // Six indices (two triangles) per face.
                var vbase = i * 4;
                indices.push(vbase + 0);
                indices.push(vbase + 2);
                indices.push(vbase + 1);
                indices.push(vbase + 0);
                indices.push(vbase + 3);
                indices.push(vbase + 2);
                // Four vertices per face.
                // (normal - side1 - side2) * size
                positions.push(normal.clone(new Zia.Vector3()).sub(side1).sub(side2).multiplyScalar(size));
                // (normal - side1 + side2) * size
                positions.push(normal.clone(new Zia.Vector3()).sub(side1).add(side2).multiplyScalar(size));
                // (normal + side1 + side2) * size
                positions.push(normal.clone(new Zia.Vector3()).add(side1).add(side2).multiplyScalar(size));
                // (normal + side1 - side2) * size
                positions.push(normal.clone(new Zia.Vector3()).add(side1).sub(side2).multiplyScalar(size));
                normals.push(normal);
                normals.push(normal);
                normals.push(normal);
                normals.push(normal);
                texCoords.push(textureCoordinates[0]);
                texCoords.push(textureCoordinates[1]);
                texCoords.push(textureCoordinates[2]);
                texCoords.push(textureCoordinates[3]);
            }
            return {
                positions: positions,
                normals: normals,
                textureCoordinates: texCoords,
                indices: indices
            };
        }
        GeometricPrimitive.createCube = createCube;
        ;
    })(GeometricPrimitive = Zia.GeometricPrimitive || (Zia.GeometricPrimitive = {}));
})(Zia || (Zia = {}));
