/**
 * Created by maxwell on 17/2/6.
 */

(function () {
  //定义定时器变量
  var timer = null;
  //当前点中的同学
  var currentStudentIndex = 0;
  //班里所有的学员数组
  var students = [];
  //按钮
  var btn = $("button:first");
  //数据的地址
  var dataUrl = "data/students.json";
  //班级名称
  var className = "web06";
  //开始点名的文字
  var startText = "开始点名";
  //结束点名的文字
  var stopText = "结束点名";

  //获取学员数据
  function getStudents() {
    students = [];
    console.log(className);
    $.getJSON(dataUrl, function (data) {
      students = data[className];
    });
  }

  //初始化学员
  getStudents();

  //绑定空格按钮事件
  $(document).keypress(function (e) {
    //触发的目标不是按钮，并且按钮是空格或者是回车则开始点名或结束点名
    if (e.target.type != "submit" && (e.keyCode == 32 || e.keyCode == 13)) {
      timer ? stop() : start();
    }
  });

  //绑定按钮点击事件
  btn.click(function () {
    timer ? stop() : start();
  });

  //开始点名
  function start() {
    btn.html(stopText);
    show();
  }

  //结束点名
  function stop() {
    btn.html(startText);
    clearTimeout(timer);
    timer = null;
    //将点到名的同学先移除当前数组
    students.splice(currentStudentIndex, 1);
  }

  //显示点名的学生名称
  function show() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    //当可点名的学员数组为空则去重新获取一次数据
    if (students.length == 0) {
      getStudents();
    }
    //生成一个随机的下标
    var index = Math.floor(Math.random()*100000) % students.length;
    //将下标保存到currentStudentIndex变量中
    currentStudentIndex = index;
    //不断显示学员的名称
    $("#student").html(students[index]);
    //如果当前的学员只有一名时直接结束，并终止调用自身
    if (students.length == 1) {
      stop();
      return;
    }
    //10毫秒后调用自身
    timer = setTimeout(show, 10);
  }

})();