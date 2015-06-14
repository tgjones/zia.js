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
        var TeapotPatch = (function () {
            function TeapotPatch(mirrorZ, indices) {
                this.mirrorZ = mirrorZ;
                this.indices = indices;
            }
            return TeapotPatch;
        })();
        var teapotPatches = [
            new TeapotPatch(true, [102, 103, 104, 105, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]),
            new TeapotPatch(true, [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]),
            new TeapotPatch(true, [24, 25, 26, 27, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]),
            new TeapotPatch(true, [96, 96, 96, 96, 97, 98, 99, 100, 101, 101, 101, 101, 0, 1, 2, 3]),
            new TeapotPatch(true, [0, 1, 2, 3, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117]),
            new TeapotPatch(false, [41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56]),
            new TeapotPatch(false, [53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 28, 65, 66, 67]),
            new TeapotPatch(false, [68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83]),
            new TeapotPatch(false, [80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95]),
            new TeapotPatch(true, [118, 118, 118, 118, 124, 122, 119, 121, 123, 126, 125, 120, 40, 39, 38, 37])
        ];
        var teapotControlPoints = [
            new Zia.Vector3(0, 0.345, -0.05),
            new Zia.Vector3(-0.028, 0.345, -0.05),
            new Zia.Vector3(-0.05, 0.345, -0.028),
            new Zia.Vector3(-0.05, 0.345, -0),
            new Zia.Vector3(0, 0.3028125, -0.334375),
            new Zia.Vector3(-0.18725, 0.3028125, -0.334375),
            new Zia.Vector3(-0.334375, 0.3028125, -0.18725),
            new Zia.Vector3(-0.334375, 0.3028125, -0),
            new Zia.Vector3(0, 0.3028125, -0.359375),
            new Zia.Vector3(-0.20125, 0.3028125, -0.359375),
            new Zia.Vector3(-0.359375, 0.3028125, -0.20125),
            new Zia.Vector3(-0.359375, 0.3028125, -0),
            new Zia.Vector3(0, 0.27, -0.375),
            new Zia.Vector3(-0.21, 0.27, -0.375),
            new Zia.Vector3(-0.375, 0.27, -0.21),
            new Zia.Vector3(-0.375, 0.27, -0),
            new Zia.Vector3(0, 0.13875, -0.4375),
            new Zia.Vector3(-0.245, 0.13875, -0.4375),
            new Zia.Vector3(-0.4375, 0.13875, -0.245),
            new Zia.Vector3(-0.4375, 0.13875, -0),
            new Zia.Vector3(0, 0.007499993, -0.5),
            new Zia.Vector3(-0.28, 0.007499993, -0.5),
            new Zia.Vector3(-0.5, 0.007499993, -0.28),
            new Zia.Vector3(-0.5, 0.007499993, -0),
            new Zia.Vector3(0, -0.105, -0.5),
            new Zia.Vector3(-0.28, -0.105, -0.5),
            new Zia.Vector3(-0.5, -0.105, -0.28),
            new Zia.Vector3(-0.5, -0.105, -0),
            new Zia.Vector3(0, -0.105, 0.5),
            new Zia.Vector3(0, -0.2175, -0.5),
            new Zia.Vector3(-0.28, -0.2175, -0.5),
            new Zia.Vector3(-0.5, -0.2175, -0.28),
            new Zia.Vector3(-0.5, -0.2175, -0),
            new Zia.Vector3(0, -0.27375, -0.375),
            new Zia.Vector3(-0.21, -0.27375, -0.375),
            new Zia.Vector3(-0.375, -0.27375, -0.21),
            new Zia.Vector3(-0.375, -0.27375, -0),
            new Zia.Vector3(0, -0.2925, -0.375),
            new Zia.Vector3(-0.21, -0.2925, -0.375),
            new Zia.Vector3(-0.375, -0.2925, -0.21),
            new Zia.Vector3(-0.375, -0.2925, -0),
            new Zia.Vector3(0, 0.17625, 0.4),
            new Zia.Vector3(-0.075, 0.17625, 0.4),
            new Zia.Vector3(-0.075, 0.2325, 0.375),
            new Zia.Vector3(0, 0.2325, 0.375),
            new Zia.Vector3(0, 0.17625, 0.575),
            new Zia.Vector3(-0.075, 0.17625, 0.575),
            new Zia.Vector3(-0.075, 0.2325, 0.625),
            new Zia.Vector3(0, 0.2325, 0.625),
            new Zia.Vector3(0, 0.17625, 0.675),
            new Zia.Vector3(-0.075, 0.17625, 0.675),
            new Zia.Vector3(-0.075, 0.2325, 0.75),
            new Zia.Vector3(0, 0.2325, 0.75),
            new Zia.Vector3(0, 0.12, 0.675),
            new Zia.Vector3(-0.075, 0.12, 0.675),
            new Zia.Vector3(-0.075, 0.12, 0.75),
            new Zia.Vector3(0, 0.12, 0.75),
            new Zia.Vector3(0, 0.06375, 0.675),
            new Zia.Vector3(-0.075, 0.06375, 0.675),
            new Zia.Vector3(-0.075, 0.007499993, 0.75),
            new Zia.Vector3(0, 0.007499993, 0.75),
            new Zia.Vector3(0, -0.04875001, 0.625),
            new Zia.Vector3(-0.075, -0.04875001, 0.625),
            new Zia.Vector3(-0.075, -0.09562501, 0.6625),
            new Zia.Vector3(0, -0.09562501, 0.6625),
            new Zia.Vector3(-0.075, -0.105, 0.5),
            new Zia.Vector3(-0.075, -0.18, 0.475),
            new Zia.Vector3(0, -0.18, 0.475),
            new Zia.Vector3(0, 0.02624997, -0.425),
            new Zia.Vector3(-0.165, 0.02624997, -0.425),
            new Zia.Vector3(-0.165, -0.18, -0.425),
            new Zia.Vector3(0, -0.18, -0.425),
            new Zia.Vector3(0, 0.02624997, -0.65),
            new Zia.Vector3(-0.165, 0.02624997, -0.65),
            new Zia.Vector3(-0.165, -0.12375, -0.775),
            new Zia.Vector3(0, -0.12375, -0.775),
            new Zia.Vector3(0, 0.195, -0.575),
            new Zia.Vector3(-0.0625, 0.195, -0.575),
            new Zia.Vector3(-0.0625, 0.17625, -0.6),
            new Zia.Vector3(0, 0.17625, -0.6),
            new Zia.Vector3(0, 0.27, -0.675),
            new Zia.Vector3(-0.0625, 0.27, -0.675),
            new Zia.Vector3(-0.0625, 0.27, -0.825),
            new Zia.Vector3(0, 0.27, -0.825),
            new Zia.Vector3(0, 0.28875, -0.7),
            new Zia.Vector3(-0.0625, 0.28875, -0.7),
            new Zia.Vector3(-0.0625, 0.2934375, -0.88125),
            new Zia.Vector3(0, 0.2934375, -0.88125),
            new Zia.Vector3(0, 0.28875, -0.725),
            new Zia.Vector3(-0.0375, 0.28875, -0.725),
            new Zia.Vector3(-0.0375, 0.298125, -0.8625),
            new Zia.Vector3(0, 0.298125, -0.8625),
            new Zia.Vector3(0, 0.27, -0.7),
            new Zia.Vector3(-0.0375, 0.27, -0.7),
            new Zia.Vector3(-0.0375, 0.27, -0.8),
            new Zia.Vector3(0, 0.27, -0.8),
            new Zia.Vector3(0, 0.4575, -0),
            new Zia.Vector3(0, 0.4575, -0.2),
            new Zia.Vector3(-0.1125, 0.4575, -0.2),
            new Zia.Vector3(-0.2, 0.4575, -0.1125),
            new Zia.Vector3(-0.2, 0.4575, -0),
            new Zia.Vector3(0, 0.3825, -0),
            new Zia.Vector3(0, 0.27, -0.35),
            new Zia.Vector3(-0.196, 0.27, -0.35),
            new Zia.Vector3(-0.35, 0.27, -0.196),
            new Zia.Vector3(-0.35, 0.27, -0),
            new Zia.Vector3(0, 0.3075, -0.1),
            new Zia.Vector3(-0.056, 0.3075, -0.1),
            new Zia.Vector3(-0.1, 0.3075, -0.056),
            new Zia.Vector3(-0.1, 0.3075, -0),
            new Zia.Vector3(0, 0.3075, -0.325),
            new Zia.Vector3(-0.182, 0.3075, -0.325),
            new Zia.Vector3(-0.325, 0.3075, -0.182),
            new Zia.Vector3(-0.325, 0.3075, -0),
            new Zia.Vector3(0, 0.27, -0.325),
            new Zia.Vector3(-0.182, 0.27, -0.325),
            new Zia.Vector3(-0.325, 0.27, -0.182),
            new Zia.Vector3(-0.325, 0.27, -0),
            new Zia.Vector3(0, -0.33, -0),
            new Zia.Vector3(-0.1995, -0.33, -0.35625),
            new Zia.Vector3(0, -0.31125, -0.375),
            new Zia.Vector3(0, -0.33, -0.35625),
            new Zia.Vector3(-0.35625, -0.33, -0.1995),
            new Zia.Vector3(-0.375, -0.31125, -0),
            new Zia.Vector3(-0.35625, -0.33, -0),
            new Zia.Vector3(-0.21, -0.31125, -0.375),
            new Zia.Vector3(-0.375, -0.31125, -0.21)
        ];
        function createPatchIndices(tessellation, isMirrored, baseIndex) {
            var stride = tessellation + 1;
            var indices = new Array(6);
            var result = [];
            for (var i = 0; i < tessellation; i++) {
                for (var j = 0; j < tessellation; j++) {
                    indices[0] = baseIndex + i * stride + j;
                    indices[2] = baseIndex + (i + 1) * stride + j;
                    indices[1] = baseIndex + (i + 1) * stride + j + 1;
                    indices[3] = baseIndex + i * stride + j;
                    indices[5] = baseIndex + (i + 1) * stride + j + 1;
                    indices[4] = baseIndex + i * stride + j + 1;
                    if (isMirrored) {
                        indices.reverse();
                    }
                    for (var k = 0; k < indices.length; k++) {
                        result.push(indices[k]);
                    }
                }
            }
            return result;
        }
        var cubicInterpolateTemp1 = new Zia.Vector3();
        var cubicInterpolateTemp2 = new Zia.Vector3();
        var cubicInterpolateTemp3 = new Zia.Vector3();
        var cubicInterpolateTemp4 = new Zia.Vector3();
        function cubicInterpolate(p1, p2, p3, p4, t) {
            var t2 = t * t;
            var onet2 = (1 - t) * (1 - t);
            cubicInterpolateTemp1.set(p1.x, p1.y, p1.z).multiplyScalar((1 - t) * onet2);
            cubicInterpolateTemp2.set(p2.x, p2.y, p2.z).multiplyScalar(3 * t * onet2);
            cubicInterpolateTemp3.set(p3.x, p3.y, p3.z).multiplyScalar(3 * t2 * (1 - t));
            cubicInterpolateTemp4.set(p4.x, p4.y, p4.z).multiplyScalar(t * t2);
            return cubicInterpolateTemp1.clone(new Zia.Vector3()).
                add(cubicInterpolateTemp2).
                add(cubicInterpolateTemp3).
                add(cubicInterpolateTemp4);
        }
        var cubicTangentTemp1 = new Zia.Vector3();
        var cubicTangentTemp2 = new Zia.Vector3();
        var cubicTangentTemp3 = new Zia.Vector3();
        var cubicTangentTemp4 = new Zia.Vector3();
        function cubicTangent(p1, p2, p3, p4, t) {
            var t2 = t * t;
            cubicTangentTemp1.set(p1.x, p1.y, p1.z).multiplyScalar(-1 + 2 * t - t2);
            cubicTangentTemp2.set(p2.x, p2.y, p2.z).multiplyScalar(1 - 4 * t + 3 * t2);
            cubicTangentTemp3.set(p3.x, p3.y, p3.z).multiplyScalar(2 * t - 3 * t2);
            cubicTangentTemp4.set(p4.x, p4.y, p4.z).multiplyScalar(t2);
            return cubicTangentTemp1.clone(new Zia.Vector3()).
                add(cubicTangentTemp2).
                add(cubicTangentTemp3).
                add(cubicTangentTemp4);
        }
        function createPatchVertices(patch, tessellation, isMirrored, positions, normals, textureCoordinates) {
            for (var i = 0; i <= tessellation; i++) {
                var u = i / tessellation;
                for (var j = 0; j <= tessellation; j++) {
                    var v = j / tessellation;
                    var p1 = cubicInterpolate(patch[0], patch[1], patch[2], patch[3], u);
                    var p2 = cubicInterpolate(patch[4], patch[5], patch[6], patch[7], u);
                    var p3 = cubicInterpolate(patch[8], patch[9], patch[10], patch[11], u);
                    var p4 = cubicInterpolate(patch[12], patch[13], patch[14], patch[15], u);
                    var position = cubicInterpolate(p1, p2, p3, p4, v);
                    var q1 = cubicInterpolate(patch[0], patch[4], patch[8], patch[12], v);
                    var q2 = cubicInterpolate(patch[1], patch[5], patch[9], patch[13], v);
                    var q3 = cubicInterpolate(patch[2], patch[6], patch[10], patch[14], v);
                    var q4 = cubicInterpolate(patch[3], patch[7], patch[11], patch[15], v);
                    var tangent1 = cubicTangent(p1, p2, p3, p4, v);
                    var tangent2 = cubicTangent(q1, q2, q3, q4, u);
                    var normal = Zia.Vector3.cross(tangent1, tangent2);
                    if (!normal.nearEqual(new Zia.Vector3(), new Zia.Vector3(1e-7))) {
                        normal.normalize();
                        if (isMirrored) {
                            normal.negate();
                        }
                    }
                    else {
                        normal.x = 0.0;
                        normal.y = position.y < 0.0 ? -1.0 : 1.0;
                        normal.z = 0.0;
                    }
                    var mirroredU = isMirrored ? 1 - u : u;
                    var textureCoordinate = new Zia.Vector2(mirroredU, 1 - v);
                    positions.push(position);
                    normals.push(normal);
                    textureCoordinates.push(textureCoordinate);
                }
            }
        }
        function tessellatePatch(positions, normals, textureCoordinates, indices, patch, tessellation, scale, isMirrored) {
            var controlPoints = new Array(16);
            for (var i = 0; i < 16; i++) {
                controlPoints[i] = teapotControlPoints[patch.indices[i]].clone(new Zia.Vector3()).multiply(scale);
            }
            var vbase = positions.length;
            Array.prototype.push.apply(indices, createPatchIndices(tessellation, isMirrored, vbase));
            createPatchVertices(controlPoints, tessellation, isMirrored, positions, normals, textureCoordinates);
        }
        function createTeapot(size, tessellation) {
            if (size === void 0) { size = 1.0; }
            if (tessellation === void 0) { tessellation = 8; }
            if (tessellation < 1) {
                throw "tessellation must be > 0";
            }
            var positions = [];
            var normals = [];
            var textureCoordinates = [];
            var indices = [];
            var scaleVector = new Zia.Vector3(size, size, size);
            var scaleNegateX = scaleVector.clone(new Zia.Vector3());
            scaleNegateX.x = -scaleNegateX.x;
            var scaleNegateZ = scaleVector.clone(new Zia.Vector3());
            scaleNegateZ.z = -scaleNegateZ.z;
            var scaleNegateXZ = new Zia.Vector3(-size, size, -size);
            for (var i = 0; i < teapotPatches.length; i++) {
                var patch = teapotPatches[i];
                tessellatePatch(positions, normals, textureCoordinates, indices, patch, tessellation, scaleVector, false);
                tessellatePatch(positions, normals, textureCoordinates, indices, patch, tessellation, scaleNegateX, true);
                if (patch.mirrorZ) {
                    tessellatePatch(positions, normals, textureCoordinates, indices, patch, tessellation, scaleNegateZ, true);
                    tessellatePatch(positions, normals, textureCoordinates, indices, patch, tessellation, scaleNegateXZ, false);
                }
            }
            return {
                positions: positions,
                normals: normals,
                textureCoordinates: textureCoordinates,
                indices: indices
            };
        }
        GeometricPrimitive.createTeapot = createTeapot;
        ;
    })(GeometricPrimitive = Zia.GeometricPrimitive || (Zia.GeometricPrimitive = {}));
})(Zia || (Zia = {}));
