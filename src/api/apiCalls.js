import api from './api'

function getLive(parameters){
    return api.get('/live',{
        params: parameters
    })
}

function changeLive(param, parameters){
    return api.post('/live', param, {
        params: parameters
    })
}

function getCoin(){
    return api.get('/coin')
}

function patchCoin(param){
    return api.patch('/coin/1', param )
}

function putGraphic(param){
    return api.put('/graphic', param )
}

function logIn(parameters){
    return api.get('/user', {
        params: parameters
    } )
}

function getGraphicsData(parameters){
    return api.get('/graphic', {
        params: parameters
    })
}

function postGraphicsData(parameters){
    return api.post('/graphic', parameters)
}

function deleteImage(id){
    return api.delete('/image/' + id)
}

export const apiCalls = {
    getLive,
    patchCoin,
    getCoin,
    logIn,
    changeLive,
    getGraphicsData,
    putGraphic,
    postGraphicsData,
    deleteImage
}