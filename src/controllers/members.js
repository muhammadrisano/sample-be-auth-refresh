const members = [
    { 
     name: 'risano',
     accountMemmber: '123123123',
     email: 'risano@gmail.com'
 },{ 
     name: 'budi',
     accountMemmber: '123123123',
     email: 'budi@gmail.com'
 },{ 
     name: 'anto',
     accountMemmber: '123123123',
     email: 'anto@gmail.com'
 }
 ]
const getMembers =(req, res, next)=>{
  
        res.json({
            message: 'success',
            data: members
        })
  
    
}
module.exports ={
    getMembers
}