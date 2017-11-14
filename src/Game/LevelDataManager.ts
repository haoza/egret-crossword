// TypeScript file

//每个问题（关卡）的数据结构
class LevelDataItem{
    public answer:string;
    public img:string;
    public word:string;
    public tip:string;
    public content:string;
}

class LevelDataManager {

    // 单例
    private static shared:LevelDataManager;
    public static Shared(){
        if(LevelDataManager.shared == null){
            LevelDataManager.shared = new LevelDataManager();
        }

        return LevelDataManager.shared;
    }

     //一个关卡的保存数据组
    private items:LevelDataItem[] = [];
    
    public constructor() {
          //使用RES读取和构建JSON数据，JSON数据可以直接解析到目标结构
        this.items = RES.getRes("questions_json");
    }

      //通过关卡号获得一个关的数据
    public GetLevel(level:number):LevelDataItem{
          if(level < 0) level = 0;
          if(level >= this.items.length) level = this.items.length - 1;
        return this.items[level];
    }
    //获得当前的游戏最远进度
    public get Milestone():number{
        var milestone = egret.localStorage.getItem("CYDTZ_Milestone");
        //如果没有数据，那么默认值就是第一关
        if(milestone == "" || milestone == null){
            milestone = "1";
        }
        return parseInt(milestone);
    }
    //设置当前的游戏最远进度
    public set Milestone(value:number){
        egret.localStorage.setItem("CYDTZ_Milestone",value.toString());
    }
}