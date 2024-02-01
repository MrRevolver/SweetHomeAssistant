import { makeAutoObservable } from "mobx";
import { getProjectList     } from "api/project";
import { TProjectItem       } from "models/Project";
import { errorHandler       } from "utils/errorHandler";

class ProjectsStore {

   loading = false
   projects: TProjectItem[] = []

   constructor () { makeAutoObservable (this) }

   async getProjects () {

      try {
         this.setLoading (true)
         const result = await getProjectList ()
         this.setProjects (result)
      }
      catch (err) {
         errorHandler (err)
      }
   }

   setProjects (projectsArr: TProjectItem[]) {
      this.projects = projectsArr
      this.setLoading (false)
   }

   setLoading = (isLoading: boolean) => {
      this.loading = isLoading
   };
}

export const projectStore = new ProjectsStore()
