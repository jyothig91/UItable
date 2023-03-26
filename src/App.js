import React from 'react';
import{ Input,Table,Modal } from 'antd';
import { useState ,useEffect} from 'react';
import{EditOutlined,DeleteOutlined} from '@ant-design/icons';

function App() {
  const [dataSource,setDataSource] = useState([])
  const [searchUser, setSearchUser] = useState("")
  const[editData,setEditData]=useState(null);
  const [editing,setEditing] = useState(false); 
  
   useEffect(() => {
             fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
             .then(response=>response.json())
             .then(data=>{
              setDataSource(data)
           }).catch(err=>{
              console.log(err)
          })
      }, [])
  
   const columns=[
    {  
      title:'Id',
      dataIndex:'id'
    },
    { 
      title:'Name',
      dataIndex:'name'
    },
    {  
      title:'Email',
      dataIndex:'email'
    },
    { 
      title:'Role',
      dataIndex:'role',
      filteredValue:[searchUser],
       onFilter:(value,record)=>{
        return String(record.name).toLowerCase().includes(value.toLowerCase())||
        String(record.role).toLowerCase().includes(value.toLowerCase())
      }
     
    },
    {
      title:'Actions',
      render:(record)=>{
        return(
        <>
        <EditOutlined onClick={()=>{
          onEdit(record)
        }} />
        <DeleteOutlined onClick={()=>{
          onDelete(record)
        }}style={{color:'blue',marginLeft:10}}/>
        </>
        );
      },
      },
  ]

  
  
  const onDelete=(record)=>{
      setDataSource(pre=>{
      return pre.filter(student=>student.id !== record.id)
      })
      }
  
      const onEdit = (record) => { 
        setEditing(true); 
        setEditData({...record});
       }; 

      const resetEditing=()=>{
       setEditing(false);
       setEditData(null);
      }
 return (
    <div div className='App'>
       <Input.Search placeholder='Search by Name or Role ' style={{marginTop:10}} onSearch={(value)=>{
      setSearchUser(value)
        }}
          onChange={(e)=>{
          setSearchUser(e.target.value)
    }}/>
     <Table columns={columns} dataSource={dataSource}
      pagination={{
     pageSize:10}}
    
      rowSelection={true}
    >
       
      </Table>
      <Modal 
       title="Edit Details" 
       visible={editing}
       onCancel={() => {
        resetEditing()
       } }
       onOk={() => {
        
        setDataSource(pre=>{
          return pre.map(student=>{
            if(student.id===editData.id){
              return editData
            }else{
              return student
            }
          })
        })
      resetEditing();
       }} 
      
       >
        <Input 
value={editData?.name} 
onChange={(e) => { 
 setEditData((pre) => { 
return { ...pre, name: e.target.value }; 
 }); 
}} 
/> 

<Input 
value={editData?.email} 
onChange={(e) => { 
 setEditData((pre) => { 
return { ...pre, email: e.target.value }; 
 }); 
}}
/>
<Input 
value={editData?.role} 
onChange={(e) => { 
 setEditData((pre) => { 
return { ...pre, role: e.target.value }; 
 }); 
}}
/>
</Modal>; 
  
</div>
    
  );
}

export default App

