import React, { useState } from "react";
import {
   Heading,
   Main,
   TextInput,
   Button,
   Box,
   Form,
   FormField,
} from "grommet";
import { useNavigate, useParams } from "react-router-dom";
import toNumber from "lodash/toNumber";
import { editDeviceItem } from "api/device";
import { useLocation } from "react-router-dom";
import { LinkButton } from "../Component/LinkButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deviceStore } from "store/DeviceStore";

type ParamTypes = Partial<Record<"idProject", string>>;

export const ProjectForm = () => {
   
   const navigate = useNavigate();
   const location = useLocation();
   const initialFormValue = location.state;
   const [value, setValue] = useState (initialFormValue);

   const { idProject } = useParams<ParamTypes>();
   const numberId = toNumber(idProject);

   /*    const handleEditProject = (formValue: TFormAddProject) => {
      editProjectItem({
         id_project: numberId,
         name: formValue.name,
         remark: formValue.remark,
      }).then((response) => {
         if (response.id_project) {
            projectStore.getProjects();
            toast.success("Проект успешно изменен");
            navigate(`/projects/${response.id_project}`);
         } else {
            toast.error("Произошла ошибка при редактировании проекта");
         }
      });
   }; */

   return (
      <Main pad = "large">
         <Heading>
            { numberId
               ? `Редактировать проект "${initialFormValue.name}"`
               : "Создать новый проект" }
         </Heading>
         <Box
            fill
            align = "start"
            justify = "start">
            <Box width = "large">
               <Form
                  value = { value }
                  validate = "submit"
                  onChange = { (nextValue) => setValue(nextValue) }
                  //onSubmit = { ({ value }) => numberId ? handleEditProject(value) : handleAddProject(value) }
               >
                  <FormField
                     name = "name"
                     htmlFor = "text-input-name"
                     label = "Название"
                     required
                  >
                     <TextInput
                        id = "text-input-name"
                        name = "name" 
                     />
                  </FormField>

                  <FormField
                     name = "remark"
                     htmlFor = "text-input-remark"
                     label = "Описание"
                     required
                  >
                     <TextInput
                        id = "text-input-remark"
                        name = "remark" />
                  </FormField>
                  <Box
                     direction = "row"
                     gap = "medium"
                     className = "product-form-aria-button"
                  >
                     <Button
                        type = "submit"
                        primary
                        label = { numberId ? "Сохранить" : "Создать проект" }
                     />
                     <LinkButton
                        to = { numberId ? `/projects/${numberId}` : "/projects/" }
                     >
                        <Button
                           type = "button"
                           label = "Отмена"
                           color = "brand" />
                     </LinkButton>
                  </Box>
               </Form>
            </Box>
         </Box>
      </Main>
   );
};
