const grandRouter = extend(Router, "big-router", {
    itemCapacity: 25,
    load(){
        this.super$load()
        this.gearA = Core.atlas.find(this.name + "-gear")
        this.gearB = Core.atlas.find(this.name + "-gear1")
        this.gearC = Core.atlas.find(this.name + "-gear3")
        this.top = Core.atlas.find(this.name + "-top")
    }
})
grandRouter.buildType = () => extend(Router.RouterBuild, grandRouter, {
    drawRotation: 0,
    update(){
        this.super$update()
        this.drawRotation += this.items.total() / 5 * Time.delta
    },
    acceptItem(source, item){
        return this.team == source.team && this.items.total() < grandRouter.itemCapacity
    },
    draw(){
        this.super$draw()
        Drawf.spinSprite(grandRouter.gearA, this.x - 5, this.y + 5, this.drawRotation * 3)
        Drawf.spinSprite(grandRouter.gearC, this.x, this.y, this.drawRotation)
        Drawf.spinSprite(grandRouter.gearA, this.x + 5, this.y - 5, this.drawRotation * 4)
        Drawf.spinSprite(grandRouter.gearB, this.x + 5, this.y + 5, this.drawRotation * 2)
        Drawf.spinSprite(grandRouter.gearB, this.x - 5, this.y - 5, this.drawRotation * 5)
        Draw.rect(grandRouter.top, this.x, this.y)
    }
})