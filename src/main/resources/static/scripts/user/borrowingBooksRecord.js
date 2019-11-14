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

    //点击还书按钮
    $(".returnBookBtn").click(function () {
        // 获取弹窗
        var modal = document.getElementById('myModal');

        // 获取图片插入到弹窗 - 使用 "alt" 属性作为文本部分的内容
        var img = document.getElementById('myImg');
        var modalImg = document.getElementById("img01");
        var captionText = document.getElementById("caption");

        // 获取 <span> 元素，设置关闭按钮
        var span = document.getElementsByClassName("close")[0];

        // 当点击 (x), 关闭弹窗
        span.onclick = function() {
            modal.style.display = "none";
        };

        if(confirm("确认还书?")){
            var b = $(this);
            var tr = b.parents("tr");
            var tds = tr.children();
            var state = tds.eq(4).text();
            var reg = RegExp(/逾期/);
            if (state.toString().match(reg)){
                alert("还书失败,逾期未归请交罚款");
                modal.style.display = "block";
                modalImg.src = img.src;
                captionText.innerHTML = img.alt;
            }else {
                var BorrowingId=$(this).val();
                returnBook(BorrowingId);
                location.reload();
            }
        }

    });

});

function returnBook(BorrowingId) {
    $.ajax({
        async : false,
        type : "post",
        url : "/userReturnBook",
        dataType : "json",
        data:{BorrowingId:BorrowingId},
        success: function (data) {
            console.log(data.toString());
            if(data.toString()=="true"){
                alert("还书成功!");
            }else{
                alert("还书失败!");
            }
        },
        error:function (data) {
            alert(data.result);
        }
    });
};