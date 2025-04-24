class GameScene extends Phaser.Scene {
  constructor() {
    super({key:"GameMain", active:false});
  }

  maze;
  rf;

  player;   
  friends;
  mobs;

  layer;
  toptile;
  infoLayer;

  //cursors;
  //zkey;
  inputc;

  seffect;
  music;

  gText;

  stage;
  result;
  killcount;
  basehp;

  wave;
  mapchange;

  goverf;
  endwait;

  xtalblockerr;

  zoom

  preload() {

    this.maze = {ready: false};

    let level = [];
    for (let i=0; i<40; i++ ){
      level[i] = [];
      for (let j=0; j<60; j++){
        level[i][j] = -1;
        if (i >22) level[i][j] = 1; 
      }
    }

    const osc = new OffscreenCanvas(800,600);
    const ctx = osc.getContext("2d");

    ctx.fillStyle ="Cyan";
    ctx.fillRect(0,0,800,600);

    this.textures.addCanvas("back", osc);

    this.add.image(0,0,"back").setOrigin(0);
        
    //map create
    const map = this.make.tilemap({data: level, tileWidth: 16, tileHeight: 16 });
    const tiles = map.addTilesetImage("tiles");//,{tileOffset:{x:16,y:16},tileMargin:2, tileSpacing:2});
    
    this.layer = map.createLayer(0, tiles, 0, 0);
    //this.toptile =  map.createBlankLayer(1, tiles, 0, -3);
    //this.toptile.setDepth(1);

    //const tiles2 = map.addTilesetImage("pcgasc");
    //this.infolayer = map.createBlankLayer(2, tiles2, 0, 0);
    //this.infolayer.setDepth(2);

    //this.infolayer.setVisible(false);

    this.physics.world.setBounds(0, 0, 800, 400);

    //game object physics.sprite.body setup
    this.friends = this.physics.add.group();
    this.mobs = this.physics.add.group();
    this.effcts = this.physics.add.group();

    //BG collison
    this.layer.setCollisionBetween(1, 1, true, false, this.layer); 
    //this.layer.setCollisionBetween(49,50, true, false, this.layer); 
      
    //  Input Events
    this.inputc = this.scene.get("Input");//this.input.keyboard.createCursorKeys();


    // audio events
    this.seffect = [];

    this.seffect[0] = this.sound.add("push");
    this.seffect[1] = this.sound.add("pop");
    this.seffect[2] = this.sound.add("break");
    this.seffect[3] = this.sound.add("clear");
    this.seffect[4] = this.sound.add("use");
    this.seffect[5] = this.sound.add("get");
    this.seffect[6] = this.sound.add("bow");
    this.seffect[7] = this.sound.add("damage");
    this.seffect[8] = this.sound.add("miss");
    this.seffect[9] = this.sound.add("powup");
  
      //camera setup
    this.cameras.main.setViewport(200,100,400,400);

    this.zoom = 1.0

    this.cameras.main.zoom = this.zoom;
    //this.cameras.main.centerOn(132, 150);
    
    this.cameras.main.setBounds(
      0,
      0,
      this.game.canvas.width,
      160 //this.game.canvas.height
    );
    
    const hitenemy = (p,e)=>{
      if (!('deadstate' in p)){
        e.deadstate = true;
        e.setVelocityY(-300);
        e.setVelocityX(-e.body.velocity.x)

        e.body.checkCollision.none = true;
        
        this.timerOneShot = this.time.delayedCall(1000, ()=>{
          e.setVisible(false);
        }, this
        );
        
        e.anims.play("kout_e");
      }
    }

    const hiteff = (f, e)=>{
      if (!('deadstate' in e)){
        e.deadstate = true;
        e.setVelocityY(-300);
        e.setVelocityX(-e.body.velocity.x)

        e.body.checkCollision.none = true;
        
        this.timerOneShot = this.time.delayedCall(3000, ()=>{
          e.setVisible(false);
          if ('deadstate' in e) delete e.deadstate;
        }, this
        );
        e.setTint("0x07e");
        e.setActive(false);
      }
    }

    this.physics.add.collider(this.friends, this.layer);
    this.physics.add.collider(this.mobs, this.layer);
    this.physics.add.collider(this.friends, this.mobs, hitenemy, null, this );
    this.physics.add.collider(this.mobs, this.mobs); 
    this.physics.add.overlap(this.friends, this.effcts, hiteff, null, this); 
    this.physics.add.collider(this.effcts, this.layer);

  }

  create() {
    const king = [[84, 85],[100,101]];
    const pole = [[91,92],[107,108],[107,108],[107,108],[107,108],[123,124]];
    const bwall = [[36,36,36,36,36,36,36,36],[36,36,36,36,36,36,36,36],[36,36,36,36,36,36,36,36],[36,36,36,36,36,36,36,36],[36,36,36,36,36,36,36,36]];
    const hwall = [[33,34,34,34,34,35], [33,34,34,34,34,35], [33,34,34,34,34,35], [33,34,34,34,34,35]]
    const cross = [[31],[32]];
    const tree = [[80],[81]];
    const panel = [[42,62],[78,79]];
    const clowd = [[23,24,25]];

    const ldraw = (x, y, d) =>{
      const stx = x;
      for (let a of  d){
        for (let n of a){
          this.layer.putTileAt(n ,x ,y);
          x++;
        }
        y++;
        x = stx;
      }
    }

    ldraw(7,5,clowd);
    ldraw(20,10,clowd);
    ldraw(37,7,clowd);

    ldraw(7,18,bwall);
    ldraw(10,21,king);
    ldraw( 5,17,pole);
    ldraw(15,17,pole);

    ldraw( 2,21,tree);
    ldraw(45,21,tree);

    ldraw(25,16,hwall);
    ldraw(30,16,hwall);
    ldraw(35,16,hwall);
    ldraw(25,19,hwall);
    ldraw(30,19,hwall);
    ldraw(35,19,hwall);
    ldraw(32,17,panel);

    ldraw(20,21,cross);
   

    //Game Moving Object setup
    this.wp = [];

    this.wp.push(new gObjectPlayer(this, 0,0));
    this.player = this.wp[0].gameobject;
    this.player.x = 100;

    for (let i=0; i<5; i++){
      this.wp.push(new gObjectEnemy(this, 100,100));
    }

    this.wp.push(new gObjectEnemyV(this, 100,100));


    for (let i=0; i<100; i++ ){
      for (let j=0; j<100; j++){
        //this.layer.putTileAt(Phaser.Math.Between(1,256),i,j);
      }
    }

    //this.wp[0].active = true;
    //this.player.anims.play("left_p",true);
    //this.player.setSize(15,15);
    this.cameras.main.startFollow(this.player);

    this.scene.launch("UI");
    this.scene.launch("Debug");

  }

  ////======================
  update() {
    
    if (this.inputc.space){
      if (this.goverf && this.endwait){
        //Title Return;
        this.scene.stop("UI");
        this.scene.stop("Debug");
        this.scene.start("Title");//restart();
      }
    }

    if (this.inputc.pageup || this.inputc.pagedown){
      this.zoom -= (this.inputc.pageup)?0.1:0;
      this.zoom += (this.inputc.pagedown)?0.1:0;

      if (this.zoom < 1.0) this.zoom = 1.0;
      if (this.zoom > 5.0) this.zoom = 5.0;
      
      this.cameras.main.zoom = this.zoom;
    }

    for (let i in this.wp){this.wp[i].update();}
    
    if (this.maze.ready){
      if (!this.rf) {
        this.goverf = false;
        this.endwait = false;

        this.rf = true;

        for (let i in this.wp){this.wp[i].active = true;}

        //console.log("o");

      } 
    }else{        
      this.maze.ready = true;
      for (let i in this.wp){
        this.wp[i].active = false;
        if (i != 0){
          /*
          //if (("deadstate" in this.wp[i].gameobject)) this.wp[i].gameobject.deadstate = true;
          this.wp[i].gameobject.setVisible(false);
          this.wp[i].gameobject.x = 0;
          this.wp[i].gameobject.y = 0;
          */
        }
        //console.log("m");
      }
    }
    
    if (this.rf){

      this.result = "";//(this.killcount)?"KILL:"+this.killcount:"";//" lx:" + count_x + " ly:" +count_y;
      //CLEAR CHECK
      let count_x =0; 
      let count_y = 0;

      if ((count_x >=3)||(count_y >=3)){
        this.player.anims.play('popup_p',true);
        this.seffect[9].play();
        this.result ="CLEAR";

        this.basehp += this.GAMECONFIG.XTALBONUS;//bonus

        this.maze.init();
        this.rf = false;
        //this.events.emit("clear");
      }
    }

    if (this.inputc.zkey){
    }

  }
}
