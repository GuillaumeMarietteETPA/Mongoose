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
	var stars;
	var score = 0;
	var scoreText;
}


function preload(){
	this.load.image('background','assets/sky.png');
	this.load.image('sol','assets/plat2.png');
	this.load.image('star','assets/coockiecat.png');
	this.load.spritesheet('perso','assets/stevenrun2.png',{frameWidth: 52, frameHeight: 70});
	this.load.spritesheet('persoj','assets/jumpsteven.png',{frameWidth: 52, frameHeight: 73});
}

function create(){
	this.add.image(400,50,'background');
	
	platform = this.physics.add.staticGroup();
	platform.create(270,600,'sol').setScale(1.4).refreshBody();
	platform.create(700,300,'sol').setScale(0.7).refreshBody();
	platform.create(50,400,'sol').setScale(0.5).refreshBody();
	platform.create(200,150,'sol').setScale(0.2).refreshBody();

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
		repeat: -1
	});
	
	this.anims.create({
		key:'up',
		frames: this.anims.generateFrameNumbers('persoj', {start: 1, end: 4}),
		frameRate: 10
	});
	
	this.anims.create({
		key:'down',
		frames: this.anims.generateFrameNumbers('persoj', {start: 5, end: 6}),
		frameRate: 10
	});
	
	this.anims.create({
		key:'down2',
		frames: this.anims.generateFrameNumbers('persoj', {start: 7, end: 8}),
		frameRate: 10
	});
	
	
	stars = this.physics.add.group({
		key: 'star',
		repeat: 11,
		setXY: { x: 12, y: 0, stepX: 70 }
	});

	stars.children.iterate(function (child) {

		child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.2));

	});
	
	this.physics.add.collider(stars, platform);

	this.physics.add.overlap(player, stars, collectStar, null, this);
	
	

	scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });



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
		player.anims.play('stop');
		player.setVelocityX(0);
	}

	
	
	if(cursor.up.isDown) {
		player.anims.play('up',true);
			if(cursor.up.isDown && player.body.touching.down){
			player.setVelocityY(-470);
	}
	
	}
	
	if(cursor.down.isDown){
		player.anims.play('down',true);
		player.setVelocityY(700);
			if(player.body.touching.down){
			player.anims.play('down2',true);
			}
		}
	


}

function collectStar (player, star) {
    star.disableBody(true, true);
	
	score += 10;
	scoreText.setText('Score: ' + score);
	 
	 if (stars.countActive(true) === 0)  {

       stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });
	}

	
	
}
