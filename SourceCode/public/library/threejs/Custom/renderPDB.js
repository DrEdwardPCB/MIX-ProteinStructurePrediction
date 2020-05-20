function buildPDBScene(scenedom, data, chain) {
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //setting up view
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

    var loader = new PDBLoader();
    //console.log(loader)
    var pdb = loader.parse(data)

    
    var root = new THREE.Group();

    var boxGeometry = new THREE.BoxBufferGeometry(1, 1, 1)
    var sphereGeometry = new THREE.SphereGeometry(0.2, 8, 8)
    
    //only main chain atom will be shown for simplicity
    var start = new THREE.Vector3();
    var end = new THREE.Vector3();
    //filter to main chain
    pdb=pdb.filter(e=>{return e.type=='C'||e.type=='CA'||e.type=='N'})
    //filter to only chain A
    pdb=pdb.filter(e=>{return e.chain==chain})
    //console.log(pdb)
    var mesharray=[]
    for (var i = 0; i < pdb.length; i++) {
        var material;
        var bondmaterial;

        if(pdb[i].type=='N'){
            material=new THREE.MeshPhongMaterial({ color: 0x0000ff })
        }else if(pdb[i].type=='CA'){
            material = new THREE.MeshPhongMaterial({color:0x111111})
        }else if(pdb[i].type=='C'){
            material = new THREE.MeshPhongMaterial({color:0x888888})
        }
        if(pdb[i].ss=='a'){
            bondmaterial=new THREE.MeshPhongMaterial({ color: 0xff0000 })
        }else if(pdb[i].ss=='s'){
            bondmaterial = new THREE.MeshPhongMaterial({color:0x00ff00})
        }else if(pdb[i].ss=='t'){
            bondmaterial = new THREE.MeshPhongMaterial({color:0x0000ff})
        }else{
            bondmaterial = new THREE.MeshPhongMaterial({color:0x0f0f0f})
        }
        
        if(i==0){
            var atom=new THREE.Mesh(sphereGeometry, material);
            atom.position.copy(new THREE.Vector3(pdb[i].x,pdb[i].y,pdb[i].z))
            root.add(atom)
            atom.userData=pdb[i]
            mesharray.push(atom)
            camera.position.set(atom.position.x,atom.position.y,atom.position.z+5)
            controls.target.copy(atom.position)
            start.copy(atom.position)
            if(start.distanceTo(end)<2){
                root.add(bond)
            };
            
        }else if(i==1){
            var atom=new THREE.Mesh(sphereGeometry, material);
            atom.position.copy(new THREE.Vector3(pdb[i].x,pdb[i].y,pdb[i].z))
            root.add(atom);
            atom.userData=pdb[i]
            mesharray.push(atom)
            end.copy(atom.position)
            var bond = new THREE.Mesh(boxGeometry,bondmaterial)
            bond.position.copy(start)
            bond.position.lerp(end,0.5)
            bond.scale.set(0.1,0.1,start.distanceTo(end))
            bond.lookAt(end)
            if(start.distanceTo(end)<2){
                root.add(bond)
            }
            
        }else{
            var atom=new THREE.Mesh(sphereGeometry, material);
            atom.position.copy(new THREE.Vector3(pdb[i].x,pdb[i].y,pdb[i].z))
            root.add(atom);
            atom.userData=pdb[i]
            mesharray.push(atom)
            start.copy(end)
            end.copy(atom.position)
            var bond = new THREE.Mesh(boxGeometry,bondmaterial)
            bond.position.copy(start)
            bond.position.lerp(end,0.5)
            bond.scale.set(0.1,0.1,start.distanceTo(end))
            bond.lookAt(end)
            if(start.distanceTo(end)<2){
                root.add(bond)
            }
        }
        
    }

    
    //console.log('done adding')

    //缩放并将模型组添加到场景当中
    /*root.scale.set(0.1, 0.1, 0.1);
    //scene.add(root);
    */
    scene.add(root);
    //console.log(scene)

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
   
    mesharray=mesharray.reduce((accum,curr)=>{
        if(accum[curr.userData.residuePosition]==undefined){
            accum[curr.userData.residuePosition]={
                residue:curr.userData.residue,
                position:curr.userData.residuePosition,
                mesh:[curr]
            }
            return accum
        }else{
            accum[curr.userData.residuePosition].mesh.push(curr)
            return accum
        }
    },{})
    return mesharray
}
