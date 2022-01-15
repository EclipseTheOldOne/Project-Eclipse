const bDrill = extend(Drill, "beamer", {
    load(){
        this.super$load()
        this.rotatorRegion = Core.atlas.find("mindus-blank")
    }
})
bDrill.buildType = () => extend(Drill.DrillBuild, bDrill, {
    boosters: Seq.with(Building),
    eff: 0,
    update(){
        var chargerEff
        for(var i; i < this.boosters.size; i++){
            chargerEff += this.boosters.get(i).efficiency()
        }
        this.eff = chargerEff / 2
    },
    efficiency(){
        return this.eff * this.power.status
    }
})