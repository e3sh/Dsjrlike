function gObjectEnemy(scene, x, y){

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

    this.gameobject = sprite;
    sprite.anims.play('kout_e',true);   

    growcount = 0;
    bvx = 0;
  }
  this.create();

  this.reborn = ()=>{
    //console.log("reborn" + sprite.x + "," + sprite.y);
    //const bplist  = scene.maze.blockposlist();

    sprite.x = Phaser.Math.Between(1, 20)*32+16;
    sprite.y = 0//Phaser.Math.Between(1, 20)*32+16;

    sprite.anims.play('kout_e',true);   
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
      space:{isDwon: false}
    }
    
    if (growcount < 30) { 
      growcount++; 
      //return;

     }else{
      inputc = {
        left:{isDown: (Math.random()*10>3)?true:false},
        right:{isDown: (Math.random()*10>6)?true:false},
        //up:{isDown: (Math.random()*10>3)?true:false},
        //down:{isDown: (Math.random()*10>6)?true:false},
        //space:{isDown: (Math.random()*10>8)?true:false}
      }
      growcount = 0;
    }

    if (inputc.left.isDown){
      mvmode.anim = 'left_e';
      mvmode.type = true;
      mvmode.vx =-1;
    }
    if (inputc.right.isDown){
      mvmode.anim = 'right_e';
      mvmode.type = true;
      mvmode.vx =1;
    }
    /*
    if (inputc.up.isDown){
      mvmode.anim = 'up_e';
      mvmode.type = true;
      mvmode.vy =-1;
    }
    if (inputc.down.isDown){
      mvmode.anim = 'down_e';
      mvmode.type = true;
      mvmode.vy =1;
    }
    */
    if (false){
    //if (inputc.space.isDown){
      mvmode.push = true;
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
        sprite.anims.play((mvmode.push?'push_':'')+mvmode.anim, true);}
        
    }else{
        //sprite.setVelocityX(0);
        //sprite.setVelocityY(0);
    }
  }
} 



