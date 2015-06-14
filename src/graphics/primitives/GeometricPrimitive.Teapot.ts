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

module Zia.GeometricPrimitive {
  // The teapot model consists of 10 bezier patches. Each patch has 16 control
  // points, plus a flag indicating whether it should be mirrored in the Z axis
  // as well as in X (all of the teapot is symmetrical from left to right, but
  // only some parts are symmetrical from front to back). The control points
  // are stored as integer indices into the TeapotControlPoints array.
  class TeapotPatch {
    constructor(public mirrorZ: boolean, public indices: number[]) {

    }
  }

  // Static data array defines the bezier patches that make up the teapot.
  var teapotPatches = [
    // Rim.
    new TeapotPatch(true, [102, 103, 104, 105, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]),

    // Body.
    new TeapotPatch(true, [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]),
    new TeapotPatch(true, [24, 25, 26, 27, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]),

    // Lid.
    new TeapotPatch(true, [96, 96, 96, 96, 97, 98, 99, 100, 101, 101, 101, 101, 0, 1, 2, 3]),
    new TeapotPatch(true, [0, 1, 2, 3, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117]),

    // Handle.
    new TeapotPatch(false, [41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56]),
    new TeapotPatch(false, [53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 28, 65, 66, 67]),

    // Spout.
    new TeapotPatch(false, [68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83]),
    new TeapotPatch(false, [80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95]),

    // Bottom.
    new TeapotPatch(true, [118, 118, 118, 118, 124, 122, 119, 121, 123, 126, 125, 120, 40, 39, 38, 37])
  ];

  // Static array deines the control point positions that make up the teapot.
  var teapotControlPoints = [
    new Vector3(0, 0.345, -0.05),
    new Vector3(-0.028, 0.345, -0.05),
    new Vector3(-0.05, 0.345, -0.028),
    new Vector3(-0.05, 0.345, -0),
    new Vector3(0, 0.3028125, -0.334375),
    new Vector3(-0.18725, 0.3028125, -0.334375),
    new Vector3(-0.334375, 0.3028125, -0.18725),
    new Vector3(-0.334375, 0.3028125, -0),
    new Vector3(0, 0.3028125, -0.359375),
    new Vector3(-0.20125, 0.3028125, -0.359375),
    new Vector3(-0.359375, 0.3028125, -0.20125),
    new Vector3(-0.359375, 0.3028125, -0),
    new Vector3(0, 0.27, -0.375),
    new Vector3(-0.21, 0.27, -0.375),
    new Vector3(-0.375, 0.27, -0.21),
    new Vector3(-0.375, 0.27, -0),
    new Vector3(0, 0.13875, -0.4375),
    new Vector3(-0.245, 0.13875, -0.4375),
    new Vector3(-0.4375, 0.13875, -0.245),
    new Vector3(-0.4375, 0.13875, -0),
    new Vector3(0, 0.007499993, -0.5),
    new Vector3(-0.28, 0.007499993, -0.5),
    new Vector3(-0.5, 0.007499993, -0.28),
    new Vector3(-0.5, 0.007499993, -0),
    new Vector3(0, -0.105, -0.5),
    new Vector3(-0.28, -0.105, -0.5),
    new Vector3(-0.5, -0.105, -0.28),
    new Vector3(-0.5, -0.105, -0),
    new Vector3(0, -0.105, 0.5),
    new Vector3(0, -0.2175, -0.5),
    new Vector3(-0.28, -0.2175, -0.5),
    new Vector3(-0.5, -0.2175, -0.28),
    new Vector3(-0.5, -0.2175, -0),
    new Vector3(0, -0.27375, -0.375),
    new Vector3(-0.21, -0.27375, -0.375),
    new Vector3(-0.375, -0.27375, -0.21),
    new Vector3(-0.375, -0.27375, -0),
    new Vector3(0, -0.2925, -0.375),
    new Vector3(-0.21, -0.2925, -0.375),
    new Vector3(-0.375, -0.2925, -0.21),
    new Vector3(-0.375, -0.2925, -0),
    new Vector3(0, 0.17625, 0.4),
    new Vector3(-0.075, 0.17625, 0.4),
    new Vector3(-0.075, 0.2325, 0.375),
    new Vector3(0, 0.2325, 0.375),
    new Vector3(0, 0.17625, 0.575),
    new Vector3(-0.075, 0.17625, 0.575),
    new Vector3(-0.075, 0.2325, 0.625),
    new Vector3(0, 0.2325, 0.625),
    new Vector3(0, 0.17625, 0.675),
    new Vector3(-0.075, 0.17625, 0.675),
    new Vector3(-0.075, 0.2325, 0.75),
    new Vector3(0, 0.2325, 0.75),
    new Vector3(0, 0.12, 0.675),
    new Vector3(-0.075, 0.12, 0.675),
    new Vector3(-0.075, 0.12, 0.75),
    new Vector3(0, 0.12, 0.75),
    new Vector3(0, 0.06375, 0.675),
    new Vector3(-0.075, 0.06375, 0.675),
    new Vector3(-0.075, 0.007499993, 0.75),
    new Vector3(0, 0.007499993, 0.75),
    new Vector3(0, -0.04875001, 0.625),
    new Vector3(-0.075, -0.04875001, 0.625),
    new Vector3(-0.075, -0.09562501, 0.6625),
    new Vector3(0, -0.09562501, 0.6625),
    new Vector3(-0.075, -0.105, 0.5),
    new Vector3(-0.075, -0.18, 0.475),
    new Vector3(0, -0.18, 0.475),
    new Vector3(0, 0.02624997, -0.425),
    new Vector3(-0.165, 0.02624997, -0.425),
    new Vector3(-0.165, -0.18, -0.425),
    new Vector3(0, -0.18, -0.425),
    new Vector3(0, 0.02624997, -0.65),
    new Vector3(-0.165, 0.02624997, -0.65),
    new Vector3(-0.165, -0.12375, -0.775),
    new Vector3(0, -0.12375, -0.775),
    new Vector3(0, 0.195, -0.575),
    new Vector3(-0.0625, 0.195, -0.575),
    new Vector3(-0.0625, 0.17625, -0.6),
    new Vector3(0, 0.17625, -0.6),
    new Vector3(0, 0.27, -0.675),
    new Vector3(-0.0625, 0.27, -0.675),
    new Vector3(-0.0625, 0.27, -0.825),
    new Vector3(0, 0.27, -0.825),
    new Vector3(0, 0.28875, -0.7),
    new Vector3(-0.0625, 0.28875, -0.7),
    new Vector3(-0.0625, 0.2934375, -0.88125),
    new Vector3(0, 0.2934375, -0.88125),
    new Vector3(0, 0.28875, -0.725),
    new Vector3(-0.0375, 0.28875, -0.725),
    new Vector3(-0.0375, 0.298125, -0.8625),
    new Vector3(0, 0.298125, -0.8625),
    new Vector3(0, 0.27, -0.7),
    new Vector3(-0.0375, 0.27, -0.7),
    new Vector3(-0.0375, 0.27, -0.8),
    new Vector3(0, 0.27, -0.8),
    new Vector3(0, 0.4575, -0),
    new Vector3(0, 0.4575, -0.2),
    new Vector3(-0.1125, 0.4575, -0.2),
    new Vector3(-0.2, 0.4575, -0.1125),
    new Vector3(-0.2, 0.4575, -0),
    new Vector3(0, 0.3825, -0),
    new Vector3(0, 0.27, -0.35),
    new Vector3(-0.196, 0.27, -0.35),
    new Vector3(-0.35, 0.27, -0.196),
    new Vector3(-0.35, 0.27, -0),
    new Vector3(0, 0.3075, -0.1),
    new Vector3(-0.056, 0.3075, -0.1),
    new Vector3(-0.1, 0.3075, -0.056),
    new Vector3(-0.1, 0.3075, -0),
    new Vector3(0, 0.3075, -0.325),
    new Vector3(-0.182, 0.3075, -0.325),
    new Vector3(-0.325, 0.3075, -0.182),
    new Vector3(-0.325, 0.3075, -0),
    new Vector3(0, 0.27, -0.325),
    new Vector3(-0.182, 0.27, -0.325),
    new Vector3(-0.325, 0.27, -0.182),
    new Vector3(-0.325, 0.27, -0),
    new Vector3(0, -0.33, -0),
    new Vector3(-0.1995, -0.33, -0.35625),
    new Vector3(0, -0.31125, -0.375),
    new Vector3(0, -0.33, -0.35625),
    new Vector3(-0.35625, -0.33, -0.1995),
    new Vector3(-0.375, -0.31125, -0),
    new Vector3(-0.35625, -0.33, -0),
    new Vector3(-0.21, -0.31125, -0.375),
    new Vector3(-0.375, -0.31125, -0.21)
  ];

  // Creates indices for a patch that is tessellated at the specified level.
  // Calls the specified outputIndex function for each generated index value.
  function createPatchIndices(tessellation: number, isMirrored: boolean, baseIndex: number) {
    var stride = tessellation + 1;
    // Make a list of six index values (two triangles).
    var indices: number[] = new Array(6);

    var result: number[] = [];
    for (var i = 0; i < tessellation; i++) {
      for (var j = 0; j < tessellation; j++) {
        indices[0] = baseIndex + i*stride + j;
        indices[2] = baseIndex + (i + 1)*stride + j;
        indices[1] = baseIndex + (i + 1)*stride + j + 1;
        indices[3] = baseIndex + i*stride + j;
        indices[5] = baseIndex + (i + 1)*stride + j + 1;
        indices[4] = baseIndex + i*stride + j + 1;

        // If this patch is mirrored, reverse indices to fix the winding order.
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

  // Performs a cubic bezier interpolation between four control points,
  // returning the value at the specified time (t ranges 0 to 1).
  // This template implementation can be used to interpolate Zia.Vector3,
  // float, or any other types that define suitable * and + operators.
  var cubicInterpolateTemp1 = new Vector3();
  var cubicInterpolateTemp2 = new Vector3();
  var cubicInterpolateTemp3 = new Vector3();
  var cubicInterpolateTemp4 = new Vector3();
  function cubicInterpolate(p1: Vector3, p2: Vector3, p3: Vector3, p4: Vector3, t: number) {
    var t2 = t * t;
    var onet2 = (1 - t) * (1 - t);

    // return p1*(1 - t)*onet2 +
    //        p2*3*t*onet2 +
    //        p3*3*t2*(1 - t) +
    //        p4*t*t2;

    cubicInterpolateTemp1.set(p1.x, p1.y, p1.z).multiplyScalar((1 - t) * onet2);
    cubicInterpolateTemp2.set(p2.x, p2.y, p2.z).multiplyScalar(3 * t * onet2);
    cubicInterpolateTemp3.set(p3.x, p3.y, p3.z).multiplyScalar(3 * t2 * (1 - t));
    cubicInterpolateTemp4.set(p4.x, p4.y, p4.z).multiplyScalar(t * t2);

    return cubicInterpolateTemp1.clone(new Vector3()).
      add(cubicInterpolateTemp2).
      add(cubicInterpolateTemp3).
      add(cubicInterpolateTemp4);
  }

  // Computes the tangent of a cubic bezier curve at the specified time.
  // Template supports Zia.Vector3, float, or any other types with * and + operators.
  var cubicTangentTemp1 = new Vector3();
  var cubicTangentTemp2 = new Vector3();
  var cubicTangentTemp3 = new Vector3();
  var cubicTangentTemp4 = new Vector3();
  function cubicTangent(p1: Vector3, p2: Vector3, p3: Vector3, p4: Vector3, t: number) {
    var t2 = t*t;

    // return p1*(-1 + 2*t - t2) +
    //        p2*(1 - 4*t + 3*t2) +
    //        p3*(2*t - 3*t2) +
    //        p4*(t2);

    cubicTangentTemp1.set(p1.x, p1.y, p1.z).multiplyScalar(-1 + 2*t - t2);
    cubicTangentTemp2.set(p2.x, p2.y, p2.z).multiplyScalar(1 - 4*t + 3*t2);
    cubicTangentTemp3.set(p3.x, p3.y, p3.z).multiplyScalar(2*t - 3*t2);
    cubicTangentTemp4.set(p4.x, p4.y, p4.z).multiplyScalar(t2);

    return cubicTangentTemp1.clone(new Vector3()).
      add(cubicTangentTemp2).
      add(cubicTangentTemp3).
      add(cubicTangentTemp4);
  }

  // Creates vertices for a patch that is tessellated at the specified level.
  // Calls the specified outputVertex function for each generated vertex,
  // passing the position, normal, and texture coordinate as parameters.
  function createPatchVertices(patch: Vector3[], tessellation: number, isMirrored: boolean, positions: Vector3[], normals: Vector3[], textureCoordinates: Vector2[]) {
    for (var i = 0; i <= tessellation; i++) {
      var u = i/tessellation;

      for (var j = 0; j <= tessellation; j++) {
        var v = j/tessellation;

        // Perform four horizontal bezier interpolations
        // between the control points of this patch.
        var p1 = cubicInterpolate(patch[0], patch[1], patch[2], patch[3], u);
        var p2 = cubicInterpolate(patch[4], patch[5], patch[6], patch[7], u);
        var p3 = cubicInterpolate(patch[8], patch[9], patch[10], patch[11], u);
        var p4 = cubicInterpolate(patch[12], patch[13], patch[14], patch[15], u);

        // Perform a vertical interpolation between the results of the
        // previous horizontal interpolations, to compute the position.
        var position = cubicInterpolate(p1, p2, p3, p4, v);

        // Perform another four bezier interpolations between the control
        // points, but this time vertically rather than horizontally.
        var q1 = cubicInterpolate(patch[0], patch[4], patch[8], patch[12], v);
        var q2 = cubicInterpolate(patch[1], patch[5], patch[9], patch[13], v);
        var q3 = cubicInterpolate(patch[2], patch[6], patch[10], patch[14], v);
        var q4 = cubicInterpolate(patch[3], patch[7], patch[11], patch[15], v);

        // Compute vertical and horizontal tangent vectors.
        var tangent1 = cubicTangent(p1, p2, p3, p4, v);
        var tangent2 = cubicTangent(q1, q2, q3, q4, u);

        // Cross the two tangent vectors to compute the normal.
        var normal = Vector3.cross(tangent1, tangent2);

        if (!normal.nearEqual(new Zia.Vector3(), new Zia.Vector3(1e-7))) {
          normal.normalize();

          // If this patch is mirrored, we must invert the normal.
          if (isMirrored) {
            normal.negate();
          }
        } else {
          // In a tidy and well constructed bezier patch, the preceding
          // normal computation will always work. But the classic teapot
          // model is not tidy or well constructed! At the top and bottom
          // of the teapot, it contains degenerate geometry where a patch
          // has several control points in the same place, which causes
          // the tangent computation to fail and produce a zero normal.
          // We 'fix' these cases by just hard-coding a normal that points
          // either straight up or straight down, depending on whether we
          // are on the top or bottom of the teapot. This is not a robust
          // solution for all possible degenerate bezier patches, but hey,
          // it's good enough to make the teapot work correctly!
          normal.x = 0.0;
          normal.y = position.y < 0.0 ? -1.0 : 1.0;
          normal.z = 0.0;
        }

        // Compute the texture coordinate.
        var mirroredU = isMirrored ? 1 - u : u;

        var textureCoordinate = new Zia.Vector2(mirroredU, 1 - v);

        // Output this vertex.
        positions.push(position);
        normals.push(normal);
        textureCoordinates.push(textureCoordinate);
      }
    }
  }

  // Tessellates the specified bezier patch.
  function tessellatePatch(positions: Vector3[], normals: Vector3[], textureCoordinates: Vector2[], indices: number[], patch: TeapotPatch, tessellation: number, scale: Vector3, isMirrored: boolean) {
    // Look up the 16 control points for this patch.
    var controlPoints: Vector3[] = new Array(16);

    for (var i = 0; i < 16; i++) {
      controlPoints[i] = teapotControlPoints[patch.indices[i]].clone(new Vector3()).multiply(scale);
    }

    // Create the index data.
    var vbase = positions.length;
    Array.prototype.push.apply(indices, createPatchIndices(tessellation, isMirrored, vbase));
    createPatchVertices(controlPoints, tessellation, isMirrored, positions, normals, textureCoordinates);
  }

  /** Creates a teapot primitive. */
  export function createTeapot(size = 1.0, tessellation = 8): IPrimitive {
    if (tessellation < 1) {
      throw "tessellation must be > 0";
    }

    var positions: Vector3[] = [];
    var normals: Vector3[] = [];
    var textureCoordinates: Vector2[] = [];
    var indices: number[] = [];

    var scaleVector = new Vector3(size, size, size);
    var scaleNegateX = scaleVector.clone(new Vector3());
    scaleNegateX.x = -scaleNegateX.x;
    var scaleNegateZ = scaleVector.clone(new Vector3());
    scaleNegateZ.z = -scaleNegateZ.z;
    var scaleNegateXZ = new Vector3(-size, size, -size);

    for (var i = 0; i < teapotPatches.length; i++) {
      var patch = teapotPatches[i];

      // Because the teapot is symmetrical from left to right, we only store
      // data for one side, then tessellate each patch twice, mirroring in X.
      tessellatePatch(positions, normals, textureCoordinates, indices, patch, tessellation, scaleVector, false);
      tessellatePatch(positions, normals, textureCoordinates, indices, patch, tessellation, scaleNegateX, true);

      if (patch.mirrorZ) {
        // Some parts of the teapot (the body, lid, and rim, but not the
        // handle or spout) are also symmetrical from front to back, so
        // we tessellate them four times, mirroring in Z as well as X.
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
  };
}
