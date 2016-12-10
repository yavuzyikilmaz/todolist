/**
 * Created by yavuzyikilmaz on 07/12/2016.
 */
$(document).ready(function () {

    getTaskInfoForCreate();
    fillAllUsersToSelect();

    getUserInfoForUpdate();
    getAllTasksAjax();

    deleteTask();


});

function fillAllUsersToSelect() {
    $.ajax({
        type: "GET",
        url: "/getAllUsers",
        success: function (result) {
            if (!result) {
            } else {
                $.each(result, function (val, i) {
                    $('#slctTaskUserId').append('<option value="' + i.id + '">' + i.name + '</option>');
                    $('#slctTaskUpdateUserId').append('<option value="' + i.id + '">' + i.name + '</option>');
                });
            }
        }
    });
}


/* Tasks List */
function fillTaskModalContent(data) {

    $('#taskName').val(data.taskName);

    $('#taskContent').val(data.taskContent);

    $('#TaskIdUp').val(data.taskId);

    if (data.taskStatus == "1") {
        $('#taskStatus').attr('checked', 'checked');
    } else {
        $('#taskStatus').removeAttr('checked');
    }

    $('#deleteTaskId').val(data.taskId);

};
function createDatatableForTaskList(taskList) {

    var table = $('#TaskListDataTable').DataTable({

        "processing": false,
        "serverSide": false,
        "data": taskList,
        "columns": [
            {"data": "taskId"},
            {"data": "taskName"},
            {"data": "taskStatus"},
            {"data": "taskDate"},


            {
                "data": null,
                "bSortable": false,
                "mRender": function () {

                    return '<button type="button" id="editTaskButton"  data-toggle="modal" data-target="#editTaskModal" class="btn btn-md btn-warning" style="display: block; width: 100%;"> <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit </button>';
                }
            },
            {
                "data": null,
                "bSortable": false,
                "mRender": function () {

                    return '<button type="button" id="silTaskButton"   data-toggle="modal" data-target="#removeTaskModal" class="btn btn-md btn-danger" style="display: block; width: 100%;"> <i class="fa fa-user-times" aria-hidden="true"></i> Delete </button>';
                }
            }
        ]
    });

    $('#TaskListDataTable tbody').on('click', 'tr', function () {
        fillTaskModalContent(table.row(this).data());
        var data = table.row(this).data();
    });

}

function getAllTasksAjax() {
    $.ajax({
        type: "GET",
        url: "/getAllTaskList",
        success: function (result) {
            if (!result) {
            } else {
                // console.log("GET ALL Task");
                // console.log(result);
                createDatatableForTaskList(result);
            }
        }
    });
}

/* Delete User Methods */

function deleteTaskAjax(deleteTaskId) {
    $.ajax({
        type: "GET",
        url: "/deleteTheTask",
        data: "taskId=" + deleteTaskId,
        success: function (result) {
            if (!result) {
                $('#deleteNotification').html('<div class="alert alert-danger alert-dismissable"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> There is an error.You will try to add user another time.</div>');
            } else {
                $('#deleteNotification').html('<div class="alert alert-success alert-dismissable"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> The Task delete from system.</div>');
                $('#removeTaskModal').modal('hide');
                location.reload();
            }
        }
    });
}

function deleteTask() {
    $('#deleteOkey').on("click", function () {
        var deleteTaskId = $('#deleteTaskId').val();
        deleteTaskAjax(deleteTaskId);
    });


}

/* Update Task Methods */
function updateTaskAjax(taskName, taskContent, userId, taskId, taskStatus) {
    var url = "taskId=" + taskId + "&userId=" + userId + "&taskName=" + taskName + "&taskContent=" + taskContent + "&taskStatus=" + taskStatus;
    console.log(url);
    $.ajax({
        type: "GET",
        url: "/updateTheTask",
        data: url,
        success: function (result) {
            if (!result) {
                $('#updateNotification').html('<div class="alert alert-danger alert-dismissable"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> There is an error.You will try to add user another time.</div>');
            } else {
                $('#updateNotification').html('<div class="alert alert-success alert-dismissable"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> The Task update from system.</div>');
                location.reload();
            }
        }
    });
}

function getUserInfoForUpdate() {
    $('#btnUpdateTask').on("click", function () {
        var taskName = $('#taskName').val();
        var taskContent = $('#taskContent').val();
        var userId = $('#slctTaskUpdateUserId').val();
        var taskId = $('#TaskIdUp').val();
        var taskStatus = 0;
        if ($("#taskStatus").is(':checked')) {
            taskStatus = 1;
        }
        if (taskName != "" && taskContent != "") {
            updateTaskAjax(taskName, taskContent, userId, taskId, taskStatus);
        }
    });


}

/* Create Task Methods */
function createTaskAjax(taskName, taskContent, userId) {
    $.ajax({
        type: "GET",
        url: "/createNewTask",
        data: "taskName=" + taskName + "&taskContent=" + taskContent + "&userId=" + userId + "&taskDate=" + '1' + "&taskStatus=" + '0',
        success: function (result) {
            if (!result) {
                $('#addTaskNotification').html('<div class="alert alert-danger alert-dismissable"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> There is an error.You will try to add user another time.</div>');
            } else {
                $('#txtTaskName').val('');
                $('#txtTaskContent').val('');
                $('#addTaskNotification').html('<div class="alert alert-success alert-dismissable"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> The Task added the system.</div>');
                location.reload();
            }
        }
    });
}


function getTaskInfoForCreate() {
    $('#btnAddTask').on("click", function () {
        var taskName = $('#txtTaskName').val();
        var taskContent = $('#txtTaskContent').val();
        var taskUserId = $('#slctTaskUserId').val();

        if (taskName != "" && taskContent != "") {
            createTaskAjax(taskName, taskContent, taskUserId);
        } else {
            $('#addTaskNotification').html('<div class="alert alert-warning alert-dismissable"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> You must fill all area to add task.</div>');
        }
    });


}


