const eBattery = extend(Battery, "battery-tank", {
    load(){
        this.super$load();
        this.regionLiquid = Core.atlas.find(this.name + "-liquid");
    }
});
eBattery.buildType = () => extend(Battery.BatteryBuild, eBattery, {
    update(){
        this.super$update();
        eBattery.consumes.getPower().capacity = (((this.liquids.total()) / eBattery.liquidCapacity) * 2200000);
        print(this.power.graph.getBatteryStored())
    },
    draw(){
        this.super$draw()
        Draw.rect(eBattery.region, this.x, this.y)
        Drawf.liquid(eBattery.regionLiquid, this.x, this.y, this.liquids.total() / eBattery.liquidCapacity, Color.valueOf("ffe18f"))
    }
});