const basicCrossBow = extend(ItemTurret, "crossbow", {})
basicCrossBow.buildType = () => extend(ItemTurret.ItemTurretBuild, basicCrossBow, {
    shoot(type){
        this.super$shoot(type)
        if(a >= 3){print("yo mama")}else{a++}
    }
})
