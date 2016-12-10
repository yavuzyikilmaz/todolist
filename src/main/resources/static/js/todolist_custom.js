/**
 * Created by yavuzyikilmaz on 07/12/2016.
 */
$( document ).ready(function() {
   //Login Forgot Pass
    $('.forgotText').fadeOut();
    $('#forgotPassword').click(function() {
        if ($(this).is(':checked')) {
            $('.forgotText').text('This area will upgrade.');
            $('.forgotText').fadeIn();
        }else{
            $('.forgotText').fadeOut();
        }
    });

    $('#btnLogin').on("click",function() {
        var lgnUser = $('#lgnUserName').val();
        var lgnPass = $('#lgnPass').val();
        userLoginControl(lgnUser,lgnPass);
    });

    getAllTasks(1);
    getAllUsers();

});

function userLoginControl(lgnUser,lgnPass) {
    $.ajax({
        type: "GET",
        url: "login/userControl",
        data: "lgnUser=" + lgnUser+"&lgnPass="+lgnPass,
        success: function (result) {

          if(result=="hata"){
              $('#lgnInfo').text('Hatalı giriş.');
          }else{
              window.location.replace("/dashboard?id="+result);
          }

        }
    });
}

function fillTaskArea(result){
    var montNames=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var monthYears=[];
    var yearmonthday="";
    var monthyearName="";
    var day="";
    var statusCssClass="";
    /* Fill Task Area */
    $('#myTasks').html(' ');
    var count=1;
    var  timeline="";
    $.each(result, function (val, i) {
        var day=i.taskDate.split(' ');
        yearmonthday=day[0].split('-');
        monthyearName=montNames[yearmonthday[1]-1]+" "+yearmonthday[0];
        day=yearmonthday[2];

        if (monthYears.indexOf(monthyearName) == -1) {
            monthYears.push(monthyearName);
            $('#myTasks').append('<li><div class="row" style="text-align: center"><h4 class="taskTitle">'+monthyearName+'</h4> <br /> <hr /></div></li>');
        }
        if(count%2==0){
            timeline='class="timeline-inverted"';
        }else{
            timeline="";
        }
        if(i.taskStatus==1){
            statusCssClass="success";
        }else{
            statusCssClass="danger";
        }
        $('#myTasks').append('<li '+timeline+'> <div class="timeline-badge '+statusCssClass+'">'+day+'</div><div class="timeline-panel"> <div class="timeline-heading"> <h4 class="timeline-title">'+i.taskName+'</h4> </div> <div class="timeline-body"> <p>'+i.taskDate+' <br />'+i.taskContent+'</p> </div> </div> </li>');
    count++;
    });
    // console.log(result);
    // console.log("Date : ");
    // console.log(monthYears);


}

function getAllTasks(userId) {
    $.ajax({
        type: "GET",
        url: "dashboard/getAllTasks",
        data: "userId=" + userId,
        success: function (result) {
            if (!result) {

            } else {
                fillTaskArea(result);

            }
        }
    });
}


/* User Fill */

function fillUsersArea(result){
var locas="left";
    var renk="";
    var sayac=1;
    $.each(result, function (val, i) {
        if(sayac%2==0){
            renk="FA6F57";
            locas="right";
        }else {
            renk="55C1E7";
            locas="left";
        }
       $('#allUsersList').append('<li class="'+locas+' clearfix"> <span class="chat-img pull-'+locas+'"> <img src="http://placehold.it/50/'+renk+'/fff" alt="User Avatar" class="img-circle" /> </span> <div class="chat-body clearfix"> <div class="header"> <strong class="primary-font">'+i.name+'</strong> <small class="pull-right text-muted"> <i class="fa fa-clock-o fa-fw"></i> 12 mins ago </small> </div> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. </p> </div> </li>');
        sayac++;
    });
    // console.log(result);
    // console.log("Date : ");
    // console.log(monthYears);


}


function getAllUsers() {
    $.ajax({
        type: "GET",
        url: "dashboard/getAllUserList",
        success: function (result) {
            if (!result) {

            } else {
                fillUsersArea(result);

            }
        }
    });
}

