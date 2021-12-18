const clicker = extend(PowerGenerator, "clicker", {
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
    buildConfiguration(table){
        this.super$buildConfiguration(table)
        table.button(Icon.power, () => {
            this.eff = Mathf.clamp(this.eff + 0.25, 0, 1)
        })
    },
    update(){
        this.super$update();
        if(this.reloadE >= 1){
            this.reloadE = 0
            this.eff = Mathf.clamp(this.eff - 0.05, 0, 1)
        }else{this.reloadE += 0.016667}
        this.productionEfficiency = this.eff
    },
    draw(){
        this.super$draw()
        Draw.rect("mindus-clicker-generator", this.x, this.y);
        Draw.blend(Blending.additive);
        Draw.color(Color.valueOf("e58956"))
        Draw.alpha(this.eff);
        Draw.rect("mindus-clicker-generator-glow", this.x, this.y);
        Draw.blend();
    }
});