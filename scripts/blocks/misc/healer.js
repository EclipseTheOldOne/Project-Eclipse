const healModule = extend(Router, "healer-module", {})
//cope harder
healModule.buildType = () => extend(Router.RouterBuild, healModule, {
    updateTile(){
        this.super$updateTile()
        for(var i = 0; i < this.proximity.size; i++){
            if(this.proximity.get(i).block == "mindus-accelerator" && Mathf.chance(this.power.status / 10)){
                Fx.chainLightning.at(this.x, this.y, 0, Pal.heal, this.proximity.get(i))
            }
        }
    }
})