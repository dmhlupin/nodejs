import EventEmitter from "events";



const diffDateToObj = (futureDate) => {
    const currDate = new Date();
    let delta = (futureDate - currDate) / 1000;

    // расчет количества дней и вычитание из разницы
    const days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // расчет количества часов и вычитание из разницы
    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // расчет количества минут и вычитание из разницы
    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    // расчет количества оставшихся секунд
    
    const seconds = Math.floor(delta % 60);

    return {days: days, hours: hours, minutes: minutes, seconds: seconds}
}

const diffToStr = (diff) => {
    return `${diff.days} дней, ${diff.hours} часов, ${diff.minutes} минут, ${diff.seconds} секунд.`
}

const checkDate = (diff) => {
    if (diff.days > 0 && diff.hours > 0 && diff.minutes > 0 && diff.seconds > 0) {
        return true
    } else return false
}

//`${days} дней - ${hours} часов - ${minutes} минут - ${seconds} секунд!`

class Handler {
    static timerRun(payload) {   
        if(!checkDate(diffDateToObj(payload))) {
            // генерируем событие Стоп
            emitterObject.emit('timerStop', payload)
        } else  
        setInterval(() => {
            console.log(diffToStr(diffDateToObj(payload)));
        }, 1000);
    }
    static timerStop(payload) {
        console.log(`Time is up!`);
    }
}

class myEmitter extends EventEmitter {};

const emitterObject = new myEmitter();


// создадим массив таймеров, пока пустой

const timers = [];


// создадим класс для таймера
class Timer {
    constructor(params) {
        this.payload = params.payload;
        this.condition = params.condition;
    }
}

// генератор нового таймера

const generateNewTimer = (data) => {
    const futureDate = new Date(parseInt(data[3]),parseInt(data[2]) - 1, parseInt(data[1]), parseInt(data[0]), 0 , 0);
    const params =  
    {
        payload: futureDate,
        condition: 'timerRun'
    }
    
    return new Timer(params);
}

// Подписываем обработчика на события

emitterObject.on('timerRun', Handler.timerRun);
emitterObject.on('timerStop', Handler.timerStop);



// Получение значений из терминала
const args = process.argv.slice(2);

// Преобразуем данные, полученные из терминала и создадим экземпляр таймера, который положим в массив таймеров

args.forEach((item) => {
    const data = item.split('-');
    if(data.length != 4) {
        console.log('Неверный формат!');
    } else {
        
        const timer = generateNewTimer(data);
        timers.push(timer);

        // сгенерируем событие
        emitterObject.emit('timerRun', timer.payload)
    
    }
})


