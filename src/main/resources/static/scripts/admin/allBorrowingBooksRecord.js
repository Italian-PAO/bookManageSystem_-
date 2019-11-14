$(document).ready(function () {
    //检查能否再点击上一页，下一页
    var lab1=$("#lab1").html().trim();//获取当前页码
    var lab2=$("#lab2").html().trim();//获取总页码
    // alert(lab1+" *****"+lab2);

    $("#prePage").click(function () {
        if(lab1==1){
            alert("已经是第一页了!");
            return false;
        }
        return true;
    });
    $("#nextPage").click(function () {
        if(lab1==lab2){
            alert("已经是最后一页了!");
            return false;
        }
        return true;
    });

    $(".btn_deleteRecord").click(function () {
        if(confirm("确认删除?")){
            var Id=$(this).val();
            deleteBookById(Id);
            $(this).parent().parent().remove();
            location.reload();
        }
    });

});

function deleteBookById(Id) {
    $.ajax({
        async : false,
        type : "post",
        url : "/deleteBorrowingBook",
        dataType : "json",
        data:{Id:Id},
        success: function (data) {
            console.log(data.toString());
            if(data.toString()=="true"){
                alert("删除成功!");
            }else{
                alert("删除失败!");
            }
        },
        error:function (data) {
            alert("失败!");
        }
    });
};