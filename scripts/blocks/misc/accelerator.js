const eLib = require("libs/effectLib")
const sLib = require("libs/statusLib")
const acel = extend(Router, "accelerator", {
    setBars(){
        this.super$setBars()
        this.bars.add("reload", entity => new Bar(
            () => "Reload",
            () => Pal.redDust,
            () => entity.real()
        ))
    },
    setStats(){
        this.super$setStats()
        this.stats.add(Stat.reload, 2 + " Second")
    }
})
acel.consumes.add(extend(ConsumeCoolant, 0.15, {optional: true, booster: true}));
acel.buildType = ent => extend(Router.RouterBuild, acel, {
    drawAlpha: 0,
    reload: 0,
    boosted: 0,
    update(){
        this.super$update()
        if(this.liquids.current() != null && this.liquids.total() > 9){
            this.boosted = (1 - this.liquids.current().temperature) + 1
        }else{this.boosted = 1}
        this.reload += Time.delta * this.power.status * this.boosted
        this.drawAlpha = Mathf.lerp(this.drawAlpha, this.power.status, 0.07)
        if(this.reload >= 120){
            Units.nearby(this.team, this.x, this.y, 140, other => {
                other.apply(sLib.accelerated, 210)
                Fx.chainLightning.at(this.x, this.y, 0, Pal.redDust, other)
            })
            eLib.overDriveWave.at(this.x, this.y)
            this.reload -= 120
        }
    },
    real(){
        return this.reload / 120
    },
    draw(){
        this.super$draw()
        Draw.alpha(this.drawAlpha)
        Draw.z(Layer.effect)
        Draw.color(Pal.redDust)
        Fill.circle(this.x, this.y, this.drawAlpha * 4.5 + Mathf.sin(Time.time, 5, 0.5) * this.power.status)
        for(var i = 0; i < 6; i++){
            Lines.swirl(this.x, this.y, this.drawAlpha * 140, 0.1, i * 60 + Time.time)
        }
    }
})