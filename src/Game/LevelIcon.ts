
class LevelIcon extends eui.Button {
    private lb_level: eui.Label;
    public constructor() {
        super();
        this.skinName = "src/Game/levelIconSkin.exml";
    }
    public get Level(): number {
        return parseInt(this.lb_level.text);
    }
    public set Level(value: number) {
        if (this.lb_level) {
            this.lb_level.text = value.toString();
        }
    }
}
