const drill = extend(Drill, "gear-drill", {
    load(){
        this.super$load()
        this.gearRegion = Core.atlas.find(this.name + "-gear")
        this.topRegion = Core.atlas.find(this.name + "-top")
        this.liquidRegion = Core.atlas.find(this.name + "-liquid")
    },

})
//cope harder
drill.buildType = () => extend(Drill.DrillBuild, drill, {
    effAff: 0,
    drilledDraw: 0,
    update(){
        this.super$update()
        this.dumpLiquid(Liquids.water)
        var a = 0
        a = Mathf.lerpDelta(a, 10, 0.1)
        this.drilledDraw += a * this.effAff * 3
    },
    updateTile(){
        this.super$updateTile()
        var nearAff = 0
        for(var i = 0; i < this.proximity.size; i++){
            if(this.proximity.get(i).block == this.block){
                nearAff += 0.2
            }
        }
        this.effAff = nearAff
        nearAff = 0
    },
    efficiency(){
        this.super$efficiency()
        return this.effAff + 1
    },
    draw(){
        this.super$draw()
        Drawf.spinSprite(drill.gearRegion, this.x + 2.75, this.y + 2.75, this.drilledDraw * 3)
        Drawf.spinSprite(drill.gearRegion, this.x - 2.75, this.y + 2.75, this.drilledDraw * 4)
        Drawf.spinSprite(drill.gearRegion, this.x + 2.75, this.y - 2.75, this.drilledDraw * 2)
        Drawf.spinSprite(drill.gearRegion, this.x - 2.75, this.y - 2.75, this.drilledDraw * 3)
        Draw.rect(drill.topRegion, this.x, this.y)
        Drawf.liquid(drill.liquidRegion, this.x, this.y, this.liquids.currentAmount(), Liquids.water.color)
    }
})