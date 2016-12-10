/**
 * Created by yavuzyikilmaz on 07/12/2016.
 */
$(document).ready(function () {

    getUserInfoForCreate();
    getUserInfoForUpdate();
    getAllUsersAjax();
    deleteUser();

});

/* User List */
function fillUserModalContent(data) {

    $('#userFullName').val(data.name);

    $('#userIdUp').val(data.id);

    $('#userMail').val(data.username);

    $('#deleteUserId').val(data.id);

};
function createDatatableForUserList(userList) {

    var table = $('#userListDataTable').DataTable({

        "processing": false,
        "serverSide": false,
        "data": userList,
        "columns": [
            {"data": "id"},
            {"data": "name"},
            {"data": "username"},

            {
                "data": null,
                "bSortable": false,
                "mRender": function () {

                    return '<button type="button" id="editUserButton"  data-toggle="modal" data-target="#editUserModal" class="btn btn-md btn-warning" style="display: block; width: 100%;"> <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit </button>';
                }
            },
            {
                "data": null,
                "bSortable": false,
                "mRender": function () {

                    return '<button type="button" id="silUserButton"   data-toggle="modal" data-target="#removeUserModal" class="btn btn-md btn-danger" style="display: block; width: 100%;"> <i class="fa fa-user-times" aria-hidden="true"></i> Delete </button>';
                }
            }
        ]
    });

    $('#userListDataTable tbody').on('click', 'tr', function () {
        fillUserModalContent(table.row(this).data());
        var data = table.row(this).data();
    });

}

function getAllUsersAjax() {
    $.ajax({
        type: "GET",
        url: "/getAllUserList",
        success: function (result) {
            if (!result) {
            } else {
                console.log("GET ALL USER");
                console.log(result);
                createDatatableForUserList(result);
            }
        }
    });
}

/* Delete User Methods */

function deleteUserAjax(deleteUserId) {
    $.ajax({
        type: "GET",
        url: "/deleteTheUser",
        data: "userId=" + deleteUserId ,
        success: function (result) {
            if (!result) {
                $('#deleteNotification').html('<div class="alert alert-danger alert-dismissable"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> There is an error.You will try to add user another time.</div>');
            } else {
                $('#deleteNotification').html('<div class="alert alert-success alert-dismissable"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> The User delete from system.</div>');
               $('#removeUserModal').modal('hide');
                location.reload();
            }
        }
    });
}

function deleteUser() {
    $('#deleteOkey').on("click", function () {
        var deleteUserId = $('#deleteUserId').val();
            deleteUserAjax(deleteUserId);
    });


}

/* Update User Methods */
function updateUserAjax(userName, Mail,userId) {
    $.ajax({
        type: "GET",
        url: "/updateTheUser",
        data: "userId=" + userId+"&userName=" + userName + "&userMail=" + Mail,
        success: function (result) {
            if (!result) {
                $('#updateNotification').html('<div class="alert alert-danger alert-dismissable"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> There is an error.You will try to add user another time.</div>');
            } else {
                $('#updateNotification').html('<div class="alert alert-success alert-dismissable"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> The User update from system.</div>');
                location.reload();
            }
        }
    });
}

function getUserInfoForUpdate() {
    $('#btnUpdateUser').on("click", function () {
        var userName = $('#userFullName').val();
        var Mail = $('#userMail').val();
        var userId = $('#userIdUp').val();

        if (userName != "" && Mail != "") {
            updateUserAjax(userName, Mail,userId);
        } else {
            $('#addNotification').html('<div class="alert alert-warning alert-dismissable"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> You must fill all area to add user.</div>');
        }
    });


}

/* Create User Methods */
function createUserAjax(userName, Mail) {
    $.ajax({
        type: "GET",
        url: "/createNewUser",
        data: "userName=" + userName + "&userMail=" + Mail,
        success: function (result) {
            if (!result) {
                $('#addNotification').html('<div class="alert alert-danger alert-dismissable"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> There is an error.You will try to add user another time.</div>');
            } else {
                $('#txtUserName').val('');
                $('#txtMail').val('');
                $('#addNotification').html('<div class="alert alert-success alert-dismissable"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> The User added the system.</div>');
                location.reload();
            }
        }
    });
}

function getUserInfoForCreate() {
    $('#btnAddUser').on("click", function () {
        var userName = $('#txtUserName').val();
        var Mail = $('#txtMail').val();
        if (userName != "" && Mail != "") {
            createUserAjax(userName, Mail);
        } else {
            $('#addNotification').html('<div class="alert alert-warning alert-dismissable"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> You must fill all area to add user.</div>');
        }
    });


}

