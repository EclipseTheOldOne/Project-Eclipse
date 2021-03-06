const lib = require("libs/bulletLib")
const wall = extend(Wall, "reflector", {
  reloadTime: 10,
  range: 110,
  shootType: lib.pulseBullet,
  shootSound: Sounds.lasershoot,
  load() {
    this.region = Core.atlas.find(this.name);
    this.liquidRegion = Core.atlas.find(this.name + "-liquid");
    this.topRegion = Core.atlas.find(this.name + "-top");
  },
  setStats(){
    this.super$setStats();
    this.stats.add(Stat.shootRange, this.range / Vars.tilesize, StatUnit.blocks);
    this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, this.shootType)));
  },
  setBars() {
    this.super$setBars()
    this.bars.add("reload", entity => new Bar(
      () => "Reload",
      () => Pal.lancerLaser,
      () => entity.getReload()/this.reloadTime
    ))
  },
  drawPlace(x, y, rotation, valid) {
    this.super$drawPlace(x, y, rotation, valid)
    Drawf.dashCircle(x * Vars.tilesize, y * Vars.tilesize, this.range, Pal.placing)
  }
});
wall.buildType = ent => extend(Wall.WallBuild, wall, {
  _reload: 0.0,
  update() {
    this.super$update();
    if (this.consValid() && this._reload < wall.reloadTime) this._reload +=  0.1 * Time.delta;
  },
  getReload() {
    return this._reload;
  },
  draw() {
    Draw.rect(wall.region, this.x, this.y);
    Drawf.liquid(wall.liquidRegion, this.x, this.y, this.liquids.total() / wall.liquidCapacity, Liquids.water.color);
    Draw.color(Color.valueOf("a5b8f2"));
    if(!this.shouldConsume()){
    Draw.alpha(Mathf.absin(Time.time, 20, 1));
    Draw.rect(wall.topRegion, this.x, this.y);
    }
  },
  collision(bullet) {
    this.super$collision(bullet);
    if (this._reload >= wall.reloadTime) {
      wall.shootType.create(this, this.team, this.x, this.y,0);
      wall.shootSound.at(this.x, this.y, 0.4);
      this._reload = 0;
    }
    return true;
  },
  shouldConsume() {
    return this._reload < wall.reloadTime;
  }
})