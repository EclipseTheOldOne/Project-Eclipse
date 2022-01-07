const saltGun = extend(ItemTurret, "salt-gun", {
    load(){
        this.super$load()
        this.liquidR = Core.atlas.find(this.name + "-liquid")
    }
})
saltGun.buildType = () => extend(ItemTurret.ItemTurretBuild, saltGun, {
    draw(){
        this.super$draw()
        Drawf.liquid(saltGun.liquidR, this.x + saltGun.tr2.x, this.y + saltGun.tr2.y, this.liquids.total(), Liquids.water.color, this.rotation - 90)
    },
    baseReloadSpeed(){
        if(this.liquids.total() >= 9){
            return this.efficiency()
        }else{return 0}
    }
})
