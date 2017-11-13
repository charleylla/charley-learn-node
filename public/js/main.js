$("#btn").click(()=>{
    $.ajax({
        url:"/api/user",
        type:"post",
        data:{
            username:$("#username").val(),
        },
        success(data){
            if(data.code === 1){
                alert(`新增用户：${$("#username").val()}成功！`)
            }
        },
        error(){
            alert("请求失败！")
        }
    })

    return false;
})