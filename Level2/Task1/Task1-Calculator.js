class Calc{
    constructor(){
        this.exp = "";
        this.disExp = Array();
        this.lastoperator = "";
        this.preANS = "";
    }
    getFreq(str,v){
        return str.length - str.replace(v, "").length;
    }
    change(exp=null, lopr=null){
        if(exp!=null)
            this.exp = exp;
        if(lopr!=null)
            this.lastoperator = lopr;
    }
    passNum(value){
        if(this.lastoperator == ')'){
            this.change(this.exp+'*'+value);
            this.disExp.push(value);
        } else{
            this.change(this.exp+value);
            this.disExp.push(value);
        }
        this.display();
    }
    passOper(value){
        if(this.exp.charAt(-1) == value) return;
        if(this.exp == "" && value =='-') {
            this.change(
                this.exp+value,
                value);
            this.disExp.push(value);
            this.display();
            return;
        }
        switch(value){
            case '(': if(/[0-9]/.test(this.exp.charAt(this.exp.length-1))){
                    this.change(
                        this.exp+'*'+value,
                        value);
                    this.disExp.push(value);
                } else{
                    this.change(
                        this.exp+value,
                        value);
                        this.disExp.push(value);
                } break;
            case ')': if(this.getFreq(this.exp,'(')>this.getFreq(this.exp,')')){
                    this.change(
                        this.exp+value,
                        value);
                    this.disExp.push(value);
                } break;
            case 'ANS': this.change(this.exp+this.preANS);
                this.disExp.push(this.preANS);
                break;
            case 'DEL': this.change(this.exp.slice(0,-1)); 
                this.disExp.pop();
                break;
            case 'CLR': this.change("","");
                this.disExp = Array();
                document.querySelector('.expression').value = "";
                document.querySelector('.answer').value = "";
                return;
                break;
            case '%': if(/[+\-\/*%]/g.test(this.exp.charAt(this.exp.length-1))){
                    this.change(
                        this.exp.slice(0,-1)+value,
                        value);
                        this.disExp.pop();
                        this.disExp.push(value);
                } else{
                    this.change(
                        this.exp+value, 
                        value);
                    this.disExp.push(value);
                } break;
            case 'SQRT': break;
            case '*': if(/[+\-\/*%]/g.test(this.exp.charAt(this.exp.length-1))){
                    this.change(
                        this.exp.slice(0,-1)+value,
                        value);
                        this.disExp.pop();
                        this.disExp.push("\xD7")
                } else{
                    this.change(
                        this.exp+value,
                        value);
                    this.disExp.push("\xD7");
                } break;
            case '/': if(/[+\-\/*%]/g.test(this.exp.charAt(this.exp.length-1))){
                    this.change(
                        this.exp.slice(0,-1)+value, 
                        value);
                        this.disExp.pop;
                        this.disExp.push('\xF7');
                } else{
                    this.change(
                        this.exp+value,
                        value);
                        this.disExp.push('\xF7');
                } break;
            case '+': if(/[+\-\/*%]/g.test(this.exp.charAt(this.exp.length-1))){
                    this.change(
                        this.exp.slice(0,-1)+value, 
                        value);
                        this.disExp.pop();
                        this.disExp.push(value);
                } else{
                    this.change(
                        this.exp+value,
                        value);
                    this.disExp.push(value);
                } break;
            case '-': this.change(
                        this.exp+value, 
                        value);
                this.disExp.push(value);
                break;
            case '.': if(this.lastoperator != '.'){
                    this.change(
                        this.exp+value,
                        value);
                    this.disExp.push(value)
                } break;
            case '**':if(/[+\-\/*%]/g.test(this.exp.charAt(this.exp.length-1))){
                    this.change(
                        this.exp.slice(0,-1)+value,
                        value);
                    this.disExp.pop();
                    this.disExp.push('^')
                } else{
                    this.change(
                        this.exp+value,
                        value);
                    this.disExp.push('^')
                } break;
        }
        this.display()
    }
    toString(arr,i){
        if(i==(arr.length-1))
            return arr[i];
        return String(arr[i])+String(this.toString(arr[i+1]));
    }
    display(){
        document.querySelector('.expression').value = this.disExp.join('');
    }
    evaluate(){
        document.querySelector('.answer').style.color = 'rgb(22, 66, 93)';
        try{this.preANS = Math.round(eval(this.exp)*1000)/1000;}
        catch(err){
            document.querySelector('.answer').style.color = 'red';
            document.querySelector('.answer').value = err.message;
            return;
        }
        document.querySelector('.answer').value = this.preANS;
    }
}
var c = new Calc();
var num = document.querySelectorAll('.num');
var opr = document.querySelectorAll('.operation');
var ren = document.querySelector('.Enter');
for(const button of num){
    button.addEventListener('click', () => {
        c.passNum(button.value);
    })
}
for(const button of opr){
    button.addEventListener('click', () => {
        c.passOper(button.value);
    })
}
ren.addEventListener('click', () => {
    c.evaluate()
})