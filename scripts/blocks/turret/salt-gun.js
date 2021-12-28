const saltGun = extend(ItemTurret, "salt-gun", {
    load(){
        this.super$load()
        this.liquidR = Core.atlas.find(this.name + "-liquid")
    }
})
saltGun.buildType = () => extend(ItemTurret.ItemTurretBuild, saltGun, {
    draw(){
        this.super$draw()
        Drawf.liquid(saltGun.liquidR, this.x, this.y, this.liquids.total(), Liquids.water.color)
    }
})
