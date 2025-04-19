
class TitleScene extends Phaser.Scene {
  constructor() {
    super({key:"Title", active:false});
  }

  cursors;

  preload() {}

  create() {
    this.add.text(20, 20, 'phaser3 funcion try/practice program ', { fontSize: '12px', fill: '#FFF' });
    this.add.text(400-100, 130, 'Romancialike', { fontSize: '40px', fill: '#FFF' });
    this.add.text(400-120, 200, 'PHASER3 my practice', { fontSize: '24px', fill: '#FFF' });

    this.add.text(
      440, 288
      , 'player\n\nbase(flag)\n\nenemy\n\nblocks'
      , { fontSize: '16px', fill: '#FFF' }
    );
    this.add.text(400-140, 450, 'push Space to Start', { fontSize: '32px', fill: '#FFF' });

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.space.isDown) {
      this.scene.start("GameMain");
    }
  }
}