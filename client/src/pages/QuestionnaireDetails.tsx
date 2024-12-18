import { useQuery } from '@tanstack/react-query';
import { useParams } from "react-router-dom";
import { getTopRatesQuestionaires } from '../utils/api';
import { Rate, questionnaireTypes } from '../utils/types';

const QuestionnaireDetails = () => {

    const { id } = useParams();
 
     

    const { data } = useQuery<questionnaireTypes, Error>({
           queryKey: ["topRated", id],
           queryFn: async ({ queryKey }) => {
                  const id = queryKey[1];  
                  const response = await getTopRatesQuestionaires(id as string);
                  return response;  
           },
    });

    

  return (
    <div className="main-container" >
         <div className="card">
                <h1> { data?.title } </h1>

            {  data?.rating.map((rate: Rate, index) => (  
                            <div key={rate._id} className="rated-person">
                                    <span> {index + 1}- </span>
                                    <p> {rate.name} </p>
                                    <span> ( {rate.rate}  / 10 ) </span>
                            </div>
                    )
            )}
         </div>
    </div>
  )
}

export default QuestionnaireDetails