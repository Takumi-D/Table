export default class ServicePosts{
    getPosts = async () => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");

            if(!response.ok){
                throw new Error("Что-то пошло не так! " + response.status);
            }

            return await response.json();
        } catch (error){
            throw new Error("Что-то пошло не так! " + error);
        }
    }
}