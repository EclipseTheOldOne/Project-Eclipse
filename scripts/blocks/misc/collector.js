const libE = require("libs/effectLib")
const collectBlocks = new Seq(Building)
const collector = extend(Router, "collector", {
    itemCapacity: 220,
    range: 170,
    drawPlace(x, y, rotation, valid){
        this.super$drawPlace(x, y, rotation, valid)
        Drawf.dashCircle(x * 8, y * 8, this.range, Pal.placing)
    },
    init(){
        this.super$init()
        Events.on(UnitDestroyEvent, event => {
            let u = event.unit
            let a = Geometry.findClosest(u.x, u.y, collectBlocks)
            if(a != null && u != null){
                if(u.within(a, 170) && a.canCollect()){
                    var amount = Mathf.random(0.3, u.hitSize / 2)
                    for(var i = 0; i < 3; i += Mathf.random(1.0)){
                        libE.itemSlowTransfer.at(u.x, u.y, 13, Pal.accent, a)
                    }
                    a.items.add(Items.lead, Mathf.ceil(amount) * 3)
                    a.items.add(Items.titanium, Mathf.ceil(amount) * 2)
                    a.items.add(Items.graphite, Mathf.ceil(amount) * 2)
                    a.items.add(Items.silicon, Mathf.ceil(amount) * 2)
                    a.items.add(Items.scrap, Mathf.ceil(amount) * 5)
                }
            }
        })
    }
})
collector.buildType = () => extend(Router.RouterBuild, collector, {
    shieldSize: 0,
    update(){
        this.super$update()
        this.shieldSize = Mathf.lerpDelta(this.shieldSize, this.power.status * 10, 0.1)
    },
    canCollect(){
        return this.power.status >= 1
    },
    created(){
        this.super$created()
        collectBlocks.add(this)
    },
    onRemoved(){
        this.super$onRemoved()
        collectBlocks.remove(this)
    },
    acceptItem(source, item){
        return this.team == source.team && this.items.get(item) < this.getMaximumAccepted(item)
    },
    drawSelect(){
        this.super$drawSelect()
        Drawf.dashCircle(this.x, this.y, collector.range, this.team.color)
    },
    draw(){
        this.super$draw()
        Draw.color(this.team.color)
        Draw.z(Layer.shields)
        Fill.poly(this.x, this.y, 6, this.shieldSize)
    }
})
