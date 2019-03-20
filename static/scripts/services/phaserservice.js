app.factory("PhaserService", [
  function() {
    let svc = {};

    //  EBU: Sue me
    svc.width = 760;
    svc.height = 604;

    svc.config = {
      type: Phaser.AUTO,
      width: svc.width,
      height: svc.height,
      parent: "PhaserContainer",
      scene: {
        preload: preload,
        create: create,
        update: update
      }
    };

    svc.trailSize = undefined;
    svc.delayFrames = undefined;
    svc.skipFrames = undefined;
    svc.game = undefined;
    svc.graphics = undefined;
    svc.nextLine = undefined;
    svc.lines = undefined;

    function preload() {}

    function create() {
      svc.trailSize = 32;
      svc.delayFrames = 2;
      svc.skipFrames = 0;

      svc.graphics = [];
      for (var i = 0; i < svc.trailSize; i++) {
        svc.graphics[i] = this.add.graphics({
          lineStyle: { width: 4, color: 0xaa00aa, alpha: (svc.trailSize - i) / svc.trailSize }
        });
      }

      svc.nextLine = new Phaser.Geom.Line(0, 0, svc.width, svc.height);
      svc.lines = [];
    }

    function update() {
      if (svc.skipFrames === 0) {
        svc.skipFrames = svc.delayFrames;

        Phaser.Geom.Line.Rotate(svc.nextLine, Phaser.Math.DegToRad(360 / svc.trailSize));

        svc.lines.unshift(Phaser.Geom.Line.Clone(svc.nextLine));
        svc.lines.splice(svc.trailSize);

        svc.graphics.forEach(function(graphics) {
          graphics.clear();
        });

        for (var i = 0; i < svc.lines.length; i++) {
          svc.graphics[i].strokeLineShape(svc.lines[i]);
        }
      } else {
        svc.skipFrames--;
      }
    }

    svc.start = function() {
      svc.game = new Phaser.Game(svc.config);
    };

    return svc;
  }
]);
