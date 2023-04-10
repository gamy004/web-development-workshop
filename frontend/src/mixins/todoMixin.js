import TodoList from '@/models/TodoList';

export const todoMixin = {
   methods: {
      $_todoMixin_getMyTodolist(userId) {
         return TodoList.query().where('userId', userId).get(); // vuex
      },

     async $_todoMixin_getUserTask(){
      let promise = await TodoList.api().getUserTask();
      
      return promise;
   },
   
   async $_todoMixin_createUserTask({ title, description = null } = {}){
      console.log("create payload", { title, description });

      await TodoList.api().createUserTask({ title, description });

     },

     /**
      * method to update user's todo
      * 
      * @param {string} id id of todo
      * @param {title} title
      * @param {description} description
      * @returns 
      */
     async $_todoMixin_editedUserTask({ id, title, description = null } = {}){
      console.log("update payload", { id, title, description })
       let tasks = await TodoList.api().updateUserTask({ id, title, description })
       return tasks
     },
   
     async $_todoMixin_deleteUserTask(id){
      return await TodoList.api().deleteUserTask(id)
     }

   },
};
  