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
module.exports = {
    pulseWave:pulseWave,
    mendWave:mendWave
};