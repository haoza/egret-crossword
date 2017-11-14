// TypeScript file

class Word extends eui.Component{
    protected lb_text:eui.Label;
    public constructor(){
        super();
    }

   
	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
        this.addEventListener(eui.UIEvent.COMPLETE,this.UIcomplete,this);
		
	}

    private UIcomplete():void{
        this.lb_text.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapWord,this);
    }

    private tapWord(e:egret.Event):void{
        console.log(this.lb_text)
    }
     //这里没有做成属性的原因是因为当应用到eui的时候，Skin还未指定，运行时候会出现报错，如果指定了SkinName，那么就会产生两次eui的构建浪费内存
    public setWordText(value:string){
        this.lb_text.text = value;
    }
    public getWordText():string{
        return this.lb_text.text;
    }
}