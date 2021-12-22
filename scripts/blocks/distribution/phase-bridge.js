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
    updateTile(){},
    update(){
        this.super$update()
        var a = Vars.indexer.findClosestFlag(this.x, this.y, this.team, BlockFlag.core)
        if(a != null){
            this.targetBlock = a.build
            var distance = this.dst(this.targetBlock)
        }
        if(this.cons.valid()){
            this.reload += Time.delta
        }
        if(distance <= phaseB.range){
            if(this.targetBlock != null && this.items.total() > 0 && this.reload >= 2){
                if(this.targetBlock.acceptItem(this.targetBlock, this.items.first())){
                    this.targetBlock.handleItem(this, this.items.first());
                    eLib.itemSlowTransfer.at(this.x, this.y, 1, this.items.first().color, this.targetBlock)
                    this.items.take()
                }
                this.reload -= 2
            }
        }
    },
    acceptItem(source, item){
        return this.team == source.team && this.items.get(item) < this.getMaximumAccepted(item)
    },
    drawSelect(){
        this.super$drawSelect()
        Drawf.dashCircle(this.x, this.y, phaseB.range, this.team.color)
        if(this.targetBlock != null){
            var distance = this.dst(this.targetBlock)
            if(distance < this.range){
                Drawf.select(this.targetBlock.x, this.targetBlock.y, this.targetBlock.block.size * 4, this.team.color)
                Drawf.select(this.x, this.y, this.size * 4, this.team.color)
                Drawf.dashLine(this.team.color, this.x, this.y, this.targetBlock.x, this.targetBlock.y)
            }
        }
    }
})