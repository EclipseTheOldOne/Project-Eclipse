const phaseDrill = extend(Drill, "phase-drill", {
    canReplace(other){
        this.super$canReplace(other);
        return other == Blocks.laserDrill
    },
    drawPlace(x, y, rotation, valid){
        this.super$drawPlace(x, y, rotation, valid);
        Drawf.dashCircle(x, y, 120, Pal.accent)
        if(!valid){this.drawPlaceText("Can only be placed on Laser Drill!", x, y, false)}
    }
})
phaseDrill.buildType = () => extend(Drill.DrillBuild, phaseDrill, {
    targetBlock: null,
    range: 120,
    update(){
        this.super$update()
        this.dumpLiquid(Liquids.water)
        var targeted = Vars.indexer.findClosestFlag(this.x, this.y, this.team, BlockFlag.storage)
        if(targeted != null){
            this.targetBlock = targeted.build
            var distance = this.dst(targeted.build)
        }else{this.targetBlock = null}
        if(distance <= this.range){
            if(this.targetBlock != null && this.items.total() > 0){
                if(this.targetBlock.acceptItem(this.targetBlock, this.items.first())){
                    this.targetBlock.handleItem(this, this.items.first());
                    Fx.itemTransfer.at(this.x, this.y, 1, this.items.first().color, this.targetBlock)
                    this.items.take()
                }
            }
        }
    },
    drawSelect(){
        this.super$drawSelect()
        Drawf.dashCircle(this.x, this.y, this.range, this.team.color)
    },
    draw(){
        this.super$draw()
        Draw.color(Pal.accent)
        Draw.alpha(0.7)
        Fill.poly(this.x, this.y, 6, 4, Time.time)
        Draw.color(Pal.accentBack)
        Lines.poly(this.x, this.y, 6, 4, Time.time)
    }
})