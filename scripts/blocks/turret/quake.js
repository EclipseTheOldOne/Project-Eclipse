const bLib = require("libs/bulletLib")
const quake = extend(PowerTurret, "quake", {
    shootType: bLib.liOrb,
    chargeEffect: Fx.lancerLaserCharge,
    chargeBeginEffect: Fx.lancerLaserChargeBegin,
    shootEffect: Fx.lancerLaserShoot,
    load(){
        this.super$load()
        this.lRegion = Core.atlas.find(this.name + "-liquid")
    }
})
quake.buildType = () => extend(PowerTurret.PowerTurretBuild, quake, {
    draw(){
        this.super$draw()
        if(this.liquids.current() != null){
            Drawf.liquid(quake.lRegion, this.x + quake.tr2.x, this.y + quake.tr2.y, this.liquids.total(), this.liquids.current().color, this.rotation - 90)
        }
    }
})