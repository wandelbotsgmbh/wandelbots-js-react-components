import{r as y,a9 as G}from"./iframe-B_v-8-lB.js";import{U as V}from"./three.module-JKIWMgkV.js";import{dJ as ie,k as F,dK as I,dQ as B,fW as se,cF as W,fh as X,V as b,av as oe,bK as q,q as Y,n as re,a as M,e5 as ae,b as le,eo as ce,C as de}from"./three.core-CGXRouN8.js";import{v as Z,u as fe}from"./PresetEnvironment-Di_iWZE9.js";const ee=Z>=125?"uv1":"uv2",k=new W,O=new b;class j extends ie{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],s=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(s),this.setAttribute("position",new F(e,3)),this.setAttribute("uv",new F(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,s=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),s.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const s=new I(t,6,1);return this.setAttribute("instanceStart",new B(s,3,0)),this.setAttribute("instanceEnd",new B(s,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let s;e instanceof Float32Array?s=e:Array.isArray(e)&&(s=new Float32Array(e));const n=new I(s,t*2,1);return this.setAttribute("instanceColorStart",new B(n,t,0)),this.setAttribute("instanceColorEnd",new B(n,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new se(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new W);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),k.setFromBufferAttribute(t),this.boundingBox.union(k))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new X),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const s=this.boundingSphere.center;this.boundingBox.getCenter(s);let n=0;for(let i=0,a=e.count;i<a;i++)O.fromBufferAttribute(e,i),n=Math.max(n,s.distanceToSquared(O)),O.fromBufferAttribute(t,i),n=Math.max(n,s.distanceToSquared(O));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}class te extends j{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const t=e.length-3,s=new Float32Array(2*t);for(let n=0;n<t;n+=3)s[2*n]=e[n],s[2*n+1]=e[n+1],s[2*n+2]=e[n+2],s[2*n+3]=e[n+3],s[2*n+4]=e[n+4],s[2*n+5]=e[n+5];return super.setPositions(s),this}setColors(e,t=3){const s=e.length-t,n=new Float32Array(2*s);if(t===3)for(let i=0;i<s;i+=t)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];else for(let i=0;i<s;i+=t)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5],n[2*i+6]=e[i+6],n[2*i+7]=e[i+7];return super.setColors(n,t),this}fromLine(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class N extends oe{constructor(e){super({type:"LineMaterial",uniforms:q.clone(q.merge([V.common,V.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new Y(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${Z>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(t){this.uniforms.diffuse.value=t}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(t){this.uniforms.linewidth.value=t}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(t){!!t!="USE_DASH"in this.defines&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(t){this.uniforms.dashScale.value=t}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(t){this.uniforms.dashSize.value=t}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(t){this.uniforms.dashOffset.value=t}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(t){this.uniforms.gapSize.value=t}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(t){this.uniforms.opacity.value=t}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(t){this.uniforms.resolution.value.copy(t)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(t){!!t!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),t===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}const T=new M,$=new b,J=new b,c=new M,d=new M,S=new M,R=new b,H=new le,f=new ae,K=new b,C=new W,D=new X,w=new M;let x,L;function Q(l,e,t){return w.set(0,0,-e,1).applyMatrix4(l.projectionMatrix),w.multiplyScalar(1/w.w),w.x=L/t.width,w.y=L/t.height,w.applyMatrix4(l.projectionMatrixInverse),w.multiplyScalar(1/w.w),Math.abs(Math.max(w.x,w.y))}function ue(l,e){const t=l.matrixWorld,s=l.geometry,n=s.attributes.instanceStart,i=s.attributes.instanceEnd,a=Math.min(s.instanceCount,n.count);for(let o=0,p=a;o<p;o++){f.start.fromBufferAttribute(n,o),f.end.fromBufferAttribute(i,o),f.applyMatrix4(t);const v=new b,m=new b;x.distanceSqToSegment(f.start,f.end,m,v),m.distanceTo(v)<L*.5&&e.push({point:m,pointOnLine:v,distance:x.origin.distanceTo(m),object:l,face:null,faceIndex:o,uv:null,[ee]:null})}}function pe(l,e,t){const s=e.projectionMatrix,i=l.material.resolution,a=l.matrixWorld,o=l.geometry,p=o.attributes.instanceStart,v=o.attributes.instanceEnd,m=Math.min(o.instanceCount,p.count),u=-e.near;x.at(1,S),S.w=1,S.applyMatrix4(e.matrixWorldInverse),S.applyMatrix4(s),S.multiplyScalar(1/S.w),S.x*=i.x/2,S.y*=i.y/2,S.z=0,R.copy(S),H.multiplyMatrices(e.matrixWorldInverse,a);for(let g=0,z=m;g<z;g++){if(c.fromBufferAttribute(p,g),d.fromBufferAttribute(v,g),c.w=1,d.w=1,c.applyMatrix4(H),d.applyMatrix4(H),c.z>u&&d.z>u)continue;if(c.z>u){const r=c.z-d.z,h=(c.z-u)/r;c.lerp(d,h)}else if(d.z>u){const r=d.z-c.z,h=(d.z-u)/r;d.lerp(c,h)}c.applyMatrix4(s),d.applyMatrix4(s),c.multiplyScalar(1/c.w),d.multiplyScalar(1/d.w),c.x*=i.x/2,c.y*=i.y/2,d.x*=i.x/2,d.y*=i.y/2,f.start.copy(c),f.start.z=0,f.end.copy(d),f.end.z=0;const A=f.closestPointToPointParameter(R,!0);f.at(A,K);const U=ce.lerp(c.z,d.z,A),E=U>=-1&&U<=1,P=R.distanceTo(K)<L*.5;if(E&&P){f.start.fromBufferAttribute(p,g),f.end.fromBufferAttribute(v,g),f.start.applyMatrix4(a),f.end.applyMatrix4(a);const r=new b,h=new b;x.distanceSqToSegment(f.start,f.end,h,r),t.push({point:h,pointOnLine:r,distance:x.origin.distanceTo(h),object:l,face:null,faceIndex:g,uv:null,[ee]:null})}}}class ne extends re{constructor(e=new j,t=new N({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,s=e.attributes.instanceEnd,n=new Float32Array(2*t.count);for(let a=0,o=0,p=t.count;a<p;a++,o+=2)$.fromBufferAttribute(t,a),J.fromBufferAttribute(s,a),n[o]=o===0?0:n[o-1],n[o+1]=n[o]+$.distanceTo(J);const i=new I(n,2,1);return e.setAttribute("instanceDistanceStart",new B(i,1,0)),e.setAttribute("instanceDistanceEnd",new B(i,1,1)),this}raycast(e,t){const s=this.material.worldUnits,n=e.camera;n===null&&!s&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const i=e.params.Line2!==void 0&&e.params.Line2.threshold||0;x=e.ray;const a=this.matrixWorld,o=this.geometry,p=this.material;L=p.linewidth+i,o.boundingSphere===null&&o.computeBoundingSphere(),D.copy(o.boundingSphere).applyMatrix4(a);let v;if(s)v=L*.5;else{const u=Math.max(n.near,D.distanceToPoint(x.origin));v=Q(n,u,p.resolution)}if(D.radius+=v,x.intersectsSphere(D)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),C.copy(o.boundingBox).applyMatrix4(a);let m;if(s)m=L*.5;else{const u=Math.max(n.near,C.distanceToPoint(x.origin));m=Q(n,u,p.resolution)}C.expandByScalar(m),x.intersectsBox(C)!==!1&&(s?ue(this,t):pe(this,n,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport(T),this.material.uniforms.resolution.value.set(T.z,T.w))}}class he extends ne{constructor(e=new te,t=new N({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}}const Se=y.forwardRef(function({points:e,color:t=16777215,vertexColors:s,linewidth:n,lineWidth:i,segments:a,dashed:o,...p},v){var m,u;const g=fe(E=>E.size),z=y.useMemo(()=>a?new ne:new he,[a]),[_]=y.useState(()=>new N),A=(s==null||(m=s[0])==null?void 0:m.length)===4?4:3,U=y.useMemo(()=>{const E=a?new j:new te,P=e.map(r=>{const h=Array.isArray(r);return r instanceof b||r instanceof M?[r.x,r.y,r.z]:r instanceof Y?[r.x,r.y,0]:h&&r.length===3?[r[0],r[1],r[2]]:h&&r.length===2?[r[0],r[1],0]:r});if(E.setPositions(P.flat()),s){t=16777215;const r=s.map(h=>h instanceof de?h.toArray():h);E.setColors(r.flat(),A)}return E},[e,a,s,A]);return y.useLayoutEffect(()=>{z.computeLineDistances()},[e,z]),y.useLayoutEffect(()=>{o?_.defines.USE_DASH="":delete _.defines.USE_DASH,_.needsUpdate=!0},[o,_]),y.useEffect(()=>()=>{U.dispose(),_.dispose()},[U]),y.createElement("primitive",G({object:z,ref:v},p),y.createElement("primitive",{object:U,attach:"geometry"}),y.createElement("primitive",G({object:_,attach:"material",color:t,vertexColors:!!s,resolution:[g.width,g.height],linewidth:(u=n??i)!==null&&u!==void 0?u:1,dashed:o,transparent:A===4},p)))});export{Se as L};
