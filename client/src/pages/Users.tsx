import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import img from '../assets/react.svg' 
import { useParams } from "react-router-dom";
import { fetchLatestImage, getTopRatesQuestionaires, updateQuestionaires } from '../utils/api';
import { useEffect, useState } from 'react';
import { ImageInterface, Rate, questionnaireTypes } from '../utils/types';

const Users = () => {
 
       const { id } = useParams();

       const queryClient = useQueryClient();  

       const [name, setName] = useState("");
       const [rate, setRate] = useState("");

       const [sortedRatings, setSortedRatings] = useState<Rate[]>([]);

       const { data } = useQuery<questionnaireTypes, Error>({
              queryKey: ["topRated", id],
              queryFn: async ({ queryKey }) => {
                     const id = queryKey[1];  
                     const response = await getTopRatesQuestionaires(id as string);
                     return response;  
              },
       });

       const { data: imageData } = useQuery({
              queryKey: ["image"],
              queryFn:  fetchLatestImage,
       });


       useEffect(() => {
              if (data) {
                     const sorted = [...data.rating].sort((a, b) => Number(b.rate) - Number(a.rate));
                     setSortedRatings(sorted);
              }
       }, [data]);


       const mutation = useMutation({
              mutationFn: ({ id, name, rate, image }: { id: string; name: string; rate: string; image: string }) => 
                  updateQuestionaires(id, name, rate, image),
              onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ["topRated"] });  
              },
              onError: (error) => {
                  console.error("Error updating questionnaire:", error.message);
              },
       });
          

       const handleUpdate = (e: React.FormEvent) => {

              e.preventDefault()

                if(name.trim().length > 0 && typeof Number(rate) == "number" && Number(rate) <= 10 ){

                       const data = {
                            id: id || "",
                            name,
                            rate,
                            image: "image_url_here",
                        }
                      
                     mutation.mutate(data)
                }
       }

        
  return (
   <div className="users-page main-container" >
           
             <div className="users"> 

                     <div className="card">
                            <h2> الاعلي تقييم </h2>
              
                            <div className="top-rated">
                                   
                                   { 
                                      sortedRatings.map((rate: Rate, index) => (
                                          index <= 4 && (
                                                 <div key={rate._id} className="rated-person">
                                                 <span> {index + 1}- </span>
                                                 <p> {rate.name} </p>
                                                 <span> ( {rate.rate}  / 10 ) </span>
                                         </div>
                                          )
                                      ))
                                    }

                            </div>
                     </div>

                     <div className="card give-rate">
                            <h2>  قم بتقييم نفسك (من 10)</h2>

                            <form className='give-rate-frm' onSubmit={(e) => handleUpdate(e)} >
                                     <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='الاسم' />
                            
                                     <input value={rate} onChange={(e) => setRate((e.target.value))} type="number"   placeholder='التقييم' />

                                     <button type='submit' > حفظ </button>
                            </form>
                     </div>
             </div>
 
            <div className="card owner">

                 {data ? ( <img src={`http://localhost:5000${imageData.image.imageUrl}`} alt="" /> ) : ( <img src={img} alt="" />  )}
  
                  <h2> 🛠️ ازاي تستعد؟ </h2>

                  <p> ⚪ نوم كافي: عشان تفضل مركز طول اليوم. </p>
                  <p> ⚪ أكل صحي: متخففش أكلك لتقلل الإحساس بالخمول. </p>
                  <p> ⚪ مياه وأسناكس: خلي دايمًا جنبك مياه وأسناكس خفيفة عشان متقومش كتير، والمياه هتفوقك وتنشط دماغك. </p>
                  <p> ⚪ البعد عن المشتتات: الموبايل مفتوح فقط للبث أو المذاكرة، مفيش سوشيال ميديا! </p>
                  <p> ⚪ تحضير جدول: خطط لكل سيشن هتذاكر فيها إيه. </p>
                  <p> ⚪ ورقة أفكار: سجل الأفكار الجانبية اللي ممكن تشتتك وكمل مذاكرتك. </p>

                   <h2> 📊 إيه المميزات اللي هيقدمها التحدي ده؟ </h2>

                   <p> 🥇 أفضل أداء يومي: اسمك هيظهر في لوحة الشرف! </p>
                   <p> 📅 تقرير أسبوعي: هنشوف فيه مين أفضل طالب ويتكرم  </p>
                   <p> 🎁 مكافآت وشارات مميزة: زي تحديات النجوم أو ألقاب للتحفيز! </p>
                   <p> 🤝 مجتمع تشجيعي: طلاب زيك يشاركوا نفس الهدف والطموح، فهتلاقي دعم وحماس. </p>

                   <h2> 🎯 نصايح مهمة هتفرق معاك: </h2>

                   <p> 🔴 ذاكر على وضوء. </p>
                   <p> 🔴 خلي في ورد قرآن خلال الريست. </p>
                   <p> 🔴 متأخرش الصلاة مهما كنت بتعمل. </p>
                   <p> 🔴 حضّر "To-Do List" من بليل عشان يومك يكون منظم. </p>
              </div>

   </div>
  )
}

export default Users