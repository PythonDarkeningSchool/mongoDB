var express=require('express');
var app=express();
app.set('view engine','jade');
app.get('/nene',function(req,res)
{
	res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Holaaaa World!');
});
var server=app.listen(3000,function()
{
});