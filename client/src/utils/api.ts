const SERVER_URL = "http://localhost:5000";

export const getQuestionaires = async () => {
 
    const res = await fetch(`${SERVER_URL}/questionaire`);

    if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      return res.json();
}

export const createQuestionaires = async (title: string) => {
    const res = await fetch(`${SERVER_URL}/questionaire`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",  
        },
        body: JSON.stringify({ title }),  
    });

    if (!res.ok) {
        throw new Error('Network response was not ok');
    }

    return res.json();  
};


export const deleteQuestionaires = async (id: string) => {
    const res = await fetch(`${SERVER_URL}/questionaire/${id}`, {
        method: "DELETE", 
    });

    if (!res.ok) {
        throw new Error('Network response was not ok');
    }

    return res.json();  
};


export const updateQuestionaires = async (id: string, name: string, rate: string , image: string) => {
    const res = await fetch(`${SERVER_URL}/questionaire/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",  
        },
        body: JSON.stringify({ name, rate, image }),  
    });

    if (!res.ok) {
        throw new Error('Network response was not ok');
    }

    return res.json();  
};

export const getTopRatesQuestionaires = async (id: string) => {
    const res = await fetch(`${SERVER_URL}/questionaire/${id}`);

    if (!res.ok) {
        throw new Error('Network response was not ok');
    }

    return res.json();  
};
