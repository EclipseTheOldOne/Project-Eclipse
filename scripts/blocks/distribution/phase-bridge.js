const eLib = require("libs/effectLib")
const phaseB = extend(Router, "phase-bridge", {
    range: 220,
    itemCapacity: 250,
    drawPlace(x, y, rotation, valid){
        this.super$drawPlace(x, y, rotation, valid);
        Drawf.dashCircle(x * 8, y * 8, 220, Pal.accent)
    }
})
phaseB.buildType = () => extend(Router.RouterBuild, phaseB, {
    targetBlock: null,
    reload: 0,
    shieldSize: 0,
    updateTile(){},
    onConfigureTileTapped(other){
        if(this != other && other != null){
            var distance = this.dst(other)
            if(other.block.hasItems && distance <= phaseB.range){this.targetBlock = other}
            return false
        }else{
            this.deselect()
            this.targetBlock = null
            return true
        }
    },
    update(){
        this.super$update()
        this.shieldSize = Mathf.lerpDelta(this.shieldSize, this.power.status * 4, 0.1)
        this.reload += Time.delta * this.power.status
        print(this.targetBlock)
        if(this.reload >= 2 && this.isValid() && this.targetBlock){
            if(this.items.first() != null && this.targetBlock.acceptItem(this.targetBlock, this.items.first())){
                this.targetBlock.handleItem(this, this.items.first());
                Fx.itemTransfer.at(this.x, this.y, 1, this.items.first().color, this.targetBlock)
                this.items.take()
                this.reload -= 2
            }
        }
    },
    draw(){
        this.super$draw()
        Draw.color(this.team.color)
        Draw.z(Layer.shields)
        Fill.poly(this.x, this.y, 4, this.shieldSize)
    },
    acceptItem(source, item){
        return this.team == source.team && this.items.get(item) < this.getMaximumAccepted(item)
    },
    drawSelect(){
        this.super$drawSelect()
        Drawf.dashCircle(this.x, this.y, phaseB.range, this.team.color)
        if(this.targetBlock != null){
            Drawf.select(this.targetBlock.x, this.targetBlock.y, this.targetBlock.block.size * 4, this.team.color)
            Drawf.dashLine(this.team.color, this.x, this.y, this.targetBlock.x, this.targetBlock.y)
        }
    },
    drawConfigure(){
        this.super$drawConfigure()
        this.drawSelect()
    }
})