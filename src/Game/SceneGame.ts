class SceneGame extends eui.Component implements eui.UIComponent {

	private static shared: SceneGame;
	public static Shared() {
		if (SceneGame.shared == null) {
			SceneGame.shared = new SceneGame();
		}
		return SceneGame.shared;
	}

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.UIcomplete, this);
		this.skinName = "src/Game/SceneGameSkin.exml";
	}
	//对象变量
	private group_answer: eui.Group;
	private group_words: eui.Group;
	private img_question: eui.Image;
	private btn_back: eui.Button;
	private levelIndex: number;

	private group_win: eui.Group;//胜利界面的group控件
	private btn_next: eui.Button;//下一个题目
	private lb_explain: eui.Label;//解释
	private lb_from: eui.Label;//来源

	private UIcomplete() {
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_back, this);
		this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_next, this);

	}


	//初始化关卡
	public InitLevel(level: number) {
		this.levelIndex = level;
		var leveldata = LevelDataManager.Shared().GetLevel(level);
		//将字段接起来
		var words = leveldata.answer + leveldata.word;
		//随机一个其它题目的字段混合进本题目
		while (words.length == 10) {
			var i = Math.floor(Math.random() * 400);
			if (i != level) {
				var temp = LevelDataManager.Shared().GetLevel(i);
				words += temp.word + temp.answer;
			}
		}
		//对字段重排
		var wordlist: string[] = [];
		for (var i = 0; i < words.length; i++) {
			wordlist.push(words.charAt(i));
		}
		wordlist = this.randomlist(wordlist);
		//赋值
		for (var i = 0; i < this.group_words.numChildren; i++) {
			var wordrect = <Word>this.group_words.getChildAt(i);
			wordrect.setWordText(wordlist[i]);
			wordrect.visible = true;
		}
		//重置一些状态
		for (var i = 0; i < this.group_answer.numChildren; i++) {
			var answerrect = <AnswerWord>this.group_answer.getChildAt(i);
			answerrect.SetSelectWord(null);
			answerrect.visible = true;
			answerrect.SelectWord = null;
		}
		//显示图像
		this.img_question.source = "resource/assets/" + leveldata.img;
	}

	//将一个数列随机
	private randomlist(arr: any[]): any[] {
		var array = [];
		while (arr.length > 0) {
			var i = Math.floor(Math.random() * arr.length);
			array.push(arr[i]);
			arr.splice(i, 1);
		}
		return array;
	}

	//当字点击的时候，由word类抛出
	public onclick_word(word: Word) {
		//找到一个合适的位置添加进答案内容
		var sel: AnswerWord = null;
		for (var i = 0; i < this.group_answer.numChildren; i++) {
			var answer = <AnswerWord>this.group_answer.getChildAt(i);
			if (answer.SelectWord == null) {
				sel = answer;

				break;
			}
		}
		//当有一个合适的位置的时候就会将字填充，并判断是否胜利
		if (sel != null) {
			sel.SetSelectWord(word);
			//判断是否胜利
			var check_str: string = "";
			for (var i = 0; i < this.group_answer.numChildren; i++) {
				var answer = <AnswerWord>this.group_answer.getChildAt(i);
				check_str += answer.getWordText();
			}
			if (check_str == LevelDataManager.Shared().GetLevel(this.levelIndex).answer) {
				//胜利
				this.showWin();
			}
		}
	}
	private onclick_back() {
		this.parent.addChild(SceneLevels.Shared());
		this.parent.removeChild(this);
	}

	private onclick_next() {
		//下一个题目
		this.group_win.visible = false;
		SceneLevels.Shared().OpenLevel(this.levelIndex + 1);
		this.InitLevel(this.levelIndex + 1);
	}

	private showWin() {
		this.group_win.visible = true;
		var leveldata = LevelDataManager.Shared().GetLevel(this.levelIndex);
		this.lb_from.text = leveldata.tip;
		this.lb_explain.text = leveldata.content;
	}
	protected childrenCreated(): void {
		super.childrenCreated();
	}

}