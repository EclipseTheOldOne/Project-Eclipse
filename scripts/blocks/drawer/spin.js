const eLib = require("libs/effectLib")
const spinny = extend(Separator, "crystalizer", {
    load(){
        this.super$load()
        this.top = Core.atlas.find("mindus-crystalizer-top")
    }
})
const spinnyA = extend(Separator, "salt-collector", {
    load(){
        this.super$load()
        this.rotor = Core.atlas.find("mindus-salt-collector-rotor")
        this.top = Core.atlas.find("mindus-salt-collector-top")
    }
})
spinny.buildType = () => extend(Separator.SeparatorBuild, spinny, {
    update(){
        this.super$update()
        if(this.warmup > 0.1 && Mathf.chance(0.1)){
            eLib.waterBubble.at(this.x + Mathf.range(4), this.y + Mathf.range(4))
        }
    },
    draw(){
        this.super$draw()
        Draw.z(Layer.block + 0.002)
        Draw.rect(spinny.top, this.x, this.y)
    }
})
spinnyA.buildType = () => extend(Separator.SeparatorBuild, spinnyA, {
    update(){
        this.super$update()
        if(this.warmup > 0.1 && Mathf.chance(0.1)){
            eLib.waterBubble.at(this.x + Mathf.range(8), this.y + Mathf.range(8))
        }
    },
    draw(){
        this.super$draw()
        Draw.rect(spinnyA.rotor, this.x, this.y, -this.totalProgress * 2)
        Draw.z(Layer.block + 0.002)
        Draw.rect(spinnyA.top, this.x, this.y)
    }
})