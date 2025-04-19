function setupAnims(scene){

    //if (scene.events.listenerCount("AnimSupComp")>0) return;
    
    //PLAYER
    scene.anims.create({ key: 'left_p',
        frames: scene.anims.generateFrameNumbers('player', { start: 18, end: 19 }),
        frameRate: 8, repeat: -1
    });
    scene.anims.create({ key: 'right_p',
        frames: scene.anims.generateFrameNumbers('player', { start: 16, end: 17 }),
        frameRate: 8, repeat: -1
    });
    scene.anims.create({ key: 'up_p',
        frames: scene.anims.generateFrameNumbers('player', { start: 24, end: 25 }),
        frameRate: 8, repeat: -1
    });
    scene.anims.create({ key: 'down_p',
        frames: scene.anims.generateFrameNumbers('player', { start: 26, end: 27 }),
        frameRate: 8, repeat: -1
    });
    scene.anims.create({ key: 'push_left_p',
        frames: scene.anims.generateFrameNumbers('player', { start: 22, end: 23 }),
        frameRate: 8, repeat: -1
    });
    scene.anims.create({ key: 'push_right_p',
        frames: scene.anims.generateFrameNumbers('player', { start: 20, end: 21 }),
        frameRate: 8, repeat: -1
    });
    scene.anims.create({ key: 'push_up_p',
        frames: scene.anims.generateFrameNumbers('player', { start: 12, end: 13 }),
        frameRate: 8, repeat: -1
    });
    scene.anims.create({ key: 'push_down_p',
        frames: scene.anims.generateFrameNumbers('player', { start: 8, end: 9 }),
        frameRate: 8, repeat: -1
    });
    scene.anims.create({ key: 'popup_p',
        frames: scene.anims.generateFrameNumbers('player', { start: 28, end: 29 }),
        frameRate: 3, repeat: -1
    });
    scene.anims.create({ key: 'kout_p',
        frames: scene.anims.generateFrameNumbers('player', { start: 16, end: 17 }),
        frameRate: 4, repeat: -1
    });
    scene.anims.create({ key: 'ship_p',
        frames: scene.anims.generateFrameNumbers('player', { start: 20, end: 21 }),
        frameRate: 6, repeat: -1
    });


    scene.anims.create({ key: 'sw_left_p',
        frames: scene.anims.generateFrameNumbers('sword', { start: 1, end: 1 }),
        frameRate: 8, repeat: 0
    });
    scene.anims.create({ key: 'sw_right_p',
        frames: scene.anims.generateFrameNumbers('sword', { start: 2, end: 2 }),
        frameRate: 8, repeat: 0
    });


    //ENEMY
    scene.anims.create({ key: 'left_e',
        frames: scene.anims.generateFrameNumbers('player', { start: 38, end: 39 }),
        frameRate: 8, repeat: -1
    });
    scene.anims.create({ key: 'right_e',
        frames: scene.anims.generateFrameNumbers('player', { start: 36, end: 37 }),
        frameRate: 8, repeat: -1
    });
    scene.anims.create({ key: 'kout_e',
        frames: scene.anims.generateFrameNumbers('player', { start: 63, end: 63 }),
        frameRate: 8, repeat: -1
    });


    scene.anims.create({ key: 'left_v',
        frames: scene.anims.generateFrameNumbers('player', { start: 58, end: 59 }),
        frameRate: 8, repeat: -1
    });
    scene.anims.create({ key: 'right_v',
        frames: scene.anims.generateFrameNumbers('player', { start: 56, end: 57 }),
        frameRate: 8, repeat: -1
    });
    scene.anims.create({ key: 'body_v',
        frames: scene.anims.generateFrameNumbers('player', { start: 60, end: 60 }),
        frameRate: 8, repeat: -1
    });
    scene.anims.create({ key: 'leg_v',
        frames: scene.anims.generateFrameNumbers('player', { start: 61, end: 61 }),
        frameRate: 8, repeat: -1
    });


    //scene.events.on("AnimSupComp",()=>{},this);

}