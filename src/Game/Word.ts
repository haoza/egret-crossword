// TypeScript file

class Word extends eui.Component {
    protected lb_text: eui.Label;
    public constructor() {
        super();
        this.skinName = "src/Game/WordSkin.exml";
        this.addEventListener(eui.UIEvent.COMPLETE, this.UIcomplete, this);
    }


    protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);

    }

    private UIcomplete(): void {
        this.lb_text.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapWord, this);
    }

    protected tapWord(e: egret.Event): void {
         SceneGame.Shared().onclick_word(this);
    }
    //这里没有做成属性的原因是因为当应用到eui的时候，Skin还未指定，运行时候会出现报错，如果指定了SkinName，那么就会产生两次eui的构建浪费内存
    public setWordText(value: string) {
        this.lb_text.text = value;
    }
    public getWordText(): string {
        return this.lb_text.text;
    }
}

//继承自“问题字”，“答案字”是放在上面回答区域，
//由于当答案字点击的时候，答案字会消失并将对应的问题字还原显示
class AnswerWord extends Word {
    public SelectWord: Word = null;
    public constructor() {
        super();
    }
    protected tapWord() {

        if (this.SelectWord != null) {
            this.SelectWord.visible = true;
            this.SelectWord = null;
            this.setWordText("");
        }
        console.log("AnswerWord");
    }
    //当一个问题字被选择添加到回答的时，设置不可见，并保存到本对象中以后使用
    public SetSelectWord(word: Word) {
        if (word) {
            word.visible = false;
            this.setWordText(word.getWordText());

        }
        else{
              this.setWordText('');
        }

        this.SelectWord = word;
    }
}