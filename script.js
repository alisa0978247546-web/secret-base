// ======================
// 💖 基本資料
// ======================
let startDate = new Date("2025-10-06");

let girlBirth = new Date("2004-06-04");
let boyBirth = new Date("2003-09-28");

function getAge(birth){
  return new Date().getFullYear() - birth.getFullYear();
}

function updateInfo(){

  let days = Math.floor((new Date() - startDate)/(1000*60*60*24));

  if(document.getElementById("days")){
    document.getElementById("days").innerText =
      `💖 在一起第 ${days} 天`;
  }

  if(document.getElementById("info")){
    document.getElementById("info").innerText =
      `👩 女 ${getAge(girlBirth)}歲 ｜ 👨 男 ${getAge(boyBirth)}歲`;
  }
}
updateInfo();


// ======================
// 📦 全部資料
// ======================
let food = [];
let movies = [];
let tasks = [];
let money = [];


// ======================
// 📌 主選單
// ======================
function show(type){

  let c = document.getElementById("content");

  if(type === "food"){
    c.innerHTML = `
      <h2>🍜 美食</h2>
      <input id="f1" placeholder="餐廳名稱">
      <button onclick="addFood()">新增 + Google Map</button>
      <div id="list"></div>
    `;
    renderFood();
  }

  if(type === "map"){
    showMap();
  }

  if(type === "movie"){
    showMovie();
  }

  if(type === "task"){
    showTask();
  }

  if(type === "money"){
    showMoney();
  }
}


// ======================
// 🍜 美食 + Google Map
// ======================
function addFood(){

  let name = document.getElementById("f1").value;
  if(!name) return;

  let map = "https://www.google.com/maps/search/" + encodeURIComponent(name);

  food.push({name,map});
  renderFood();
}

function renderFood(){

  let box = document.getElementById("list");
  if(!box) return;

  box.innerHTML = "";

  food.forEach(f=>{
    box.innerHTML += `
      <div class="card">
        🍜 ${f.name}<br>
        <button onclick="window.open('${f.map}')">📍 Google Map</button>
      </div>
    `;
  });
}


// ======================
// 📍 🇹🇼 完整台灣地圖
// ======================
const taiwan = {

  "台北市":["中正區","大同區","中山區","松山區","大安區","信義區","士林區","北投區","內湖區","南港區","文山區"],

  "新北市":["板橋區","三重區","中和區","永和區","新莊區","新店區","樹林區","淡水區","汐止區","蘆洲區","鶯歌區","三峽區","瑞芳區","土城區","五股區","泰山區","林口區"],

  "桃園市":["桃園區","中壢區","平鎮區","八德區","楊梅區","蘆竹區","龜山區","龍潭區","大溪區","大園區","觀音區","新屋區","復興區"],

  "台中市":["中區","東區","西區","南區","北區","西屯區","南屯區","北屯區","豐原區","大里區","太平區"],

  "台南市":["中西區","東區","南區","北區","安平區","永康區","仁德區","歸仁區","新化區","新營區"],

  "高雄市":["楠梓區","左營區","鼓山區","三民區","苓雅區","前鎮區","小港區","鳳山區","岡山區","旗山區"],

  "基隆市":["仁愛區","信義區","中正區","中山區","安樂區","暖暖區","七堵區"],

  "新竹市":["東區","北區","香山區"],

  "新竹縣":["竹北市","竹東鎮","新埔鎮","關西鎮"],

  "苗栗縣":["苗栗市","頭份市","竹南鎮","後龍鎮"],

  "彰化縣":["彰化市","員林市","鹿港鎮","和美鎮"],

  "南投縣":["南投市","埔里鎮","草屯鎮"],

  "雲林縣":["斗六市","虎尾鎮","西螺鎮"],

  "嘉義市":["東區","西區"],

  "嘉義縣":["太保市","民雄鄉","朴子市"],

  "屏東縣":["屏東市","潮州鎮","東港鎮","恆春鎮"],

  "宜蘭縣":["宜蘭市","羅東鎮","蘇澳鎮"],

  "花蓮縣":["花蓮市","吉安鄉","玉里鎮"],

  "台東縣":["台東市","成功鎮","池上鄉"],

  "澎湖縣":["馬公市"],

  "金門縣":["金城鎮"],

  "連江縣":["南竿鄉"]
};


// ======================
// 💙 去過紀錄
// ======================
let visited = JSON.parse(localStorage.getItem("visited")) || {};


// ======================
// 📍 顯示地圖
// ======================
function showMap(){

  let c = document.getElementById("content");

  let html = `<h2>📍 台灣地圖（點選縣市）</h2>`;

  for(let city in taiwan){
    html += `
      <div class="card">
        <h3 onclick="showTown('${city}')">${city}</h3>
      </div>
    `;
  }

  c.innerHTML = html;
}


// ======================
// 📍 鄉鎮（點選變藍）
// ======================
function showTown(city){

  let c = document.getElementById("content");

  let html = `<h2>${city}</h2>`;

  taiwan[city].forEach(town=>{

    let key = city + "-" + town;

    let active = visited[key] ? "style='background:#b3e5ff'" : "";

    html += `
      <div class="card" ${active}
      onclick="toggleVisit('${city}','${town}')">
        📍 ${town}
      </div>
    `;
  });

  c.innerHTML = html;
}


// ======================
// 💙 切換去過
// ======================
function toggleVisit(city,town){

  let key = city + "-" + town;

  if(visited[key]){
    delete visited[key];
  } else {
    visited[key] = true;
  }

  localStorage.setItem("visited", JSON.stringify(visited));

  showTown(city);
}


// ======================
// 🎬 片單
// ======================
function showMovie(){

  let c = document.getElementById("content");

  c.innerHTML = `
    <h2>🎬 片單</h2>
    <input id="m1" placeholder="電影">
    <select id="m2">
      <option>已看</option>
      <option>未看</option>
    </select>
    <button onclick="addMovie()">新增</button>
    <div id="list"></div>
  `;

  renderMovie();
}

function addMovie(){

  movies.push({
    name: document.getElementById("m1").value,
    status: document.getElementById("m2").value
  });

  renderMovie();
}

function renderMovie(){

  let box = document.getElementById("list");
  box.innerHTML = "";

  movies.forEach(m=>{
    box.innerHTML += `
      <div class="card">
        🎬 ${m.name} ｜ ${m.status}
      </div>
    `;
  });
}


// ======================
// 📋 任務
// ======================
function showTask(){

  let c = document.getElementById("content");

  c.innerHTML = `
    <h2>📋 任務</h2>
    <input id="t1" placeholder="任務">
    <input id="t2" type="date">
    <button onclick="addTask()">新增</button>
    <div id="list"></div>
  `;

  renderTask();
}

function addTask(){

  tasks.push({
    name: document.getElementById("t1").value,
    date: document.getElementById("t2").value,
    done:false
  });

  renderTask();
}

function renderTask(){

  let box = document.getElementById("list");
  box.innerHTML = "";

  tasks.forEach((t,i)=>{
    box.innerHTML += `
      <div class="card ${t.done ? "done" : ""}"
      onclick="toggleTask(${i})">
        📋 ${t.name}<br>
        ⏰ ${t.date || ""}
      </div>
    `;
  });
}

function toggleTask(i){
  tasks[i].done = !tasks[i].done;
  renderTask();
}


// ======================
// 💰 記帳（完整日曆版）
// ======================
function showMoney(){

  let c = document.getElementById("content");

  c.innerHTML = `
    <h2>💰 記帳系統</h2>

    <input id="mo1" placeholder="項目">
    <input id="mo2" type="number" placeholder="金額">

    <select id="year"></select>
    <select id="month"></select>

    <button onclick="addMoney()">新增</button>

    <div id="list"></div>
  `;

  generateCalendar();
  renderMoney();
}


// 年月生成
function generateCalendar(){

  let year = document.getElementById("year");
  let month = document.getElementById("month");

  let now = new Date().getFullYear();

  for(let y=now-2;y<=now+10;y++){
    year.innerHTML += `<option>${y}</option>`;
  }

  for(let m=1;m<=12;m++){
    month.innerHTML += `<option>${m < 10 ? "0"+m : m}</option>`;
  }
}


// ======================
// ➕ 記帳
// ======================
function addMoney(){

  money.push({
    name: document.getElementById("mo1").value,
    value: Number(document.getElementById("mo2").value),
    year: document.getElementById("year").value,
    month: document.getElementById("month").value
  });

  renderMoney();
}


// ======================
// 📊 記帳渲染（年→月）
// ======================
function renderMoney(){

  let box = document.getElementById("list");
  if(!box) return;

  box.innerHTML = "";

  let years = [...new Set(money.map(m => m.year))].sort();

  let totalAll = 0;

  years.forEach(year => {

    let yearData = money.filter(m => m.year === year);
    let months = [...new Set(yearData.map(m => m.month))].sort();

    let yearTotal = 0;

    let html = "";

    months.forEach(month => {

      let items = yearData.filter(m => m.month === month);
      let monthTotal = items.reduce((a,b)=>a+b.value,0);

      yearTotal += monthTotal;

      html += `
        <div style="margin-left:10px;padding:10px;border-left:3px solid #ccc;">
          📅 ${year}/${month}
          <br>💰 月總：${monthTotal}
          ${items.map(i=>`<div>${i.name} - ${i.value}</div>`).join("")}
        </div>
      `;
    });

    totalAll += yearTotal;

    box.innerHTML += `
      <div class="card">
        <h3>📆 ${year}</h3>
        💰 年總：${yearTotal}
        ${html}
      </div>
    `;
  });

  box.innerHTML += `
    <div class="card">
      <h2>💎 總支出：${totalAll}</h2>
    </div>
  `;
}