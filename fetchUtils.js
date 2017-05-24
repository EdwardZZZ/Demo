export default {
    get(url, params, dataType){
        return fetchFn(url + ( ~url.indexOf('?') ? '' : '?' ) + formatParams(params), {method: 'get'}, dataType);
    },
    post(url, params, dataType){
        return fetchFn(url, {method: 'post', body: toFormData(params)}, dataType); 
    },
    fetch(url, init, dataType){
        return fetchFn(url, init, dataType); 
    }
};

function fetchFn(input, init, dataType){
    return new Promise((resolve, reject) => {
        fetch(input, init).then(response => {
            switch(dataType){
                case 'json':
                    return response.json();
                case 'html':
                    return response.text();
                case 'blob':
                    return response.blob();
                case 'text':
                    return response.text();
                case 'arrayBuffer':
                    return response.arrayBuffer();
                case 'formData':
                    return response.formData();
                default:
                    return response.json();
            }
        }).then(data => {
            return resolve(data);
        }).catch(e => {
            return reject(e);
        });
    });
}

function formatParams(params){
    let _params = '';
    for(let key in params){
        _params += (_params === '' ? '' : '&') + key + '=' + JSON.stringify(params[key]);
    }
    return _params;
}

function toFormData(params){
    const formData = new FormData();
    for(let key in params){
        formData.append(key, JSON.stringify(params[key]));
    }
    return formData;
}
