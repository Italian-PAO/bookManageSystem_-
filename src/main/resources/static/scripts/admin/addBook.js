$(document).ready(function () {

    //查找所有图书种类，并给select选择框赋值
    findAllBookCategory();


    $("#btn1").click(function () {
        var flag = validateAddBookForm().form();
        if(flag){
            addBook();//异步添加书籍
        } else {
            alert("请检查输入是否合法");
        }
    });
});

jQuery.validator.addMethod("checkInput", function(value, element) {
    var pattern = new RegExp("^[\u0391-\uFFE5a-zA-Z·.。;&\\\\s]{0,*}+$");
    var reg = /^([0-9]+)$/;
    if(pattern.test(value)) {
        return false;
    } else if(value.indexOf(" ") != -1){
        return false;
    } else {
        return true;
    }
}, "禁止特殊字符及空格");

jQuery.validator.addMethod("checkPublish", function(value, element) {
    var pattern = new RegExp(".*(出版社)$");
    var reg = /^([0-9]+)$/;
    if(pattern.test(value)) {
        return true;
    } else {
        return false;
    }
}, "请以'出版社'结尾");

function validateAddBookForm() {
    return $("#addBookForm").validate({
        rules:{
            bookName:{
                required:true
            },
            bookAuthor:{
                required:true,
                checkInput:true
            },
            bookPublish:{
                required:true,
                checkInput:true,
                checkPublish:true
            },
            bookCategory:{
                required:true
            },
            bookNumber:{
                required:true,
                min:0,
                max:9999
            },
            bookIntroduction:{
                required:false,
                maxlength:100
            }
        },
        messages:{
            bookName:{
                required:"这是必填字段"
            },
            bookAuthor:{
                required:"这是必填字段",
                checkInput: "人名不合法"
            },
            bookPublish:{
                required:"这是必填字段",
                checkInput: "出版社名不合法",
                checkPublish:"请以'出版社'结尾"
            },
            bookCategory:{
                required:"这是必填字段"
            },
            bookNumber:{
                required:"这是必填字段",
                min:"不可小于0",
                max:"不可大于9999"
            },
            bookIntroduction:{
                maxlength:"不可超过100字"
            }
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
            $("select[name='bookCategory']").empty();
            $("select[name='bookCategory']").append('<option value="">——请选择——</option>');
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

function addBook() {
    $.ajax({
        async : false,
        type : 'post',
        url : '/addBook',
        data : $('#addBookForm').serialize(),
        success : function(data) {
            alert("添加成功!");
        },
        error : function(data) {
            alert("添加失败!");
        }
    });
};











