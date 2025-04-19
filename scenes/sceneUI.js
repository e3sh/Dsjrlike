class uiScene extends Phaser.Scene {
  constructor() {
    super({key:"UI", active: false});
    //console.log("ui constructor");
  }
    /*
    goverText;
    retryText;
  
    cursors;
    zkey;
  */
    gText;
    bar;

    gameMain;

  preload() {
    //console.log("ui preload");
        
    //map create
    const map = this.make.tilemap({tileWidth: 32, tileHeight: 32 });
    const tiles = map.addTilesetImage("items");
    
    this.layer = map.createBlankLayer(1, tiles, 80, 532,32);
    // ex: createBlankLayer(name, tileset, [x], [y], [width], [height], [tileWidth], [tileHeight])

    for (let i=0; i<16; i++){
      this.layer.putTileAt(64+i,i,0);
    }
  }

  create() {
    //console.log("ui create");
    
    this.goverText = this.add.text(240, 240, 'Game Over', { fontSize: '64px', fill: '#FFF' });
    this.retryText = this.add.text(200, 310, 'Push Space key', { fontSize: '48px', fill: '#FFF' });

    this.goverText.setVisible(false);
    this.retryText.setVisible(false);
    
    //UI

    this.gText = this.add.bitmapText(80+0, 100+400+16, 'font', 'UI_TEXT abcdefgh');
    //this.gText.setScale(2);
    //this.bar = this.add.bitmapText(112+8*16, 600-48, 'pcgfont', 'hp_bar');
    //this.bar.setScale(1);

    this.gameMain = this.scene.get("GameMain");

    //this.cameras.zoom = 2.0;
    //this.cameras.main.centerOn(288, 300);
    
    // event section. 
    const gameMain = this.scene.get("GameMain");
  }

  update() {
  }
}
