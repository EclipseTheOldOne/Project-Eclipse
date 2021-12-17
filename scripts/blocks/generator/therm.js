const therM = extend(ThermalGenerator, "thermal-boiler", {
    load(){
        this.super$load();
        this.region = Core.atlas.find("mindus-thermal-boiler");
        this.regionTop = Core.atlas.find("mindus-thermal-boiler-top");
        this.regionLiquid = Core.atlas.find("mindus-thermal-boiler-inLiquid");
    }
});
therM.generateEffect = Fx.redgeneratespark;
therM.buildType = () => extend(ThermalGenerator.ThermalGeneratorBuild, therM, {
    update(){
        this.super$update();
        if(this.liquids.total() <= 0.4){this.productionEfficiency = 0.35; if(Mathf.chance(0.085)){therM.generateEffect.at(this.x, this.y)}}else
        {if(Mathf.chance(0.085)){therM.generateEffect.at(this.x, this.y)}};
    },
    draw(){
        this.super$draw();
        Draw.rect(therM.region, this.x, this.y);
        Drawf.liquid(therM.regionLiquid, this.x, this.y, this.liquids.total() / therM.liquidCapacity, this.liquids.current().color)
    }
})