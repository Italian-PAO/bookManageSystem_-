$(document).ready(function () {
    var bookId = $("#bookId"),
        bookNameUpdate = $( "#bookName" ),
        bookAuthorUpdate = $( "#bookAuthor" ),
        bookPublishUpdate = $( "#bookPublish" ),
        bookIntroductionUpdate = $("#bookIntroduction"),
        bookCategoryUpdate = $("#bookCategory"),
        bookNumberUpdate = $("#bookNumber"),
        rowIndex ,
        allFields = $( [] ).add( bookNameUpdate ).add( bookAuthorUpdate ).add( bookPublishUpdate ).add(bookIntroductionUpdate).add(bookCategoryUpdate).add(bookNumberUpdate),
        tips = $( ".validateTips" );

    //给选择框赋值
    findAllBookCategory();

    function updateTips( t ) {
        tips
            .text( t )
            .addClass( "ui-state-highlight" );
        setTimeout(function() {
            tips.removeClass( "ui-state-highlight", 1500 );
        }, 500 );
    }

    function checkExist( o, n) {
        if ( o.val() == -1 ) {
            o.addClass( "ui-state-error" );
            updateTips( n );
            return false;
        } else {
            return true;
        }
    }

    function checkNum( o, n) {
        if ( o.val()<0 || o.val()>9999 || o.val()%1 != 0) {
            o.addClass( "ui-state-error" );
            updateTips( n );
            return false;
        } else {
            return true;
        }
    }

    function checkLength( o, n, min, max ) {
        if ( o.val().length > max || o.val().length < min ) {
            o.addClass( "ui-state-error" );
            updateTips( "" + n + " 的长度必须在 " +
                min + " 和 " + max + " 之间。" );
            return false;
        } else {
            return true;
        }
    }

    function checkRegexp( o, regexp, n ) {
        if ( !( regexp.test( o.val() ) ) ) {
            o.addClass( "ui-state-error" );
            updateTips( n );
            return false;
        } else {
            return true;
        }
    }

    //检查能否再点击上一页，下一页

    setTimeout(function(){
        alert(selectType);
    } , 1000);
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

    //点击删除按钮后删除一行
    $(".button1").click(function () {
        if(confirm("确认删除?")){

            var bookId=$(this).val();
            deleteBookById(bookId);
            $(this).parent().parent().remove();
            location.reload();
        }

    });

    $( "#dialog-form" ).dialog({
        autoOpen: false,
        height: 600,
        width: 350,
        modal: true,
        buttons: {
            "录入": function() {
                var bValid = true;
                allFields.removeClass( "ui-state-error" );

                bValid = bValid && checkLength( bookNameUpdate, "书名", 1, 20 );
                bValid = bValid && checkLength( bookAuthorUpdate, "作者", 1, 20 );
                bValid = bValid && checkLength( bookPublishUpdate, "出版社", 4, 20 );
                bValid = bValid && checkLength( bookIntroductionUpdate, "简介", 0, 100 );
                bValid = bValid && checkLength( bookNumberUpdate, "数量", 1, 4 );
                bValid = bValid && checkExist( bookCategoryUpdate,"类别不可为空");
                bValid = bValid && checkNum(bookNumberUpdate,"请输入0~9999之间的正整数作为数量");


                bValid = bValid && checkRegexp( bookPublishUpdate, /.*(出版社)$/, "出版社需以'出版社'结尾" );
                bValid = bValid && checkRegexp( bookAuthorUpdate,  /^[\u4E00-\u9FA5\uf900-\ufa2da-zA-Z·s]{1,20}$/, "请规范作者名");

                if ( bValid) {
                    addBook();//ajax更新用户信息
                    $( this ).dialog( "close" );
                } else {
                }
            },
            "修改": function() {
                var bValid = true;
                allFields.removeClass( "ui-state-error" );

                bValid = bValid && checkLength( bookNameUpdate, "书名", 1, 20 );
                bValid = bValid && checkLength( bookAuthorUpdate, "作者", 1, 20 );
                bValid = bValid && checkLength( bookPublishUpdate, "出版社", 4, 20 );
                bValid = bValid && checkLength( bookIntroductionUpdate, "简介", 0, 100 );
                bValid = bValid && checkExist( bookCategoryUpdate,"类别不可为空");
                bValid = bValid && checkNum(bookNumberUpdate,"请输入0~9999之间的正整数作为数量");

                bValid = bValid && checkRegexp( bookPublishUpdate, /.*(出版社)$/, "出版社需以'出版社'结尾" );
                bValid = bValid && checkRegexp( bookAuthorUpdate,  /^[\u4E00-\u9FA5\uf900-\ufa2da-zA-Z·s]{1,20}$/, "请规范作者名");

                if ( bValid) {
                    updateBook();//ajax更新用户信息
                    $( this ).dialog( "close" );
                } else {
                }
            },
            "取消": function() {
                $( this ).dialog( "close" );
            }
        },
        close: function() {
            allFields.val( "" ).removeClass( "ui-state-error" );
        }
    });

    $("#addBookBtn").click(function () {
        findAllBookCategoryUpdate();
        $( "#dialog-form" ).dialog( "open" );
    });

    $( ".button2" )
        .click(function() {
            findAllBookCategoryUpdate();
            var b = $(this);
            var tr = b.parents("tr");
            var tds = tr.children();
            //设置初始值
            bookId.val(tds.eq(0).text());
            bookNameUpdate.val(tds.eq(1).text());
            bookAuthorUpdate.val(tds.eq(2).text());
            bookPublishUpdate.val(tds.eq(3).text());
            bookIntroductionUpdate.val(tds.eq(4).text());
            bookNumberUpdate.val(tds.eq(5).text());

            rowIndex=b.parent().parent().rowIndex;
            $( "#dialog-form" ).dialog( "open" );
        });

});

function addBook() {
    $.ajax({
        async : false,
        type : 'post',
        url : '/addBook',
        data : $('#updateBookForm').serialize(),
        success : function(data) {
            alert("添加成功!");
        },
        error : function(data) {
            alert("添加失败!");
        }
    });
};

function updateBook() {
    $.ajax({

        async : false,
        type : 'post',
        url : '/updateBook',
        data : $('#updateBookForm').serialize(),
        success : function(data) {
            alert("修改成功");
            location.reload();
        },
        error : function(data) {
            alert("修改失败");
        }
    })  ;
};

//ajax删除书
function deleteBookById(bookId) {
    $.ajax({
        async : false,
        type : "post",
        url : "/deleteBook",
        dataType : "json",
        data: {bookId:bookId},
        success: function (data) {
            console.log(data.toString());
            if(data.toString()=="true"){
                alert("删除成功!");
            }else{
                alert("删除失败!");
            }
        },
        error:function (data) {
            alert("删除失败!");
        }
    });
}

function findAllBookCategory() {
    $.ajax({
        async : false,
        type : "post",
        url : "/findAllBookCategory",
        dataType : "json",
        success: function (data) {
            console.log(data);
            $("select[name='bookCategoryS']").empty();
            $("select[name='bookCategoryS']").append('<option value="-1">——请选择——</option>');
            for(var i=0;i<data.length;i++){
                var html ='<option value="'+data[i].categoryId+'">';
                html +=data[i].categoryName + '</option>';
                $("select[name='bookCategoryS']").append(html);
            }
        },
        error:function (data) {
            alert(data.result);
        }
    });
};

function findAllBookCategoryUpdate() {
    $.ajax({
        async : false,
        type : "post",
        url : "/findAllBookCategory",
        dataType : "json",
        success: function (data) {
            console.log(data);
            $("select[name='bookCategory']").empty();
            $("select[name='bookCategory']").append('<option value="-1">——请选择——</option>');
            for(var i=0;i<data.length;i++){
                var html ='<option value="'+data[i].categoryId+'">';
                html +=data[i].categoryName + '</option>';
                $("select[name='bookCategory']").append(html);
            }
        },
        error:function (data) {
            alert(data.result);
        }
    });
};