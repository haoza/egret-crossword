// TypeScript file
class SceneLevels extends eui.Component {

    private static shared: SceneLevels;
    public static Shared() {
        if (SceneLevels.shared == null) {
            SceneLevels.shared = new SceneLevels();
        }
        return SceneLevels.shared;
    }
    private btn_back: eui.Button;
    private group_levels: eui.Group;
    private level_group: eui.Scroller;

    private img_arrow: eui.Image;
    private sel_level: number = 0;
    private LevelIcons: LevelIcon[] = [];

    public constructor() {
        super();
        this.skinName = "src/Game/SceneLevelsSkin.exml";
        this.addEventListener(eui.UIEvent.COMPLETE, this.complete, this);

    }


    private complete() {
        // 禁止横向滚动
        this.level_group.scrollPolicyH = eui.ScrollPolicy.OFF;
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_back, this);
        //创建地图选项
        var row = 20;
        var col = 10;
        var spanx = 640 / col;      //计算行x间隔
        var spany = 1150 / row;     //计算列y间隔
        var group = new eui.Group();//地图背景
        group.width = 640;
        group.height = (spany * 400);//算出最大尺寸
        //填充背景
        for (var i = 0; i < (group.height / 1150); i++) {
            var img = new eui.Image();
            img.source = RES.getRes("GameBG2_jpg");
            img.y = i * 1150;
            img.touchEnabled = false;
            this.group_levels.addChildAt(img, 0);

        }
        var milestone: number = LevelDataManager.Shared().Milestone;
        //以正弦曲线绘制关卡图标的路径
        for (var i = 0; i < 400; i++) {
            var icon = new LevelIcon();
            icon.Level = i + 1;
            icon.y = spany * i / 2;
            icon.x = Math.sin(icon.y / 180 * Math.PI) * 200 + group.width / 2;
            icon.y += spany * i / 2;
            icon.y = group.height - icon.y - spany;
            group.addChild(icon);
            icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_level, this);
            //依据进度设置关卡显示
            icon.enabled = i < milestone+1;
            //保存到一个列表中
            this.LevelIcons.push(icon);
        }

        //开启位图缓存模式
        // group.cacheAsBitmap = true;
        this.group_levels.addChild(group);
        //卷动到最底层
        this.group_levels.scrollV = group.height - 1150;

        this.img_arrow = new eui.Image();
        this.img_arrow.source = RES.getRes('img_arrow');
        this.addChild(this.img_arrow);

    }

    private onclick_back() {
        this.parent.addChild(ScenceBegin.Shared());
        this.parent.removeChild(this);
    }
    private onclick_level(e: egret.TouchEvent) {
        var icon = <LevelIcon>e.currentTarget;
        if (this.sel_level != icon.Level) {
            this.img_arrow.x = icon.x;
            this.img_arrow.y = icon.y;
            this.sel_level = icon.Level;
        } else {
            //进入并开始游戏
            this.parent.addChild(SceneLevels.Shared());
            this.parent.removeChild(this);
        }
    }
}