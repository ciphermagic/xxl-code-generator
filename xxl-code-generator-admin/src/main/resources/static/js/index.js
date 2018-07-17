$(function () {

    /**
    * 下载代码
    */
    $(".download-code").click(function() {
        var tableSql = tableSqlIDE.getValue();
        var key = $(this).parent().attr("href").substring(1);
        var url = base_url + "/download";
        var form = $("<form></form>").attr("action", url).attr("method", "post");
        form.append($("<input></input>").attr("type", "hidden").attr("name", "tableSql").attr("value", tableSql));
        form.append($("<input></input>").attr("type", "hidden").attr("name", "key").attr("value", key));
        form.appendTo('body').submit().remove();
    });

    /**
     * 初始化 table sql
     */
    var tableSqlIDE;
    function initTableSql() {
        tableSqlIDE = CodeMirror.fromTextArea(document.getElementById("tableSql"), {
            lineNumbers: true,
            matchBrackets: true,
            mode: "text/x-sql",
            lineWrapping:false,
            readOnly:false,
            foldGutter: true,
            gutters:["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        });
        tableSqlIDE.setSize('auto','auto');
    }
    initTableSql();

    /**
     * 初始化 code area
     */

    var controller_ide;
    var service_ide;
    var service_impl_ide;
    var dao_ide;
    var mybatis_ide;
    var model_ide;
    function initCodeArea(){

        // controller_ide
        controller_ide = CodeMirror.fromTextArea(document.getElementById("controller_ide"), {
            lineNumbers: true,
            matchBrackets: true,
            mode: "text/x-java",
            lineWrapping:true,
            readOnly:true,
            foldGutter: true,
            gutters:["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        });
        controller_ide.setSize('auto','auto');

        // service_ide
        service_ide = CodeMirror.fromTextArea(document.getElementById("service_ide"), {
            lineNumbers: true,
            matchBrackets: true,
            mode: "text/x-java",
            lineWrapping:true,
            readOnly:true,
            foldGutter: true,
            gutters:["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        });
        service_ide.setSize('auto','auto');

        // service_impl_ide
        service_impl_ide = CodeMirror.fromTextArea(document.getElementById("service_impl_ide"), {
            lineNumbers: true,
            matchBrackets: true,
            mode: "text/x-java",
            lineWrapping:true,
            readOnly:true,
            foldGutter: true,
            gutters:["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        });
        service_impl_ide.setSize('auto','auto');

        // dao_ide
        dao_ide = CodeMirror.fromTextArea(document.getElementById("dao_ide"), {
            lineNumbers: true,
            matchBrackets: true,
            mode: "text/x-java",
            lineWrapping:true,
            readOnly:true,
            foldGutter: true,
            gutters:["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        });
        dao_ide.setSize('auto','auto');

        // mybatis_ide
        mybatis_ide = CodeMirror.fromTextArea(document.getElementById("mybatis_ide"), {
            lineNumbers: true,
            matchBrackets: true,
            mode: "text/html",
            lineWrapping:true,
            readOnly:true
        });
        mybatis_ide.setSize('auto','auto');

        // model_ide
        model_ide = CodeMirror.fromTextArea(document.getElementById("model_ide"), {
            lineNumbers: true,
            matchBrackets: true,
            mode: "text/x-java",
            lineWrapping:true,
            readOnly:true,
            foldGutter: true,
            gutters:["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
        });
        model_ide.setSize('auto','auto');
    }

    initCodeArea();

    function showCode($div, ide, data) {
        var hasClass = $div.hasClass("active");
        if (!hasClass) {
            $div.addClass("active");
        }
        ide.setValue(data);
        ide.setSize('auto','auto');
        if (!hasClass) {
            $div.removeClass("active");
        }
    }

    /**
     * 生成代码
     */
    $('#codeGenerate').click(function () {

        var tableSql = tableSqlIDE.getValue();

        $.ajax({
            type : 'POST',
            url : base_url + "/codeGenerate",
            data : {
                "tableSql" : tableSql
            },
            dataType : "json",
            success : function(data){
                if (data.code == 200) {
                    layer.open({
                        icon: '1',
                        content: "代码生成成功" ,
                        end: function(layero, index){
                            showCode($("#model"), model_ide, data.data.model_code);
                            showCode($("#controller"), controller_ide, data.data.controller_code);
                            showCode($("#service"), service_ide, data.data.service_code);
                            showCode($("#service_impl"), service_impl_ide, data.data.service_impl_code);
                            showCode($("#dao"), dao_ide, data.data.dao_code);
                            showCode($("#mybatis"), mybatis_ide, data.data.mybatis_code);
                        }
                    });
                } else {
                    layer.open({
                        icon: '2',
                        content: (data.msg||'代码生成失败')
                    });
                }
            }
        });

    });

});