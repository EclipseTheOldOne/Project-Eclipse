const cooler = extend(Router, "cooler", {
    enableDrawStatus: false
})
cooler.buildType = () => extend(Router.RouterBuild, cooler, {
    //dammit how do i extend building
    reload: 0,
    update(){
        this.super$update()

    },
    updateTile(){
        this.super$updateTile()
        this.reload += Time.delta
        if(this.reload >= 60){
            for(var i = 0; i < this.proximity.size; i++){
                if(this.proximity.get(i) != null){
                    var other = this.proximity.get(i)
                    if(other.block.canOverdrive == true){
                        other.applyBoost(2.5 * this.power.status, 70)
                    }
                }
            }
            this.reload -= 60
        }
    },
    draw(){
        this.super$draw()
        Draw.alpha(this.power.status)
        Draw.color(Pal.redDust)
        Draw.z(Layer.effect)
        Draw.rect("mindus-cooler-liquid", this.x, this.y)
    }
})