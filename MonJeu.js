var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 },
			debug: false
		}
	},
	scene: {
		init: init,
		preload: preload,
		create: create,
		update: update
	}
	
};

var game = new Phaser.Game(config);

function init() {
	var platform;
	var player;
	var cursor;
	
}


function preload(){
	this.load.image('background','assets/sky.png');
	this.load.image('sol','assets/plat2.png');
	this.load.spritesheet('perso','assets/stevenrun2.png',{frameWidth: 27, frameHeight: 37});
}

function create(){
	this.add.image(400,50,'background');
	
	platform = this.physics.add.staticGroup();
	platform.create(270,600,'sol').setScale(1.4).refreshBody();
	platform.create(700,200,'sol');
	platform.create(50,400,'sol');

	player = this.physics.add.sprite(200,400,'perso');
	player.setCollideWorldBounds(true);
	player.setBounce(0.1);
	player.body.setGravityY(200);
	this.physics.add.collider(player,platform);
	
	cursor = this.input.keyboard.createCursorKeys();
	
	this.anims.create({
		key:'right',
		frames: this.anims.generateFrameNumbers('perso', {start: 0, end: 5}),
		frameRate: 10,
		repeat: -1
	});
	
	this.anims.create({
		key:'stop',
		frames: this.anims.generateFrameNumbers('perso', {start: 6, end: 6}),
		frameRate: 20,
		repeat: -1
	});
	


}

function update() {
	
	if(cursor.right.isDown){
		player.anims.play('right',true);
		player.setVelocityX(350);
		player.setFlipX(false);
	}
	
	else if(cursor.left.isDown) {
		player.anims.play('right',true);
		player.setVelocityX(-350);
		player.setFlipX(true);	
	}
	
	else {
		player.anims.play('stop',true);
		player.setVelocityX(0);
	}

	if(cursor.up.isDown && player.body.touching.down){
		player.setVelocityY(-470);
	}
	
	if(cursor.down.isDown){
		player.setVelocityY(700);
	}
	
	
	
	
	
	
	
}