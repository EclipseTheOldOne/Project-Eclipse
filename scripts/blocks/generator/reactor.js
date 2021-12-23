const reactor = extend(NuclearReactor, "big-reactor", {})
//cope harder but reactor
reactor.buildType = () => extend(NuclearReactor.NuclearReactorBuild, reactor, {
    effAff: 0,
    update(){
        this.super$update()
        this.dumpLiquid(Liquids.cryofluid)
    },
    updateTile(){
        this.super$updateTile()
        var nearAff = 0
        for(var i = 0; i < this.proximity.size; i++){
            if(this.proximity.get(i).block == this.block){
                nearAff += 0.2
            }
        }
        this.productionEfficiency += nearAff
        nearAff = 0
    }
})