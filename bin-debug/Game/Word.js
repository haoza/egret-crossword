// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Word = (function (_super) {
    __extends(Word, _super);
    function Word() {
        var _this = _super.call(this) || this;
        _this.skinName = "src/Game/WordSkin.exml";
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.UIcomplete, _this);
        return _this;
    }
    Word.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Word.prototype.UIcomplete = function () {
        this.lb_text.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapWord, this);
    };
    Word.prototype.tapWord = function (e) {
        SceneGame.Shared().onclick_word(this);
    };
    //这里没有做成属性的原因是因为当应用到eui的时候，Skin还未指定，运行时候会出现报错，如果指定了SkinName，那么就会产生两次eui的构建浪费内存
    Word.prototype.setWordText = function (value) {
        this.lb_text.text = value;
    };
    Word.prototype.getWordText = function () {
        return this.lb_text.text;
    };
    return Word;
}(eui.Component));
__reflect(Word.prototype, "Word");
//继承自“问题字”，“答案字”是放在上面回答区域，
//由于当答案字点击的时候，答案字会消失并将对应的问题字还原显示
var AnswerWord = (function (_super) {
    __extends(AnswerWord, _super);
    function AnswerWord() {
        var _this = _super.call(this) || this;
        _this.SelectWord = null;
        return _this;
    }
    AnswerWord.prototype.tapWord = function () {
        if (this.SelectWord != null) {
            this.SelectWord.visible = true;
            this.SelectWord = null;
            this.setWordText("");
        }
        console.log("AnswerWord");
    };
    //当一个问题字被选择添加到回答的时，设置不可见，并保存到本对象中以后使用
    AnswerWord.prototype.SetSelectWord = function (word) {
        if (word) {
            word.visible = false;
            this.setWordText(word.getWordText());
        }
        else {
            this.setWordText('');
        }
        this.SelectWord = word;
    };
    return AnswerWord;
}(Word));
__reflect(AnswerWord.prototype, "AnswerWord");
