const lib = require("libs/bulletLib")
const wall = extend(Wall, "reflector", {
    load(){
        this.super$load()
        this.liquidRegion = Core.atlas.find(this.name + "-liquid");
    },
    setBars(){
        this.super$setBars()
        this.bars.add("reload", entity => new Bar(
            () => "Reload",
            () => Pal.lancerLaser,
            () => entity.reloadE()
        ))
    }
});
wall.buildType = ent => extend(Wall.WallBuild, wall, {
    reload: 0.0,
    update(){
        this.super$update();
        this.reload += 0.05 * Time.delta;
    },
    reloadE(){
        return this.reload
    },
    draw(){
        this.super$draw();
        Draw.rect("mindus-reflector", this.x, this.y);
        Drawf.liquid(wall.liquidRegion, this.x,this.y, this.liquids.total() / wall.liquidCapacity, Liquids.water.color);
        Draw.color(Color.valueOf("a5b8f2"))
        Draw.alpha(1 - this.reload)
        Draw.rect("mindus-reflector-top", this.x, this.y)
    },
    collision(bullet){
        this.super$collision(bullet);
        Sounds.laser.at(bullet.x, bullet.y, 0.4);
        if(this.reload >= 1 && this.cons.valid()){
            lib.pulseBullet.create(this, this.team, this.x, this.y, 0);
            this.reload = 0
        };
        return true
    }
})