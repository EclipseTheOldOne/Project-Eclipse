const heater = extend(BurnerGenerator, "heater", {
    setStats(){
        this.super$setStats()
        this.stats.remove(Stat.basePowerGeneration)
        this.stats.add(Stat.basePowerGeneration, "[accent]5 Heat Unit / Second")
    },
    setBars(){
        this.super$setBars()
        this.bars.remove("power")
        this.bars.add("heat-prod", entity => new Bar(
            () => "Heat Production",
            () => Pal.accent,
            () => entity.productionEfficiency
        ))
    },
    drawPlace(x, y, rotation, valid){
        this.super$drawPlace(x, y, rotation, valid)
        Draw.rect(heater.region, x*8, y*8)
    }
})
heater.buildType = () => extend(BurnerGenerator.BurnerGeneratorBuild, heater, {
    draw(){
        Draw.rect(heater.region, this.x, this.y)
    }
})