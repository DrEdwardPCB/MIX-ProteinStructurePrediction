function buildYScene(scenedom, data) {
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //setting up view
    console.log(typeof(scenedom))
    console.log(document.getElementById(scenedom))
    var scene = new THREE.Scene()
    var camera = new THREE.PerspectiveCamera(75, document.getElementById(scenedom).getBoundingClientRect().width / document.getElementById(scenedom).getBoundingClientRect().height, 0.1, 1000)
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(document.getElementById(scenedom).getBoundingClientRect().width, document.getElementById(scenedom).getBoundingClientRect().height);
    document.getElementById(scenedom).appendChild(renderer.domElement);
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    scene.add(directionalLight);
    var light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();
    camera.position.z = 5;
    scene.background = new THREE.Color(0xf0f0f0)
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //rendering material
    //render base on https://ars.els-cdn.com/content/image/3-s2.0-B978012416687500004X-f04-02-9780124166875.jpg?_
    var arrayData = data.arraySync()
    //console.log(positionalArray)
    console.log('done mapping')
    var arbg = new THREE.SphereGeometry(0.4, 8, 8);
    var arbm = new THREE.MeshPhongMaterial({ color: 0xffffff });
    var arb = new THREE.Mesh(arbg, arbm);
    var boxGeometry = new THREE.BoxBufferGeometry(1, 1, 1)
    var start = new THREE.Vector3()
    var end = new THREE.Vector3()
    scene.add(arb);
    console.log(arrayData)
    var mesharray = []
    for (var i = 0; i < arrayData.length; i++) {
        //create N
        /*
        if(arraydata==''){
            bondmaterial=new THREE.MeshPhongMaterial({ color: 0xff0000 })
        }else if(pdb[i].ss=='s'){
            bondmaterial = new THREE.MeshPhongMaterial({color:0x00ff00})
        }else if(pdb[i].ss=='t'){
            bondmaterial = new THREE.MeshPhongMaterial({color:0x0000ff})
        }else{
            bondmaterial = new THREE.MeshPhongMaterial({color:0x0f0f0f})
        }*/
        var psi = arrayData[i][5]
        var phi = arrayData[i][4]
        if (i == 0) {
            var Ngeometry = new THREE.SphereGeometry(0.2, 8, 8);
            var Nmaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff });
            var Nitrogen = new THREE.Mesh(Ngeometry, Nmaterial);
            Nitrogen.position.copy(arb.position)
            scene.add(Nitrogen)
            Nitrogen.userData = arrayData[i]
            mesharray.push(Nitrogen)
            start.copy(arb.position)

            //create Ca
            var Cageometry = new THREE.SphereGeometry(0.2, 8, 8);
            var Camaterial = new THREE.MeshPhongMaterial({ color: 0x111111 });
            var CarbonAlpha = new THREE.Mesh(Cageometry, Camaterial);
            arb.rotateZ(d2r(180 - 114))
            arb.rotateX(d2r(phi))
            arb.translateX(1.47)
            CarbonAlpha.position.copy(arb.position)
            scene.add(CarbonAlpha)
            CarbonAlpha.userData = arrayData[i]
            mesharray.push(CarbonAlpha)

            end.copy(arb.position)
            //add bond between N and Ca
            var Bond1 = new THREE.Mesh(boxGeometry, new THREE.MeshPhongMaterial(0xffffff));
            Bond1.position.copy(start);
            Bond1.position.lerp(end, 0.5);
            Bond1.scale.set(0.1, 0.1, start.distanceTo(end))
            Bond1.lookAt(end)
            scene.add(Bond1)

            //create C
            var Cgeometry = new THREE.SphereGeometry(0.2, 8, 8);
            var Cmaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
            var Carbon = new THREE.Mesh(Cgeometry, Cmaterial);
            arb.rotateZ(d2r(180 - 110))// non dihedral, dihedral is rotateX
            arb.rotateX(d2r(psi))
            arb.translateX(1.53)
            Carbon.position.copy(arb.position)
            scene.add(Carbon)
            Carbon.userData = arrayData[i]
            mesharray.push(Carbon)

            start.copy(end)
            end.copy(arb.position)
            //add bond between Ca and C
            var Bond2 = new THREE.Mesh(boxGeometry, new THREE.MeshPhongMaterial(0xffffff));
            Bond2.position.copy(start);
            Bond2.position.lerp(end, 0.5);
            Bond2.scale.set(0.1, 0.1, start.distanceTo(end))
            Bond2.lookAt(end)
            scene.add(Bond2)
        } else {
            //var prevpsi= arrayData[i-1][5]
            var psi = arrayData[i][5]
            var phi = arrayData[i][4]
            var Ngeometry = new THREE.SphereGeometry(0.2, 8, 8);
            var Nmaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff });
            var Nitrogen = new THREE.Mesh(Ngeometry, Nmaterial);
            arb.rotateZ(d2r(180 - 123))
            arb.rotateX(d2r(180))//ensure trans configuration at C->N
            arb.translateX(1.32)
            Nitrogen.position.copy(arb.position)
            scene.add(Nitrogen)
            Nitrogen.userData = arrayData[i]
            mesharray.push(Nitrogen)

            start.copy(end)
            end.copy(arb.position)
            //add bond between C and N
            var Bond1 = new THREE.Mesh(boxGeometry, new THREE.MeshPhongMaterial(0xffffff));
            Bond1.position.copy(start);
            Bond1.position.lerp(end, 0.5);
            Bond1.scale.set(0.1, 0.1, start.distanceTo(end))
            Bond1.lookAt(end)
            scene.add(Bond1)

            //create Ca
            var Cageometry = new THREE.SphereGeometry(0.2, 8, 8);
            var Camaterial = new THREE.MeshPhongMaterial({ color: 0x111111 });
            var CarbonAlpha = new THREE.Mesh(Cageometry, Camaterial);

            arb.rotateZ(d2r(180 - 114))
            arb.rotateX(d2r(phi))
            arb.translateX(1.47)
            CarbonAlpha.position.copy(arb.position)
            scene.add(CarbonAlpha)
            CarbonAlpha.userData = arrayData[i]
            mesharray.push(CarbonAlpha)

            start.copy(end)
            end.copy(arb.position)
            //add bond between N and Ca
            var Bond2 = new THREE.Mesh(boxGeometry, new THREE.MeshPhongMaterial(0xffffff));
            Bond2.position.copy(start);
            Bond2.position.lerp(end, 0.5);
            Bond2.scale.set(0.1, 0.1, start.distanceTo(end))
            Bond2.lookAt(end)
            scene.add(Bond2)

            //create C
            var Cgeometry = new THREE.SphereGeometry(0.2, 8, 8);
            var Cmaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
            var Carbon = new THREE.Mesh(Cgeometry, Cmaterial);

            arb.rotateZ(d2r(180 - 110))// non dihedral, dihedral is rotateX
            arb.rotateX(d2r(psi))
            arb.translateX(1.53)
            Carbon.position.copy(arb.position)
            scene.add(Carbon)
            Carbon.userData = arrayData[i]
            mesharray.push(Carbon)

            start.copy(end)
            end.copy(arb.position)
            //add bond between Ca and C
            var Bond3 = new THREE.Mesh(boxGeometry, new THREE.MeshPhongMaterial(0xffffff));
            Bond3.position.copy(start);
            Bond3.position.lerp(end, 0.5);
            Bond3.scale.set(0.1, 0.1, start.distanceTo(end))
            Bond3.lookAt(end)
            scene.add(Bond3)

        }
        scene.remove(arb)

    }
    console.log('done adding')
    //////////////////////////////////RUBBISH////////////////////////////
    //var geometry = new THREE.BoxGeometry();                          //
    //var material = new THREE.MeshPhongMaterial({ color: 0x00ff00 }); //
    //var cube = new THREE.Mesh(geometry, material);                   //
    //scene.add(cube);                                                 //
    ///////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //animation
    var animate = function () {
        requestAnimationFrame(animate);

        //cube.rotation.x += 0.01;
        //cube.rotation.y += 0.01;
        controls.update();
        renderer.render(scene, camera);
    };

    animate();
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // handle resize
    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {
        camera.aspect = document.getElementById(scenedom).getBoundingClientRect().width / document.getElementById(scenedom).getBoundingClientRect().height;
        camera.updateProjectionMatrix();
        renderer.setSize(document.getElementById(scenedom).getBoundingClientRect().width, document.getElementById(scenedom).getBoundingClientRect().height);

    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function d2r(degrees) {
        var pi = Math.PI;
        return degrees * (pi / 180);
    }
    var newmesharray={}
    for(var i=0;i<mesharray.length;i+=3){
        var ss=''
        if(mesharray[i].userData[0]==1){
            ss='a'
        }else if(mesharray[i].userData[1]==1){
            ss='b'
        }else if(mesharray[i].userData[2]==1){
            ss='t'
        }else if(mesharray[i].userData[3]==1){
            ss=undefined
        }
        newmesharray[Math.round(i/3)]= {
            ss:ss,
            mesh:[]
        }
        newmesharray[Math.round(i/3)].mesh.push(mesharray[i])
        newmesharray[Math.round(i/3)].mesh.push(mesharray[i+1])
        newmesharray[Math.round(i/3)].mesh.push(mesharray[i+2])
    }

    return newmesharray
}
