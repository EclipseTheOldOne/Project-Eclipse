const therM = extend(ThermalGenerator, "thermal-boiler", {
    load(){
        this.super$load();
        this.region = Core.atlas.find("mindus-thermal-boiler");
        this.regionTop = Core.atlas.find("mindus-thermal-boiler-top");
        this.regionLiquid = Core.atlas.find("mindus-thermal-boiler-liquid");
    }
});
therM.generateEffect = Fx.redgeneratespark
therM.buildType = () => extend(ThermalGenerator.ThermalGeneratorBuild, therM, {
    update(){
        this.super$update()
        if(this.liquids.total() <= 0.4){this.productionEfficiency = 0}else
        {if(Mathf.chance(0.085)){therM.generateEffect.at(this.x, this.y)}}
    }
})