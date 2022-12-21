import colors from 'colors';
import { argv } from 'process';



const simpleDig = (a, b) => {
    const array = [];
    const limit = Math.sqrt(b)
    const result = [];

    for (let i = a; i <= b; i++) {
        let simple = true;
        if(i == 0 || i == 1) {
            simple = false;
        }
        for (let j = 2; (j <= i/2 && simple); j++) {
            if (i % j == 0) {
                simple = false;
            }
        }
        if (simple) {
            result.push(i);
        }
        
    }
    return result;
}


// const args = process.argv.slice(2)
// args.forEach(element => {
//     console.log(colors.red(`Hello, ${element}`));    
// });



const output = (a, b) => {
    const message = '';
    let outputArr = [];

    if (Number.isInteger(a) && Number.isInteger(b)) {
        if(a == b) {
            console.log(colors.yellow("вы ввели одинаковые значения!"));
        } else {
            if(a > b){
                outputArr = simpleDig(b,a);
            } 
            else outputArr = simpleDig(a,b);
            if(!outputArr.length) {
                console.log(colors.red("В диапазоне нет простых чисел!"))
            } else {
                for (let i = 0; i < outputArr.length; i = i+3) {
                    console.log(colors.green(outputArr[i]));
                    if(i+1 < outputArr.length) {
                        console.log(colors.yellow(outputArr[i+1]));
                    }
                    if(i+2 < outputArr.length) {
                        console.log(colors.red(outputArr[i+2]));
                    }
                }
            }
        }
    }
    else console.log( colors.red("Неправильный ввод данных!"));
}
const args = process.argv.slice(2);
output(parseInt(args[0]), parseInt(args[1]));
