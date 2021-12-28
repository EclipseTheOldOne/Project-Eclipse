const spinny = extend(Separator, "crystalizer", {
    load(){
        this.super$load()
        this.top = Core.atlas.find("mindus-crystalizer-top")
    }
})
spinny.buildType = () => extend(Separator.SeparatorBuild, spinny, {
    draw(){
        this.super$draw()
        Draw.rect(spinny.top, this.x, this.y)
    }
})