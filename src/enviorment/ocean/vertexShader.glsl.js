
// TODO fix!
export default /** glsl */`
uniform float time;
void main()	{
    vec4 v = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, sin(time + position.x*0.1)*5.0*sin(position.x * 0.01), 1.0);
    gl_Position = v;
}
`