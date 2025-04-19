function gObjectPlayer(scene, x, y){

  let sprite;
  let opt_sp;
  this.gameobject;
  this.active = false;

  let inputc;
  let before_space

  let friends = scene.friends;
  //let mobs = scene.mobs;
  let layer = scene.layer;
  //let blocks = scene.blocks;
  let effcts = scene.effcts;

  let seffect;

  let moveready;

  let before_pos;

  const SPEED = 240;//scene.GAMECONFIG.PLAYER.SPEED;
  
  this.create = ()=>{

    sprite = friends.get(x, y, "player");
    sprite.setCollideWorldBounds(true);

    opt_sp = friends.get(x, y, "sword");
    opt_sp.setCollideWorldBounds(true);
    //opt_sp.setFollow(sprite);

    sprite.anims.play("left_p", true);
    //opt_sp.anims.play("sw_left_p", true);
    //sprite.setScale(1);
    //sprite.setBodySize(15,15);
    //sprite.setCircle(7, 2, 1);

    this.gameobject = sprite;
     
    inputc = scene.scene.get("Input");

    seffect = scene.seffect;

    before_space = {flag:inputc.space, dur:inputc.duration.space};
  }
  this.create();

  this.update = ()=>{
    if (!this.active) return;
    if (Boolean(this.gameobject.pausestate)) return;

    let mvmode = {type:false, vx:0, vy:0, push:false ,dur:0};

    opt_sp.x = sprite.x + mvmode.vx*22;
    opt_sp.y = sprite.y + 8;
    opt_sp.setVelocityX(sprite.body.velocity.x);
    opt_sp.setVelocityY(sprite.body.velocity.y);

    if (inputc.left){
      mvmode.anim = 'left_p';
      mvmode.type = true;
      mvmode.vx =-1;
      mvmode.dur = inputc.duration.left;
    }
    if (inputc.right){
      mvmode.anim = 'right_p';
      mvmode.type = true;
      mvmode.vx =1;
      mvmode.dur = inputc.duration.right;
    }

    if (inputc.up){
      mvmode.anim = 'up_p';
      mvmode.type = true;
      mvmode.vy =-1;
      mvmode.dur = inputc.duration.up;
    }
    if (inputc.down){
      mvmode.anim = 'down_p';
      mvmode.type = true;
      mvmode.vy =1;
      mvmode.dur = inputc.duration.down;
    }

    if ((inputc.left)||(inputc.right)||(inputc.up)||(inputc.down)){
      //before_pos.vx = mvmode.vx;
      //before_pos.vy = mvmode.vy;
    }
    //let b2 = ((Math.abs(sprite.body.velocity.x)<1)&&(Math.abs(sprite.body.velocity.y)<1));

    if (inputc.space !== before_space.flag){//countstart
      if (!inputc.space) {
        blockoperation = true;
        throwmode = (before_space.dur > 1000)?true:false;
      }else{
        mvmode.push = true;
      }
    }
    before_space = {flag:inputc.space, dur:inputc.duration.space};

    if (inputc.space){ 
      mvmode.push = true;

    } else {
      mvmode.push = false;
      
      if (Boolean(mvmode.anim)) sprite.anims.play(mvmode.anim, true);
    }

    if (inputc.up || inputc.xkey){
      mvmode.type = 0;
      sprite.setVelocityY(-240);
      //layer.putTileAtWorldXY(35, sprite.x + mvmode.vx*10, sprite.y + mvmode.vy*10);
    }

    if (mvmode.type){

      moveaction_normal =()=>{
        if (mvmode.dur<150){
          if (mvmode.vx != 0) sprite.setVelocityX(mvmode.vx*(SPEED));
          //if (mvmode.vy != 0) sprite.setVelocityY(mvmode.vy*(SPEED));
        }else{
          sprite.setVelocityX(mvmode.vx*SPEED);
          //sprite.setVelocityY(mvmode.vy*SPEED);
        }
      }
 
      //moveaction_tw();
      //moveaction_moveTo();
      //moveaction_slip();
      moveaction_normal();
 
      if (Boolean(mvmode.anim)){
        sprite.anims.play((mvmode.push?'push_':'')+mvmode.anim, true);

        if (mvmode.push){
          opt_sp.setVisible(true);
          opt_sp.x = sprite.x + mvmode.vx*22;
          opt_sp.y = sprite.y + 8;
          //opt_sp.setVelocityX(mvmode.vx*SPEED*2);
          opt_sp.anims.play((mvmode.vx >0)?"sw_left_p":"sw_right_p", true);

          if (before_space.dur > 300){
            let shot = friends.get(sprite.x, sprite.y, "sword");
            shot.anims.play((mvmode.vx >0)?"sw_left_p":"sw_right_p", true);
            shot.x = sprite.x + mvmode.vx*22;
            shot.y = sprite.y + 8;
            shot.setVelocityX(mvmode.vx*SPEED*4);
            shot.timerOneShot = scene.time.delayedCall(300, ()=>{
              shot.destroy();
              
;
            }, this
          );
            //shot.
          }
        } else {
          opt_sp.setVisible(false);
        }
        //opt_sp.anims.play("sw_left_p", true);
      }
    }else{
      sprite.setVelocityX(0);
      opt_sp.setVisible(false);
      //sprite.setVelocityY(0);
    }
  }

  function effectbreak(x,y){
    let box = effcts.get(x, y,"blocks");
      box.setCollideWorldBounds(false);
      box.setScale(1);
      box.setPushable(false);
      box.anims.play("break");
      box.on(Phaser.Animations.Events.ANIMATION_COMPLETE, ()=>{
        box.destroy();
    },this);
  }
} 


