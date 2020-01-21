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
		update: update,
	}
	
};

var game = new Phaser.Game(config);

function init() {
	var platform;
	var player;
	
	
}


function preload(){
	this.load.image('background','assets/sky.png');
	this.load.image('sol','assets/platform.png');
	this.load.spritesheet('perso','assets/dude.png',{frameWidth: 32, frameHeight: 48});
}

function create(){
	this.add.image(400,50,'background');
	
	platform = this.physics.add.staticGroup();
	platform.create(360,630,'sol').setScale(1.4).refreshBody();
	platform.create(700,200,'sol');
	platform.create(50,400,'sol');

	player = this.physics.add.sprite(100,450,'perso');
	player.setCollideWorldBounds(true);
	player.setBounce(0.2);
	this.physics.add.collider(player,platform);
	





}

function update() {
	
}