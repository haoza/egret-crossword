// TypeScript file
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//每个问题（关卡）的数据结构
var LevelDataItem = (function () {
    function LevelDataItem() {
    }
    return LevelDataItem;
}());
__reflect(LevelDataItem.prototype, "LevelDataItem");
var LevelDataManager = (function () {
    function LevelDataManager() {
        //一个关卡的保存数据组
        this.items = [];
        //使用RES读取和构建JSON数据，JSON数据可以直接解析到目标结构
        this.items = RES.getRes("questions_json");
    }
    LevelDataManager.Shared = function () {
        if (LevelDataManager.shared == null) {
            LevelDataManager.shared = new LevelDataManager();
        }
        return LevelDataManager.shared;
    };
    //通过关卡号获得一个关的数据
    LevelDataManager.prototype.GetLevel = function (level) {
        if (level < 0)
            level = 0;
        if (level >= this.items.length)
            level = this.items.length - 1;
        return this.items[level];
    };
    Object.defineProperty(LevelDataManager.prototype, "Milestone", {
        //获得当前的游戏最远进度
        get: function () {
            var milestone = egret.localStorage.getItem("CYDTZ_Milestone");
            //如果没有数据，那么默认值就是第一关
            if (milestone == "" || milestone == null) {
                milestone = "1";
            }
            return parseInt(milestone);
        },
        //设置当前的游戏最远进度
        set: function (value) {
            egret.localStorage.setItem("CYDTZ_Milestone", value.toString());
        },
        enumerable: true,
        configurable: true
    });
    return LevelDataManager;
}());
__reflect(LevelDataManager.prototype, "LevelDataManager");
