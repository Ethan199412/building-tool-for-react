import * as React from "react";
import "./app.less";
import { mult, pow } from '../utils'
import * as Three from 'three'
console.log('[p1]', mult(2, 3))
// 需要放 index.d.ts 文件到根目录并在 tsconfig
// includes 里引入才能解决 vscode 报错
import img from "../assets/react.jpg";

console.log('[p2]', { Three })
console.log('app.tsx 加载')
if (module.hot) {
    module.hot.accept('./app.tsx', () => {
        console.log('[p0] hot module replacement')
    })
}

let scene, camera, renderer, axes, plane
const {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    Color,
    AxisHelper,
    PlaneGeometry,
    MeshBasicMaterial,
    Mesh
} = Three
class App extends React.Component {
    constructor(props: any) {
        super(props);
        console.log('[p1]', module.hot);
    }

    componentDidMount() {
        this.init()
    }

    addCube = () => {
        let cubeGeometry = new Three.BoxGeometry(4, 4, 4)
        let cubeMaterial = new Three.MeshLambertMaterial({ color: 0xff0000 })
        const cube = new Mesh(cubeGeometry, cubeMaterial)
        cube.position.x = 0
        cube.position.y = 4
        cube.position.z = 4

        cube.castShadow = true
        scene.add(cube)
    }

    addLight = () => {
        let spotLight = new Three.SpotLight(0xffffff)
        spotLight.position.set(-20, 20, -30)
        spotLight.castShadow = true
        scene.add(spotLight)
    }

    addBall = () => {
        let sphereGeometry = new Three.SphereGeometry(4, 20, 30);
        let sphereMaterial = new Three.MeshLambertMaterial({ color: 0xff0000 })
        let sphere = new Three.Mesh(sphereGeometry, sphereMaterial)

        sphere.position.x = 10
        sphere.position.y = 5
        sphere.position.z = 0

        sphere.castShadow = true
        scene.add(sphere)

    }

    init = () => {
        scene = new Scene()
        camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000)
        renderer = new WebGLRenderer()
        renderer.setClearColor(new Color(0xEEEEEE))
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.shadowMapEnabled = true
        axes = new AxisHelper(20)
        scene.add(axes)
        let planGeometry = new PlaneGeometry(60, 20)
        let planMaterial = new MeshBasicMaterial({ color: 0xcccccc })
        plane = new Mesh(planGeometry, planMaterial)

        plane.rotation.x = -0.5 * Math.PI
        plane.position.x = 0
        plane.position.y = 0
        plane.position.z = 0
        plane.castShadow = true
        plane.receiveShadow = true

        scene.add(plane)

        this.addCube()
        this.addLight()
        this.addBall()
        // x 红，y 绿，z 蓝
        camera.position.x = 30
        camera.position.y = 30
        camera.position.z = 30
        camera.lookAt(scene.position)

        document.getElementById('webgl-container').appendChild(renderer.domElement)
        renderer.render(scene, camera)
    }
    render() {
        return (
            <div className="App" >
                <img src={img} style={{ width: 100 }} /> */}
                <h1> This is a building Tool designed by Ethan, Welcome for using. </h1>
                <h2> The TS Version </h2>
                <div>
                    compared with create - react - app, this building tool will expose
                    webpack.config.js so that you could customize for your project.
                </div>
                <div> boy ♂ next ♂ door </div>
                <div>全给党</div>
                <div id="webgl-container"></div>
            </div>
        );
    }
}

export default App;