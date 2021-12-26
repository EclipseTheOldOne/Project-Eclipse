const eLib = require("libs/effectLib")
const phaseCrafter = extend(GenericCrafter, "big-phase", {
    load(){
        this.super$load()
        this.region = Core.atlas.find(this.name)
        this.topRegion = Core.atlas.find(this.name + "-top")
        this.barRegion = Core.atlas.find(this.name + "-bar")
        this.pointRegion = Core.atlas.find(this.name + "-point")
        this.phaseRegion = Core.atlas.find(this.name + "-phase")
    }
})
phaseCrafter.buildType = () => extend(GenericCrafter.GenericCrafterBuild, phaseCrafter, {
    drawTime: 0,
    drawTime2: 0,
    drawPhaseAlpha: 0,
    bubbleInterval: 0,
    update(){
        this.super$update()
        var a
        if(this.cons.valid()){a = 1}else(a = 0)
        this.drawTime = Mathf.lerp(this.drawTime, this.edelta() * a, 0.05)
        this.drawTime2 += this.drawTime
        this.drawPhaseAlpha = Mathf.lerpDelta(this.drawPhaseAlpha, this.progress, 0.2)
        this.bubbleInterval += Mathf.random(0, this.efficiency())
        if(this.bubbleInterval >= 10 && this.shouldConsume() && this.cons.valid()){
            eLib.phaseBubble.at(Mathf.range(8.0) + this.x, Mathf.range(8.0) + this.y)
            this.bubbleInterval = 0
        }
    },
    draw(){
        Draw.rect(phaseCrafter.region, this.x, this.y)
        Draw.alpha(this.drawPhaseAlpha)
        Draw.rect(phaseCrafter.phaseRegion, this.x, this.y)
        Draw.alpha(1)
        Draw.rect(phaseCrafter.barRegion, this.x, this.y + Mathf.sin(this.drawTime2, 10, 9.75))
        Draw.rect(phaseCrafter.pointRegion, this.x + Mathf.sin(this.drawTime2, 7, 9.75), this.y + Mathf.sin(this.drawTime2, 10, 9.75))
        Draw.rect(phaseCrafter.pointRegion, this.x + Mathf.cos(this.drawTime2, 7, 9.75), this.y + Mathf.sin(this.drawTime2, 10, 9.75))
        Draw.rect(phaseCrafter.barRegion, this.x, this.y + Mathf.cos(this.drawTime2, 10, 9.75))
        Draw.rect(phaseCrafter.pointRegion, this.x + Mathf.sin(this.drawTime2 + 3, 7, 9.75), this.y + Mathf.cos(this.drawTime2, 10, 9.75))
        Draw.rect(phaseCrafter.pointRegion, this.x + Mathf.cos(this.drawTime2 + 3, 7, 9.75), this.y + Mathf.cos(this.drawTime2, 10, 9.75))
        Draw.z(Layer.block + 0.002)
        Draw.rect(phaseCrafter.topRegion, this.x, this.y)
    }
})