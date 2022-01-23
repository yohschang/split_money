export default function finalSplit(moneyList) {

    const minArray = (arr, p_len, n_len) => {
        const concat = [].concat(...arr)
        const min = Math.min.apply(null, concat)    
        const res = [];
        for(let i = 0; i < concat.length; i++){
            if(concat[i] !== min){
                continue;
            };
            res.push([parseInt(i/p_len), i%n_len]);
        };
        return res;
        };

    let SplitResult = [];

    let positive = moneyList.filter(m => m.value>=0)
    let negative = moneyList.filter(m => m.value<0)

    while(true){

        positive = positive.filter(m => m.value != 0.0)
        negative = negative.filter(m => m.value != 0.0)
        // console.log(positive)
        // console.log(negative)
        // console.log("+++++++++++")

        let moneyTable = Array(positive.length).fill(0.0)
        for (var i = 0; i < moneyTable.length; i++) {
            moneyTable[i] = new Array(negative.length).fill(0.0);
        }

        for(var i = 0; i < positive.length; i++){
            moneyTable[i] = negative.map((n) => {return n.value + positive[i].value})
        }

        if(negative.length === 1 || positive.length === 1){
            for(var i = 0; i < positive.length; i++){
                for(var j = 0; j < negative.length; j++){
                    let given_m = Math.min(Math.abs(positive[i].value),Math.abs(negative[j].value) )
                    SplitResult = [...SplitResult, [negative[j].name, positive[i].name, given_m]]
                }
            }
            break
        }

        moneyTable = moneyTable.map(mt => mt.map(Math.abs))
        // console.log(moneyTable)
        let xy = minArray(moneyTable, moneyTable.length, moneyTable[0].length)

        let cal_x = []
        let cal_y = []

        for(let[y,x] of xy){
            if(cal_x.includes(x) || cal_y.includes(y)){
            }
            else{
                cal_x = [...cal_x, x]
                cal_y = [...cal_y, y]
                let given_m = Math.min(Math.abs(positive[y].value),Math.abs(negative[x].value))
                SplitResult = [...SplitResult,  [negative[x].name, positive[y].name, given_m]]

                positive[y].value -= given_m 
                negative[x].value += given_m 
            }
        }
    }
    // console.log(SplitResult)
    return SplitResult
}