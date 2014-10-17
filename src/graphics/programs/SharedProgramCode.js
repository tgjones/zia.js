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
// The following code is a port of XNA StockEffects http://xbox.create.msdn.com/en-US/education/catalog/sample/stock_effects
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
//-----------------------------------------------------------------------------
// Common.fxh
//
// Microsoft XNA Community Game Platform
// Copyright (C) Microsoft Corporation. All rights reserved.
//-----------------------------------------------------------------------------

Zia.SharedProgramCode = {

  common: [
    "void AddSpecular(inout vec4 color, vec3 specular) {",
    "  color.rgb += specular * color.a;",
    "}"
  ].join('\n'),

  lighting: [
    "struct ColorPair {",
    "  vec3 Diffuse;",
    "  vec3 Specular;",
    "};",

    "ColorPair ComputeLights(vec3 eyeVector, vec3 worldNormal) {",
    "  mat3 lightDirections;",
    "  mat3 lightDiffuse;",
    "  mat3 lightSpecular;",
    "  mat3 halfVectors;",

    "  for (int i = 0; i < 3; i++) {",
    "    lightDirections[i] = mat3(uDirLight0Direction,     uDirLight1Direction,     uDirLight2Direction)    [i];",
    "    lightDiffuse[i]    = mat3(uDirLight0DiffuseColor,  uDirLight1DiffuseColor,  uDirLight2DiffuseColor) [i];",
    "    lightSpecular[i]   = mat3(uDirLight0SpecularColor, uDirLight1SpecularColor, uDirLight2SpecularColor)[i];",
    "    halfVectors[i] = normalize(eyeVector - lightDirections[i]);",
    "  }",

    "  vec3 dotL = worldNormal * -lightDirections;",
    "  vec3 dotH = worldNormal * halfVectors;",

    "  vec3 zeroL = step(vec3(0.0), dotL);",

    "  vec3 diffuse  = zeroL * dotL;",
    "  vec3 specular = pow(max(dotH, vec3(0.0)) * zeroL, vec3(uSpecularPower));",

    "  ColorPair result;",

    "  result.Diffuse  = (lightDiffuse * diffuse)  * uDiffuseColor.rgb + uEmissiveColor;",
    "  result.Specular = (lightSpecular * specular) * uSpecularColor;",

    "  return result;",
    "}"
  ].join('\n'),

  lightingVertex: [
    "void ComputeCommonVSOutputWithLighting(vec4 position, vec3 normal) {",
    "  vec4 positionWS = uMMatrix * position;",
    "  vec3 eyeVector = normalize(uEyePosition - positionWS.xyz);",
    "  vec3 worldNormal = normalize(uMMatrixInverseTranspose * normal);",

    "  ColorPair lightResult = ComputeLights(eyeVector, worldNormal);",
    
    "  vDiffuseColor = vec4(lightResult.Diffuse, uDiffuseColor.a);",
    "  vSpecularColor = lightResult.Specular;",
    "}"
  ].join('\n')

};