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
var ScenceBegin = (function (_super) {
    __extends(ScenceBegin, _super);
    function ScenceBegin() {
        var _this = _super.call(this) || this;
        _this.skinName = "src/Game/SceneBeginSkin.exml";
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.UIcomplete, _this);
        return _this;
    }
    ScenceBegin.Shared = function () {
        if (ScenceBegin.shared == null) {
            ScenceBegin.shared = new ScenceBegin();
        }
        return ScenceBegin.shared;
    };
    ScenceBegin.prototype.UIcomplete = function () {
        this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onclick_begin, this);
        this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onclick_setting, this);
    };
    ScenceBegin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    ScenceBegin.prototype.onclick_begin = function () {
        this.parent.addChild(SceneLevels.Shared());
        this.parent.removeChild(this);
    };
    ScenceBegin.prototype.onclick_setting = function () {
        SoundMenager.Shared().PlayClick();
        this.addChild(GameSetting.Shared());
    };
    return ScenceBegin;
}(eui.Component));
__reflect(ScenceBegin.prototype, "ScenceBegin");
