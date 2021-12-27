const multiLib = require("libs/multi-lib");
const multi = multiLib.MultiCrafter(GenericCrafter,GenericCrafter.GenericCrafterBuild,"lab",[
    {
        input: {
            items: ["spore-pod/2"],
            liquids: ["oil/18"],
            power: 2,
        },
        output: {
            items: ["mindus-methane-tank/5"]
        },
        craftTime: 180,
    },
    {
        input: {
            items: ["surge-alloy/1", "silicon/2"],
            liquids: ["water/12"],
            power: 3.5,
        },
        output: {
            liquids: ["mindus-conduct-liquid/12"]
        },
        craftTime: 60,
    }
],{
    load(){
        this.super$load()
        this.liquidRegion = Core.atlas.find("mindus-lab-liquid")
        this.heatRegion = Core.atlas.find("mindus-lab-heat")
    }
},
/*this is Object constructor. This way is much better than literal way{a:123}
you can replace this with {} if you don't want to modify entity*/
function Extra(){
    this.draw = function(){
        this.super$draw()
        Drawf.liquid(multi.liquidRegion, this.x, this.y, this.liquids.total(), Liquids.water.color)
    },
    this.customUpdate = function(){
        if(this.warmup > 0.1 && Mathf.chance(0.1)){
            Fx.mineBig.at(this.x + Mathf.range(8), this.y + Mathf.range(8))
        }
    }
});