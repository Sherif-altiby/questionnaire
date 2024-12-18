import { Link } from 'react-router-dom'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createQuestionaires, deleteQuestionaires, getQuestionaires } from '../utils/api';
import { questionnaireTypes } from '../utils/types';
import { useState } from 'react';

 

const Admin = () => {

  let currentURL = `${window.location.origin}`;

  const queryClient = useQueryClient();  

  const [ quesName, setQuesName ] = useState('')
  const [ showUrl, setShowUrl ] = useState(false)

  const [quesLink, setQuesLink] = useState("")
  
 
  const { data , isLoading } = useQuery({
    queryKey: ['questionnaires'],  
    queryFn: getQuestionaires,  
  }); 



  const mutation = useMutation({
    mutationFn: (title: string) => createQuestionaires(title),  
    onSuccess: (data) => {
         setQuesLink( currentURL +"/questionnaire/" + data._id)
         setShowUrl(true)
         queryClient.invalidateQueries({ queryKey: ["questionnaires"] });
    },
    onError: (error) => {
        console.error("Error creating questionaire:", error.message);
    },
});


  const mutationDelete = useMutation({
    mutationFn: (id: string) => deleteQuestionaires(id),  
    onSuccess: (data) => {
        // console.log("Response Data:", data._id);  
        queryClient.invalidateQueries({ queryKey: ["questionnaires"] });
    },
    onError: (error) => {
        console.error("Error creating questionaire:", error.message);
    },
});


const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if(quesName.trim().length > 0) {
     mutation.mutate(quesName);  
     setQuesName("")
  } else {
    console.log("Error")
  }
};

const handleDelete = (id: string) => {

  mutationDelete.mutate(id);  
};

  return (
    <div className="users-page main-container" >
            
           
    <div className="users"> 

            <div className="card">
                   <h2>  اضف استبيان  </h2>

                   <form className='give-rate-frm' onSubmit={(e) => handleSubmit(e)} >
                            <input value={quesName} onChange={(e) => setQuesName(e.target.value)} type="text" placeholder='العنوان' />
                             
 
                            <button type='submit' > اضف </button>
                   </form>
            </div>

           {showUrl && (
             <div className="card went-to-n">
                <p> { quesLink } </p>
             </div>
           )}

    </div>
  
    

   <div className="card all-quetionaire">
        <h2> الاستبيانات </h2>

        { !isLoading && (
          data.map((item: questionnaireTypes) => (
              <div key={item._id} className='ctm-link-container' >
                   <Link to={`/get-questionnaire-detailes/${item._id}`} > {item.title} </Link>
                   <p onClick={() => handleDelete(item._id)} > مسح </p>
              </div>
          ))
        ) }

    </div>

</div>
  )
}

export default Admin