const ancNode = new Seq(Building)
const node = extend(Wall, "ancient-laser-node", {})
node.buildType = () => extend(Wall.WallBuild, node, {
    created(){
        this.super$created()
        ancNode.add(this)
    },
    onRemoved(){
        this.super$onRemoved()
        ancNode.remove(this)
    },
    update(){
        this.super$update()
        Geometry.findClosest(this.x, this.y, ancNode)
    }
})