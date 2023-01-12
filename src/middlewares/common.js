const myMiddleware = (req, res, next)=>{
    console.log('log', req.body);
    next()
}

module.exports ={
    myMiddleware
}