const grandRouter = extend(Router, "big-router", {
    itemCapacity: 25,
    load(){
        this.super$load()
        this.gears = [];
        for(let i = 0; i < 3; i++){
          this.gears[i] = Core.atlas.find(this.name + "-gear-" + i);
        }
        this.top = Core.atlas.find(this.name + "-top")
    }
})
grandRouter.buildType = () => extend(Router.RouterBuild, grandRouter, {
    drawRotation: 0,
    update(){
        this.super$update()
        this.drawRotation += this.items.total() / 5 * Time.delta
//        this.dump(null)
    },
    acceptItem(source, item){
        return this.team == source.team && this.items.get(item) < this.getMaximumAccepted(item)
    },
   // updateTile(){},
    draw(){
        this.super$draw()
        Drawf.spinSprite(grandRouter.gears[0], this.x - 5, this.y + 5, this.drawRotation * 3)
        Drawf.spinSprite(grandRouter.gears[2], this.x, this.y, this.drawRotation)
        Drawf.spinSprite(grandRouter.gears[0], this.x + 5, this.y - 5, this.drawRotation * 4)
        Drawf.spinSprite(grandRouter.gears[1], this.x + 5, this.y + 5, this.drawRotation * 2)
        Drawf.spinSprite(grandRouter.gears[1], this.x - 5, this.y - 5, this.drawRotation * 5)
        Draw.rect(grandRouter.top, this.x, this.y)
    }
})