function gObjectEnemyV(scene, x, y){

  let sprite;
  this.gameobject;

  let mobs = scene.mobs;;
  let layer = scene.layer;;
  let blocks = scene.blocks;
  let effcts = scene.effcts;

  let BG = scene.maze.BG;

  let growcount;
  let bvx;

  this.create = ()=>{

    sprite = mobs.get(x, y, "player");
    sprite.setCollideWorldBounds(true);
    sprite.setScale(1);
    sprite.setDepth(2);

    this.gameobject = sprite;
    sprite.anims.play('kout_e',true);   

    scene.wp.push(new gObjectVtail(scene, sprite, 12));

    growcount = 0;
    bvx = -1;
  }
  this.create();

  this.reborn = ()=>{
    //console.log("reborn" + sprite.x + "," + sprite.y);
    //const bplist  = scene.maze.blockposlist();

    sprite.x = Phaser.Math.Between(1, 20)*32+16;
    sprite.y = 0//Phaser.Math.Between(1, 20)*32+16;

    sprite.body.checkCollision.none = false;

    sprite.anims.play('left_v',true);   
    growcount = 0;
    sprite.setVelocityX(0);
    sprite.setVelocityY(0);
    sprite.setVisible(true);
    sprite.clearTint();


  }

  this.update = ()=>{

    if ("deadstate" in sprite){
      if (!sprite.deadstate) return; 
      growcount = -120;
      //sprite.anims.play("kout_e");
      if ((Math.abs(sprite.body.velocity.x)<1)
        &&(Math.abs(sprite.body.velocity.y)<1)) {
        sprite.setVelocityX(0);
        sprite.setVelocityY(0);
        sprite.deadstate = false;
        scene.timerOneShot = scene.time.delayedCall(3000, ()=>{
          delete sprite.deadstate;
          this.reborn();
          }, this
        );
      }
      return;
    }

    let mvmode = {type:false, vx:0, vy:0, push:false };

    let inputc = {
      left:{isDown: (bvx <0)},
      right:{isDown: (bvx > 0)},
      up:{isDown: false},
      down:{isDown: false},
      space:{isDown: false}
    }
    
    if (growcount < 30) { 
      growcount++; 
      //return;

     }else{
      sprite.setVelocityY(-300);
      growcount = 0;
    }

    if (inputc.left.isDown){
      mvmode.anim = 'left_v';
      mvmode.type = true;
      mvmode.vx =-1;
    }
    if (inputc.right.isDown){
      mvmode.anim = 'right_v';
      mvmode.type = true;
      mvmode.vx =1;
    }
    
    if (Math.abs(sprite.body.velocity.x) < 1 && bvx != 0){
      mvmode.type = true;
      mvmode.vx = -bvx;
      growcount = 0;
    }

    if (mvmode.type){

      sprite.setVelocityX(mvmode.vx*120);
      bvx = mvmode.vx;
      //sprite.setVelocityY(mvmode.vy*60);
      if (Boolean(mvmode.anim)){
        sprite.anims.play(mvmode.anim, true);}
        
    }else{
        //sprite.setVelocityX(0);
        sprite.setVelocityY(-800);
    }

  }
} 

function gObjectVtail(scene, parent, grow){

  let sprite;
  this.gameobject;

  let mobs = scene.mobs;;
  let layer = scene.layer;;
  let blocks = scene.blocks;
  let effcts = scene.effcts;

  let BG = scene.maze.BG;

  let fifobuf;
  this.active;

  this.create = ()=>{
    if (grow-- < 1) return;

    fifobuf = [];

    for (let i=0; i<3; i++){
      let w = {x: parent.x, y: parent.y};
      fifobuf.push(w);
    }
    //console.log(fifobuf);

    sprite = effcts.get(parent.x, parent.y, "player");
    sprite.setCollideWorldBounds(true);
    sprite.setScale(1);
    sprite.setDepth(grow*0.1);

    this.gameobject = sprite;

    if (grow == 11 || grow == 2) {
      sprite.anims.play('leg_v',true);
    } else {
      sprite.anims.play('body_v',true);
    }
    
    scene.wp.push(new gObjectVtail(scene, sprite, grow--));

    //console.log(fifobuf);

  }
  this.create();

  const update = ()=>{
    let nowactive = this.active && this.visible;

    this.active = parent.active || parent.visible;//visible; 

    if (Boolean(sprite)) {
      sprite.setVisible(parent.visible);
      sprite.setActive(parent.visible);
      if (this.active != nowactive) sprite.clearTint(); 
    }

    if (!this.active) return;
    if (Boolean(sprite)){ 

      if ("deadstate" in sprite){
        return;
      }
      sprite.body.checkCollision.none = false;
      
      if (Boolean(fifobuf)){
        //console.log(fifobuf);
        let w = fifobuf.shift();

        if (Phaser.Math.Distance.Between(w.x, w.y, parent.x,parent.y ) > 16) {
          //w.x = parent.x; w.y = parent.y;
          //sprite.setVisible(false);//console.log(Phaser.Math.Distance.Between(w.x, w.y, parent.x,parent.y ) );
        }

        scene.physics.moveTo(
          sprite,
          w.x,
          w.y,
          180//,
          //maxtime
        );
        
        //sprite.x = w.x;
        //sprite.y = w.y;

        w = {x: parent.x, y: parent.y};
        fifobuf.push(w);
      }
    };
  }
  this.update = update;

}



