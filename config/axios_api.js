/*
 *您也可以创建一个实例，然后在实例中配置相关属性，此方法和上面的方法一样，写法不同，怎么用随个人
 *喜好，我比较喜欢用这种方法，如下：
 */
const BASE_URL = "http://192.168.1.60:8089";

let api = axios.create ({
    timeout: 60000, // 请求超时时间1分钟
    responseType: 'json',
    method: 'post', //请求方式
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Access-Control-Allow-Headers': '*'
    },
    // // 携带凭证
    withCredentials: true
});

/* 3.设置拦截器 */
/*如果不是用创建实例的方式配置，那么下面的Axios都要换成axios,也就是文件开头您用import引入axios
 时定义的变量*/
api.interceptors.request.use (
    config => {
        let token = sessionStorage.getItem ('token');
        if (token != null) {
            config.headers.Authorization = 'Bearer ' + token;
        }
        config._retry = 0;
        return config;
    },
    error => {
        return error;
    }
);
const originalResponse = async (originalRequest) => {
    //先把原来的请求执行了
    let resp = await axios (originalRequest).then (resData => {
        return resData.data;
    });
    //把旧token送回后台处理
    $post (httpurlCore + 'index/change/user/info', {oldToken: sessionStorage.getItem ('oldToken')});
    return resp;
}
api.interceptors.response.use (
    res => {
        //请求响应后拦截
        if (res.status === 200) {
            if (isNotEmpty (res.data.code)) {
                return res.data;
            } else if (isNotEmpty (res.data.result)) {
                return res.data;
            } else {
                return res;
            }
        }
    },
    err => {
        const originalRequest = err.config;
        const currentRefreshToken = getRefreshToken ();
        // 接口返回401并且已经重试过，自动刷新token
        if (err.response.status === 401 && !originalRequest._retry && originalRequest._retry === 0 && isNotEmpty (currentRefreshToken)) {
            console.log ('刷新登陆')
            return refreshToken ().then (response => {
                // 保存新的token
                sessionStorage.setItem ("token", response.data.access_token);
                sessionStorage.setItem ("refresh_token", response.data.refresh_token);
                setStore ("refresh_token", response.data.refresh_token);
                // 带上新的token
                originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access_token;
                originalRequest._retry = 1;
                return originalResponse (originalRequest);
            }).catch (() => {
                // 刷新失败，执行退出
                sessionStorage.clear ();
                top.vm.showMessage ("权限!", "登录过期了，请重新登录", "error");
                setTimeout (function () {
                    window.location.href = "../../login.html";
                }, 2000);
            })
        }
        
        originalRequest._retry = 0;
        if (err) {
            switch (err.response.status) {
                case 400:
                    top.vm.showMessage ("权限!", "请求错误", "warning");
                    break;
                case 401:
                case 402:
                    top.vm.showMessage ("权限!", "未授权，请登录", "error");
                    setTimeout (function () {
                        window.location.href = "../../login.html";
                    }, 2000);
                    break;
                case 403:
                    top.vm.showMessage ("权限!", "拒绝访问", "error");
                    break;
                case 404:
                    top.vm.showMessage ("错误!", "请求地址出错:" + err.response.config.url, "error");
                    break;
                case 408:
                    top.vm.showMessage ("错误!", "请求超时", "warning");
                    break;
                case 500:
                    top.vm.showMessage ("错误!", "服务器内部错误", "warning");
                    break;
                case 501:
                    top.vm.showMessage ("错误!", "服务未实现", "warning");
                    break;
                case 502:
                    top.vm.showMessage ("错误!", "网关错误", "warning");
                    break;
                case 503:
                    top.vm.showMessage ("错误!", "服务不可用", "warning");
                    break;
                case 504:
                    top.vm.showMessage ("错误!", "网关超时", "warning");
                    break;
                case 505:
                    top.vm.showMessage ("错误!", "HTTP版本不受支持", "warning");
                    break;
                default:
                    top.vm.showMessage ("错误!", '操作失败, 系统开小差了', "warning");
            }
            return Promise.reject (err); // 返回接口返回的错误信息
        } else {
            top.vm.showMessage ("错误!", "服务器出现错误，请重新登录", "error");
            setTimeout (function () {
                window.location.href = "../../login.html";
            }, 2000);
        }
        
    }
);
/**
 * 对外提供接口
 */
const $postfile = function (url, formData) {
    return api ({
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        url: url,
        method: 'post', //请求方式
        data: formData
    });
};
const $post = function (url, data) {
    return api ({
        url: url,
        method: 'post', //请求方式
        params: data
    });
};
const $get = function (url, data) {
    return api ({
        url: url,
        method: 'get', //请求方式
        params: data
    });
};
const $delete = function (url, data) {
    return api ({
        url: url,
        method: 'delete', //请求方式
        params: data
    });
};
/**
 * 对外提供接口,json
 */
const $json = function (url, data) {
    return api ({
        headers: {
            'Content-Type': 'application/json'
        },
        url: url,
        method: 'post', //请求方式
        data: data
    });
};
const $api = function (method, url, data) {
    return api ({
        headers: {
            'Content-Type': 'application/json'
        },
        url: url,
        method: method, //请求方式
        data: data
    });
};


/**
 * 同步post获取数据方法
 * @param url
 * @param data
 * @param overTime
 * @returns {Promise<unknown>}
 */
const $postAsync = function (url, data, overTime) {
    if (overTime == null) {
        overTime = 3000;
    }
    return new Promise ((resolve, reject) => {
        api ({
            url: url,
            method: 'post', //请求方式
            params: data,
            timeout: overTime,
        }).then (res => {
            resolve (res.data);
        })
    })
};

const $export = function (url, data) {
    return api ({
        url: url,
        method: 'get', //请求方式,
        responseType: 'arraybuffer',
        params: data
    });
};

const exportFile = function (response) {
    const blob = new Blob ([response.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
    const link = document.createElement ('a')
    link.href = window.URL.createObjectURL (blob)
    // 获取文件名
    const disposition = response.headers['content-disposition'];
    if (disposition !== undefined) {
        let fileName = disposition.substring (disposition.indexOf ('=') + 1, disposition.length);
        fileName = fileName.replace(new RegExp("'","gm"),"");
        fileName =fileName.replace(new RegExp("\"","gm"),"")
        link.download = decodeURI (fileName);
        link.click ()
    }
};

const exportFileByName = function (url,filename) {
    if (confirmEnding(filename,'.txt') || confirmEnding(filename,'.jpg')
        || confirmEnding(filename,'.jpeg')  || confirmEnding(filename,'.png')
        || confirmEnding(filename,'.gif') || confirmEnding(filename,'.ico')){
        var a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', filename); //分割路径，取出最后一个元素
        a.setAttribute('target', '_blank');
        a.setAttribute('id', 'DownloadFile');// 防止反复添加
        if(document.getElementById('DownloadFile')) {
            document.body.removeChild(document.getElementById('DownloadFile'));
        }
        document.body.appendChild(a);
        a.click();
    }else{
        window.location.href=url;
    }
};

const confirmEnding = function (str, target){
    // 请把你的代码写在这里
    var start = str.length-target.length;
    var arr = str.substr(start,target.length);
    if(arr == target){
        return true;
    }
    return false;
}

confirmEnding("He has to give me a new name", "name");

const basicAuthorization = 'Basic ' + btoa ('pridesoft:123456');

const login = function (url, username, password) {
    sessionStorage.removeItem ('token');
    password = btoa(password);
    const grantType = 'password';
    return api ({
        url: url,
        headers: {
            'Authorization': basicAuthorization
        },
        method: 'post',
        params: {username: username, password: password, grant_type: grantType, scope: 'all'}
    })
};
const getRefreshToken = function () {
    return getStore ('refresh_token');
}
const refreshToken = function () {
    let oldToken = sessionStorage.getItem ('token');
    sessionStorage.setItem ('oldToken', oldToken);
    sessionStorage.removeItem ('token')
    let token = getRefreshToken ();
    let grantType = 'refresh_token';
    let url = httpurlCore + '/oauth/token';
    return api ({
        url: url,
        headers: {
            'Authorization': basicAuthorization
        },
        method: 'post',
        params: {
            grant_type: grantType,
            refresh_token: token
        }
    })
}

function format (datetime) {
    return formatWithSeperator (datetime, '/', ':');
}

function getUrlKey (name) {
    return decodeURIComponent ((new RegExp ('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec (location.href) || [, ''])[1].replace (/\+/g, '%20')) || null;
}

function formatWithSeperator (datetime, dateSeprator, timeSeprator) {
    if (datetime != null) {
        const dateMat = new Date (datetime);
        const year = dateMat.getFullYear ();
        const month = dateMat.getMonth () + 1;
        const day = dateMat.getDate ();
        const hh = dateMat.getHours ();
        const mm = dateMat.getMinutes ();
        const ss = dateMat.getSeconds ();
        return year + dateSeprator + month + dateSeprator + day + ' ' + hh + timeSeprator + mm + timeSeprator + ss;
    }
}


//鍔ㄦ€佸姞杞?src
function dynamicLoadJs (jsSrc) {
    return new Promise(function(resolve, reject) {
        var oHead = document.getElementsByTagName('HEAD').item(0);
        var oScript = document.createElement('script');
        oScript.async = true;
        oScript.src = jsSrc;

        oScript.onload = function() {
            resolve();
        }
        oHead.appendChild( oScript);
    })

}
