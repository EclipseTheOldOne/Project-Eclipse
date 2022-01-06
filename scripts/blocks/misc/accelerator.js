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
    }
})
acel.buildType = ent => extend(Router.RouterBuild, acel, {
    drawAlpha: 0,
    reload: 0,
    update(){
        this.super$update()
        this.reload += Time.delta * this.power.status
        this.drawAlpha = Mathf.lerp(this.drawAlpha, this.power.status, 0.07)
        if(this.reload >= 200){
            Units.nearby(this.team, this.x, this.y, 140, other => {
                other.apply(sLib.accelerated, 210)
            })
            eLib.overDriveWave.at(this.x, this.y)
            this.reload -= 200
        }
    },
    real(){
        return this.reload / 200
    },
    draw(){
        this.super$draw()
        Draw.alpha(this.drawAlpha)
        Draw.z(Layer.effect)
        Draw.color(Pal.redDust)
        Fill.circle(this.x, this.y, this.drawAlpha * 4.5)
        for(var i = 0; i < 6; i++){
            Lines.swirl(this.x, this.y, this.drawAlpha * 140, 0.1, i * 60 + Time.time)
        }
    }
})