const blib = require("libs/bulletLib")
const bomb = extend(Router, "salt-bomb", {
    load(){
        this.super$load()
        this.pressureRegion = Core.atlas.find(this.name + "-liquid")
    },
    setBars(){
        this.super$setBars()
        this.bars.remove("items")
        this.bars.add("pressure", entity => new Bar(
            () => "Pressure",
            () => Pal.lancerLaser,
            () => entity.pressureE()
        ))
    }
})
bomb.buildType = bom => extend(Router.RouterBuild, bomb, {
    pressure: 0,
    pressureE(){
        return this.pressure / 4
    },
    update(){
        this.super$update()
        this.pressure += Time.delta / 60
    },
    buildConfiguration(table){
        this.super$buildConfiguration(table);
        table.button(Icon.commandAttack, () => {
            if(this.pressure >= 4){
                this.explode()
            }
        }).size(64, 64)
    },
    explode(){
        blib.pulseStunBullet.create(this, this.team, this.x, this.y, 0);
        Fx.flakExplosionBig.at(this.x, this.y)
        this.kill()
    },
    draw(){
        this.super$draw()
        Drawf.liquid(bomb.pressureRegion, this.x, this.y, this.pressureE(), Pal.lancerLaser)
    }
})