// this is one big makehead function and one update hair function

function makelionhead() {	

	// sphere face 
	var geometry = new THREE.SphereBufferGeometry( 40, 200, 200 );
	var material = new THREE.MeshStandardMaterial( { 
		metalness: 0.0,
		metalness: 0.0,
		roughness: 2,
		map : new THREE.CanvasTexture(colcanvas),
		displacementMap: new THREE.CanvasTexture(bumpcanvas),
		displacementScale: -20		
	} );

	window.face = new THREE.Mesh( geometry, material );
	face.scale.y = 0.8;
	face.scale.x = 0.8;
	
	head.add( face );
	face.castShadow = true;
	face.material.map.magFilter = THREE.NearestFilter;
	face.material.map.minFilter = THREE.NearestFilter;


	// whiskers
	const wgeometry = new THREE.PlaneGeometry( 30, 30 );
	const wmaterial = new THREE.MeshBasicMaterial( { 
		alphaTest:0.2,
		transparent:true,
		color:0x000000,
		opacity:0.3,
		side: THREE.DoubleSide,
		map : new THREE.TextureLoader().load( 'assets/whisker.png' )
	} );

	wmaterial.map.magFilter = THREE.NearestFilter;
	wmaterial.map.minFilter = THREE.NearestFilter;

	const w1 = new THREE.Mesh( wgeometry, wmaterial );
	w1.position.x = 35;
	w1.position.y = 6.5;
	w1.position.z = 14;
	w1.rotation.y = Math.PI/2;
	face.add( w1 );

	//
	w2 = w1.clone();
	w2.position.z = -14;
	w2.scale.x = -1;
	face.add( w2 );



	// eyes
	window.eyeopen = new THREE.TextureLoader().load( 'assets/eye.png' );
	window.eyeblink = new THREE.TextureLoader().load( 'assets/eyeblink.png' );
	const eyegeometry = new THREE.SphereGeometry( 10, 32, 16 );
	window.imaterial = new THREE.MeshLambertMaterial( { map : eyeopen } );
	const eye = new THREE.Mesh( eyegeometry, imaterial );
	eye.position.x = 20;
	eye.position.y = 17;
	eye.position.z = 13;
	eye.scale.x = 0.5;
	eye.rotation.z = Math.PI/6;
	eye.rotation.y = -Math.PI/12;
	head.add( eye );

	const leye = new THREE.Mesh( eyegeometry, imaterial );
	leye.position.x = 20;
	leye.position.y = 17;
	leye.position.z = -13;
	leye.scale.x = 0.5;
	leye.rotation.z = Math.PI/6;
	leye.rotation.y = Math.PI/12;
	head.add( leye );



	// ears
	const egeometry = new THREE.SphereGeometry( 12.5, 32, 32 );

	var ematerial = new THREE.MeshStandardMaterial( { 
		metalness: 0.0,
		map : new THREE.TextureLoader().load( 'assets/earcol.png' ),
		displacementMap: new THREE.TextureLoader().load( 'assets/earbmp.png' ),
		displacementScale: -20
	} );
	ear = new THREE.Mesh( egeometry, ematerial );
	ear.scale.y = 0.5;
	ear.position.y = 26;
	ear.position.z = 26;
	ear.rotation.z = -Math.PI/1.8;
	ear.rotation.x = Math.PI/8;

	head.add( ear );

	//
	lear = ear.clone();
	lear.position.z = -26;
	lear.scale.z = -1;
	head.add( lear );


	// teeth
	const tgeometry = new THREE.SphereGeometry( 2, 8, 8 );
	const tooth = new THREE.Mesh( tgeometry, new THREE.MeshLambertMaterial( {color:0xebe2b2}) );
	tooth.scale.y = 2.5;
	tooth.position.y = -4;
	tooth.position.x = 23;
	tooth.position.z = 14;
	tooth.rotation.z = -Math.PI/11;
	teeth.add( tooth );
	//
	var ltooth = tooth.clone();
	ltooth.position.z = -14;
	teeth.add( ltooth );

	// tongue
	const tmaterial = new THREE.MeshLambertMaterial( { 
		color: 0xda0d50
	} );
	var tngeometry = new THREE.SphereGeometry(12, 32, 32);
	var tongue = new THREE.Mesh( tngeometry, tmaterial );
	tongue.position.set(10,-14,0);
	tongue.scale.x = 0.5;
	tongue.rotation.z = Math.PI/3;
	head.add( tongue );


	// hair
	var hair_geo = new THREE.SphereGeometry(40, 100, 100);
	var hmaterial = new THREE.MeshLambertMaterial({ 
		color: 0x744919
	});
	hair = new THREE.Mesh(hair_geo, hmaterial);
	hair.scale.set(30,35,60);
	hair.position.set(-28,10,0);	
	hair.rotation.z = -Math.PI/9;
	head.add(hair);

	updatethis(hair)
	headfinished = true;
	startup();
} // end makelionhead


// update hair
function updatethis(hair) {
		var time = audioPlayer.currentTime;
		// var time = performance.now() * 0.001;

		var k = 3;
		for (var i = 0; i < hair.geometry.vertices.length; i++) {
			var p = hair.geometry.vertices[i];
			p.normalize().multiplyScalar(1 + 0.4 * noise.perlin3(p.x * k + (time), p.y * k, p.z * k));
		}
		hair.geometry.computeVertexNormals();
		hair.geometry.normalsNeedUpdate = true;
		hair.geometry.verticesNeedUpdate = true;
}


