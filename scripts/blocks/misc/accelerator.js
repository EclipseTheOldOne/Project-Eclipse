const eLib = require("libs/effectLib")
const sLib = require("libs/statusLib")
const acel = extend(Router, "accelerator", {
    setBars(){
        this.super$setBars()
        this.bars.add("reload", entity => new Bar(
            () => "Boost Reload",
            () => Pal.redDust,
            () => entity.real()
        ))
        this.bars.add("heal-reload", entity => new Bar(
            () => "Heal Reload",
            () => Pal.heal,
            () => entity.realH()
        ))
    },
    setStats(){
        this.super$setStats()
        this.stats.add(Stat.reload, "[accent]Boosting: 2 Second")
        this.stats.add(Stat.reload, "[#98ffa9]Healing: 4 Second / Each Healer Module Working")
    }
})
acel.consumes.add(extend(ConsumeCoolant, 0.15, {optional: true, booster: true}));
acel.buildType = ent => extend(Router.RouterBuild, acel, {
    drawAlphaH: 0,
    drawAlpha: 0,
    reload: 0,
    boosted: 0,
    reloadH: 0,
    healerBoost: 0,
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
            eLib.overDriveWave.at(this.x, this.y, Pal.redDust)
            this.reload -= 120
        }
        if(this.reloadH >= 240){
            Units.nearby(this.team, this.x, this.y, 140, other => {
                other.heal(65)
                Fx.heal.at(other.x, other.y, 0, Pal.heal, other)
            })
            eLib.overDriveWave.at(this.x, this.y, Pal.heal)
            this.reloadH -= 240
        }
        var healerBoostC = 0
        for(var i = 0; i < this.proximity.size; i++){
            if(this.proximity.get(i).block == "mindus-healer-module"){
                healerBoostC += this.proximity.get(i).efficiency()
            }
        }
        this.healerBoost = healerBoostC
        healerBoostC = 0
        this.reloadH += this.healerBoost * Time.delta * this.power.status * this.boosted
        if(this.healerBoost > 0){
            this.drawAlphaH = Mathf.lerp(this.drawAlphaH, 1, 0.1)
        }else{this.drawAlphaH = Mathf.lerp(this.drawAlphaH, 0, 0.2)}
    },
    real(){
        return this.reload / 120
    },
    realH(){
        return this.reloadH / 240
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
        Draw.color(Pal.heal)
        for(var i = 0; i < 6; i++){
            Lines.swirl(this.x, this.y, this.drawAlphaH * 135, 0.1, i * 60 + -Time.time)
        }
    }
})