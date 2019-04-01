const axios = require('axios');

const FEED_TOKEN = "";
const ISSUE_TOKEN = "";
const PERSONAL_TOKEN = "";
const MIRABO_CORE_MEETING_ID = "10434907";
  

let res = "";
const token = { private_token: PERSONAL_TOKEN};
// const issueToken = { private_token: ISSUE_TOKEN};

function fetchSample() {
    // axios.get('https://gitlab.com/mirabo/coremeeting/issues', {params: token})
    axios.get('https://gitlab.com/api/v4/issues',{params: token})
        .then((res) => {
            console.log(res);
        })
        .catch(err => {
            console.log(`err: ${err}`);
        }
    );
} 


function generatorMeetingIssue(requestParams) {
    // const requestParams = {private_token: PERSONAL_TOKEN, description: requestParams.description, title: requestParams.title, labels: requestParams.labels, due_date: requestParams.due_date};
    // axios.post(`https://gitlab.com/api/v4/projects/${MIRABO_CORE_MEETING_ID}/issues`, {params: requestParams})
    axios.post(`https://gitlab.com/api/v4/projects/${MIRABO_CORE_MEETING_ID}/issues?private_token=${PERSONAL_TOKEN}&title=${encodeURIComponent(requestParams.title)}&description=${encodeURIComponent(requestParams.description)}&due_date=${encodeURIComponent(requestParams.due_date)}`)
    .then((res) => {
        flag = true;
        console.log("OK");
        console.log(res);
    })
    .catch(err => {
        console.log(`err: ${err}`);
    })
}



Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}


let count = 13;
let dayCount = 1;
let flag = true;


// fetchSample(title, description, labels, due_date);

let requestParamsArray = [];
let promiseArray = [];

for(let i=0; i < 50; i ++) {
    let title = `#${count} Mirabo core meeting`;
    let temp_due_date = new Date().addDays(-1);
    let due_date = temp_due_date.addDays(dayCount * 7).toJSON().slice(0,10);
    let description = `#${count} Mirabo regular Meeting ${due_date}\nThời gian: ${due_date} 10:00 JPT\n\n# Nội dung: \nReport task đang làm (ngắn gọn nếu không có issue): \n## Done \n \n## Đức trình bày tình hình sale  \n*  Dự Án 1 : mô tả 1.\n \n## Tuấn trình bày dự án  \n#### Completed\n- [ ] Công việc 1. (1h)\n\n#### Doing\n- [ ] Đang làm xxx\n#### Next\n- [ ] HIGH: \n- [ ] MID: \n\n## Sơn trình bày dự án  \n#### Completed\n- [ ] Công việc 1. (1h)\n\n#### Doing\n- [ ] Đang làm xxx\n\n#### Next\n- [ ] HIGH: \n- [ ] MID:\n\n## Hải trình bày dự án\n#### Completed\n- [ ] Công việc 1. (1h)\n\n#### Doing\n- [ ] Đang làm xxx\n#### Next\n- [ ] HIGH: \n- [ ] MID:\n\n## OTHER NOTE:`;
    let labels = ["Meeting regular"];
    const requestParams = {private_token: PERSONAL_TOKEN, description: description, title: title, labels: labels, due_date: due_date};
    requestParamsArray.push(requestParams);
    count++;
    dayCount++;
    
    // generatorMeetingIssue(title, description, labels, due_date);
}

requestParamsArray.map(item => {
    const createPromise = new Promise(() => {
        generatorMeetingIssue(item);
    });
    promiseArray.push(createPromise);
})

console.log(requestParamsArray);
// generatorMeetingIssue(title, description, labels, due_date);


var promise = promiseArray.reduce(
    function( series, task ) {

        return( series.then( task ) );

    },
    Promise.resolve()
);