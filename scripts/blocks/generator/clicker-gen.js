const clicker = extend(PowerGenerator, "clicker-generator", {
    setBars(){
        this.super$setBars()
        this.bars.remove("power")
        this.bars.add("eff", entity => new Bar(
            () => "Efficiency",
            () => Color.valueOf("e58956"),
            () => entity.productionEfficiency
        ));
    }
});
clicker.buildType = () => extend(PowerGenerator.GeneratorBuild, clicker, {
    reloadE: 0.0,
    eff: 0.0,
    displayEff: 0.1,
    buildConfiguration(table){
        this.super$buildConfiguration(table)
        table.button(Icon.power, () => {
            this.eff = Mathf.clamp(this.eff + 0.25, 0, 1)
        })
    },
    update(){
        this.super$update();
        this.eff = Mathf.clamp(this.eff - 1 / 10 / 60, 0, 1)
        this.productionEfficiency = this.eff
        this.displayEff += (this.eff - this.displayEff) / 5
    },
    draw(){
        this.super$draw()
        Draw.rect("mindus-clicker-generator", this.x, this.y);
        Draw.blend(Blending.additive);
        Draw.color(Color.valueOf("e58956"))
        Draw.alpha(this.displayEff);
        Draw.rect("mindus-clicker-generator-glow", this.x, this.y);
        Draw.blend();
    },
    status(){
        if(this.eff >= 0.2){return BlockStatus.active}else{if(this.eff > 0){return BlockStatus.noOutput}}
        return BlockStatus.noInput
    }
});