/**
 * Created by techbot on 17/11/14.
 */

playState[14] = {
    init: function() {
        //Called as soon as we enter this state
    },

    preload: function() {
        grid=14;
        game.load.tilemap('world', '/components/com_battle/views/phaser/tmpl/grid00' + grid + '.json', null, Phaser.Tilemap.TILED_JSON);
        //  Next we load the tileset. This is just an image, loaded in via the normal way we load images:

        //game.load.image('Zombie_TileC', '/components/com_battle/images/assets/tiles/Zombie_TileC.png');
        //game.load.image('Zombie_TileD', '/components/com_battle/images/assets/tiles/Zombie_TileD.png');
        
        //game.load.image('TileA4', '/components/com_battle/images/assets/tiles/TileA4.png');
        game.load.image('TileA5', '/components/com_battle/images/assets/tiles/TileA5.png');
        game.load.image('TileE', '/components/com_battle/images/assets/tiles/TileE.png');
        //game.load.image('TileB', '/components/com_battle/images/assets/tiles/TileB.png');
        game.load.image('arrow', '/components/com_battle/images/assets/frog.gif');
        //game.load.image('mushroom', '/components/com_battle/images/assets/sprites/mushroom2.png');
        //game.load.image('sonic', '/components/com_battle/images/assets/sprites/sonic_havok_sanity.png');
        //game.load.image('phaser', '/components/com_battle/images/assets/sprites/phaser1.png');
        //game.load.spritesheet('ms', '/components/com_battle/images/assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);
        
        //game.load.spritesheet('monster', '/components/com_battle/images/assets/Monsters/Beast of Burden/Monster_BeastofBurden_FullFrame.png', 185, 165, 8);

        game.load.spritesheet('portal00001', '/components/com_battle/images/assets/tiles/Dungeon_A1.png', 32, 64, 1);
        game.load.spritesheet('portal00002', '/components/com_battle/images/assets/tiles/Dungeon_B.png', 32, 64, 1);
        game.load.spritesheet('portal00003', '/components/com_battle/images/assets/tiles/Dungeon_C.png', 32, 64, 1);
        
    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.add.plugin(Phaser.Plugin.Tiled);

        //  Modify the world and camera bounds
        game.world.setBounds(-1000, -1000, 3200, 3200);

        game.stage.backgroundColor = '#787878';

        game.input.onDown.add(moveBall, this);

        var cacheKey = Phaser.Plugin.Tiled.utils.cacheKey;
        game.load.tiledmap(cacheKey('world5', 'tiledmap'), 'grid00' + grid + '.json', null, Phaser.Tilemap.TILED_JSON);

        //game.load.image(cacheKey('Zombie_A5', 'tileset', 'Zombie_A5'), '/components/com_battle/images/assets/Zombie_A5.png');

        game.load.image(cacheKey('portal00001', 'tileset', 'portal00001'), '/components/com_battle/images/assets/tiles/Dungeon_A1.png');
        game.load.image(cacheKey('portal00002', 'tileset', 'portal00002'), '/components/com_battle/images/assets/tiles/Dungeon_B.png');
        game.load.image(cacheKey('portal00003', 'tileset', 'portal00003'), '/components/com_battle/images/assets/tiles/Dungeon_C.png');
        game.load.image(cacheKey('TileA5', 'tileset', 'TileA5'), '/components/com_battle/images/assets/TileA5.png');
        game.load.image(cacheKey('TileE', 'tileset', 'TileE'), '/components/com_battle/images/assets/TileE.png');

        cursors = game.input.keyboard.createCursorKeys();
        game.input.onDown.add(moveBall, this);

        map = game.add.tilemap('world');

        layer3 = map.createLayer('ground');
        layer = map.createLayer('obstacles');
        layer4 = map.createLayer('ground2');
        layer2 = map.createLayer('objects');

        map.addTilesetImage('TileA5', 'TileA5');
        map.addTilesetImage('TileE', 'TileE');
        
        map.setCollisionBetween(0, 10000,true,'obstacles');

        sprite = game.add.sprite(370, 300, 'arrow');
        // sprite.anchor.setTo(0.5, 0.5);

        // Enable Arcade Physics for the sprite
        game.physics.enable(sprite, Phaser.Physics.ARCADE);

        // Tell it we don't want physics to manage the rotation
        sprite.body.allowRotation = false;

        this.camera.follow(sprite, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
        //phaser.fixedToCamera = true;
        game.add.tween(sprite2).to({ x: destination }, 10000, Phaser.Easing.Linear.None, true);

///////////////////////////////////////////
        portal = new Array();

        portal[1] = game.add.sprite(809, 100, 'portal00001');
        game.physics.enable(portal[1], Phaser.Physics.ARCADE);
        portal[1]['dest']=8;

        portal[2] = game.add.sprite(1290, 1354, 'portal00002');
        game.physics.enable(portal[2], Phaser.Physics.ARCADE);
        portal[2]['dest']=9;

        portal[3]= game.add.sprite(640, 580, 'portal00003');
        game.physics.enable(portal[3], Phaser.Physics.ARCADE);
        portal[3]['dest']=10;
   },

    update: function() {
        this.physics.arcade.collide(sprite, layer);

        this.physics.arcade.collide(sprite, portal[1],jump);
        this.physics.arcade.collide(sprite, portal[2],jump);
        this.physics.arcade.collide(sprite, portal[3],jump);
        this.physics.arcade.collide(sprite2, layer);

        game.physics.arcade.moveToXY(sprite, x, y, 100);
        if ((sprite.body.x >=x-10) &&(sprite.body.x <=x+10)){
            sprite.body.velocity.x = 0;
        }

        if ((sprite.body.y >=y-10) &&(sprite.body.y <=y+10)){
            sprite.body.velocity.y = 0;
        }

        if (cursors.up.isDown) {
            //  console.log("Down");
            game.camera.y -= 4;

        }
        else if (cursors.down.isDown) {
            game.camera.y += 4;
        }
        if (cursors.left.isDown) {
            game.camera.x -= 4;
        }
        else if (cursors.right.isDown) {
            game.camera.x += 4;
        }
    },

    render: function() {
           game.debug.spriteCoords(sprite, 32, 32);
// game.debug.cameraInfo(game.camera, 96, 64);
    }
};
