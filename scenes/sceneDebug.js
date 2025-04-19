class UIDebugScene extends Phaser.Scene {
    constructor() {
      super({key:"Debug", active:false});
    }

    textL;
    textR;

    gm;

    friends;
    mobs;
    blocks;
    effcts;

    ft;

    homekey;
    endkey;

    preload() {}
  
    create() {
      this.homekey = false;
      this.input.keyboard.on("keydown-HOME", ()=> {this.homekey = true; }); 
      this.input.keyboard.on("keyup-HOME", ()=> { this.homekey = false;});

      this.endkey = false;
      this.input.keyboard.on("keydown-END", ()=> {this.endkey = true; }); 
      this.input.keyboard.on("keyup-END", ()=> { this.endkey = false;});

      this.textL = this.add.text(8, 0, "test",  { fontSize: '12 px', fill: '#FFF' });
      this.textR = this.add.text(800-116, 0, "test",  { fontSize: '12 px', fill: '#FFF' });

      const gamemain = this.scene.get("GameMain");
      this.gm = gamemain;

      this.ft = 0;
    }
  
    update() {

    this.textL.setVisible(this.homekey);
    this.textR.setVisible(this.homekey);

    const gamemain = this.gm;

    let systemstatus = "-- SystemStatus --\n"
      +"FPS:"+Math.trunc(1000/game.loop.delta) + "\n"
      +"TIME:"+game.getTime()+"\n"
      +"DELTA:"+String(game.loop.delta).substring(0,5)+"\n"
      //+" "+ ((this.maze.ready)?"WAIT":"BUSY") 
      +"FRAME:" + (game.getFrame()-this.ft) + "\n";

    let eventstatus = "-- eventsStatus --\n";

    for (let s of gamemain.events.eventNames()){
      eventstatus += gamemain.events.listenerCount(s) + ":" + s + "\n";
    }

    let inputscene = this.scene.get("Input");
    
    let inputstatus = inputscene.info();

    let gamestatus = "-- Fullscreen --  \n"
      +"now fs:" + this.scale.isFullscreen + "\n"
      +"available:" +  this.sys.game.device.fullscreen.available + "\n"
      +"keyboard:" +this.sys.game.device.fullscreen.keyboard + "\n";
    this.textL.setText(
      gamestatus
      //+spritestatus
    );

    this.textR.setText(
      systemstatus 
      +eventstatus
      +inputstatus
    );

    if (!this.scale.isFullscreen && this.sys.game.device.fullscreen.available){
      if (this.endkey){
        this.scale.startFullscreen();
      }
    }

  }
}

