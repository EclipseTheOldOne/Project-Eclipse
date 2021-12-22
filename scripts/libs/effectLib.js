const pulseWave = new Effect(20, e => {
    Draw.color(Pal.lancerLaser);
    Lines.stroke(e.fout() * 3);
    Lines.circle(e.x, e.y, e.fin() * 110);
    Draw.alpha(e.fout())
    Fill.circle(e.x, e.y, e.fin() * 110);
});
const mendWave = new Effect(20, e => {
    Draw.color(Pal.heal);
    Lines.stroke(e.fout() * 4);
    Lines.circle(e.x, e.y, e.fin() * 180);
    Draw.alpha(e.fout())
    Fill.circle(e.x, e.y, e.fin() * 180);
});
//basically itemtransfer effect
const itemSlowTransfer = new Effect(120, e => {
    if(!(e.data instanceof Position)) return;
    Tmp.v1.set(e.x, e.y).interpolate(Tmp.v2.set(e.data), e.fin(), Interp.pow3).add(Tmp.v2.sub(e.x, e.y).nor().rotate90(1).scl(Mathf.randomSeedRange(e.id, 1) * e.fslope() * 10));
    var x = Tmp.v1.x, y = Tmp.v1.y;
    var size = 1;

    Lines.stroke(e.fslope() * 2 * size, Pal.accent);
    Lines.circle(x, y, e.fslope() * 2 * size);

    Draw.color(e.color);
    Fill.circle(x, y, e.fslope() * 1.5 * size);
})
module.exports = {
    pulseWave:pulseWave,
    mendWave:mendWave,
    itemSlowTransfer:itemSlowTransfer
};