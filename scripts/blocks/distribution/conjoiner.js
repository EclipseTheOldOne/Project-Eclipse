const smolRouter = extend(Router, "conjoiner", {
    itemCapacity: 8,
    load(){
        this.super$load()
        this.gear = Core.atlas.find(this.name + "-gear")
        this.top = Core.atlas.find(this.name + "-top")
    }
})
smolRouter.buildType = () => extend(Router.RouterBuild, smolRouter, {
    drawRotation: 0,
    update(){
        this.super$update()
        this.drawRotation += this.items.total() / 5 * Time.delta
        this.dump(null)
    },
    acceptItem(source, item){
        return this.team == source.team && this.items.get(item) < this.getMaximumAccepted(item)
    },
    updateTile(){},
    draw(){
        this.super$draw()
        Drawf.spinSprite(smolRouter.gear, this.x, this.y, this.drawRotation * 3)
        Draw.rect(smolRouter.top, this.x, this.y)
    }
})