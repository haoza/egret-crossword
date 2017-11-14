// TypeScript file

class AnswerWord extends Word{
    public SelectWord:Word = null;
    public constructor(){
        super();
    }
    protected onclick_tap(){
        if(this.SelectWord != null){
            this.SelectWord.visible = true;
            this.SelectWord = null;
            this.setWordText("");
        }
    }

    public SetSelectWord(word:Word){
        word.visible = false;
        this.setWordText(word.getWordText());
        this.SelectWord = word;
    }
}