const sporeHavester = extend(GenericCrafter, "spore-havester", {
    load(){
        this.super$load()
        this.regionLiquid = Core.atlas.find("mindus-spore-havester-liquid")
        this.regionTop = Core.atlas.find("mindus-spore-havester-top")
        this.regionBladeA = Core.atlas.find("mindus-spore-havester-blade1")
        this.regionBladeB = Core.atlas.find("mindus-spore-havester-blade2")
    },
    setBars(){
        this.super$setBars()
        this.bars.add("eff", entity => new Bar(
            () => "Efficiency",
            () => Pal.bulletYellowBack,
            () => entity.efficiency()
        ))
    }
})
sporeHavester.buildType = () => extend(GenericCrafter.GenericCrafterBuild, sporeHavester, {
    spaceEff: 0,
    spaceEffResult: 0,
    counter: 0,
    bladeRotation: 0,
    update(){
        this.super$update()
        this.bladeRotation += this.efficiency() * 5
        for(var i = 0; i < 56; i += 8){
            for(var j = 0; j < 56; j += 8){
                if(!Vars.world.tileWorld(this.x + i - 24, this.y + j - 24).solid()){this.spaceEffResult += 1 / 49}
            }
        }
        this.counter = 0
        this.spaceEff = this.spaceEffResult + 9 / 49
        this.spaceEffResult = 0
    },
    drawPlace(x, y, rotation, valid){
        this.super$drawPlace(x, y, rotation, valid)
        Draw.color(Pal.accent)
        Lines.stroke(5)
        Lines.square(x, y, 7)
    },
    efficiency(){
        this.super$efficiency()
        return this.power.status * this.spaceEff
    },
    draw(){
        this.super$draw()
        Drawf.liquid(sporeHavester.regionLiquid, this.x, this.y, this.liquids.total(), this.liquids.current().color)
        Draw.rect(sporeHavester.regionBladeA, this.x, this.y, this.bladeRotation * 1.2)
        Draw.rect(sporeHavester.regionBladeB, this.x, this.y, -this.bladeRotation)
        Draw.rect(sporeHavester.regionTop, this.x, this.y)
    }
})