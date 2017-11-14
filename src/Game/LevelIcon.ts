// TypeScript file

class LevelIcon extends eui.Button {
    private lb_level: eui.Button;
    public constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE,this.UIcomplete,this);
        this.skinName = 'src/Game/levelIconSkin.exml';
    }

    private UIcomplete(): void{
        console.log('UIcomplete')
    }

    protected createChildren() {
        super.createChildren();
        console.log("createChildren")
    }
    public get Level(): number {
        if(this.lb_level){
            return parseInt(this.lb_level.label);
        }
    }
    public set Level(value: number) {
        if (this.lb_level) {
            this.lb_level.label = value.toString();
        }
    }
}