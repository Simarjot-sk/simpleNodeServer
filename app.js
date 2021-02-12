let http = require('http');
let fs = require('fs');
let urlspace = require('url');

let getPath = (url) =>
    urlspace.parse(url, false).path

let requestMap = []

function mapRequest(path, fileName){
    requestMap.push({
        'path': path,
        'fileName': fileName
    })
}

function performRequest(req, res){
    let path = getPath(req.url)
    let index = requestMap.findIndex((item) => item.path === path)
    if(index != -1){
        let fileName = requestMap[index].fileName
        res.writeHead(200, {'Content-Type': 'text/html'})
        fs.readFile(fileName, (err, data)=>{
            if(err){
                res.write(err);
                return res.end();
            }
            res.write(data);
            return res.end();
        })
    }else{
        res.end('404 not found bitch');
    }
}

mapRequest('/about',        './pages/about.html');
mapRequest('/',             './pages/index.html')
mapRequest('/contact-me',   './pages/contact-me.html')
mapRequest('/foo',          './pages/bar.html')

let server = http.createServer(performRequest);

server.listen(8080, ()=>console.log('server started running at 8080'));
