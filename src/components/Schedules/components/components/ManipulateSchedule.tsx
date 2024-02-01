import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { observer } from 'mobx-react';
import { deviceSettingsStore } from 'store/DeviceSettingsStore';
import { controlPanelStore } from 'store/ControlPanelStore';

import { timingOption, weekDaysOption } from '../data/data';
import { TTask } from 'models/Setting';

import { toast } from 'react-toastify';
import { Box, Button, Form, FormField, RangeInput, Select } from 'grommet';
import { StyledDateTimeInput } from 'components/Library/components/StyledInput';

import { createSchedule } from '../hooks/useSchedule';
import { generateUID } from 'utils/generateUID';

export const ManipulateSchedule = observer ((props: { idDevice: number, idTask: number, setModal: Dispatch<SetStateAction<boolean>> }) => {

   const {
      idDevice,
      idTask,
      setModal,
   } = props

   const [task       , setTask       ] = useState <TTask>()
   const [deviceLabel, setDeviceLabel] = useState ('')

   const saveSettingsFromModal = () => {

      if (createSchedule (idDevice, task)) {
         
         toast.success  (deviceSettingsStore.devicesSetting
         .find (deviceSetting => deviceSetting.settings.Schedule
         .some (task => task.Id === idTask))?.error_text ?? 'Расписание обновлено')
         setModal (false)
      }
   }

   useEffect (() => {
      if (idTask) setTask ({ ... deviceSettingsStore.schedules.find (task => task.Id === idTask) })
      else        setTask ({ ...task,
         Id      : Number (generateUID (deviceSettingsStore.schedules)),
         Action  : 0,
         Interval: 0,
         IsEnable: true,
         DStart: new Date().toLocaleString('sv-SE', {
            year  : 'numeric',
            month : '2-digit',
            day   : '2-digit',
            hour  : '2-digit',
            minute: '2-digit'
         }).replace(" ", "T") });
   }, [])

   useEffect (() => {
      setDeviceLabel (controlPanelStore.controlBlocks
      .find (block => block.controls
      .find (control => control.options
      .find (option => option.command === task?.Command)))?.label)
   }, [task])

   //console.log (task);

   return (
      <Form
         onSubmit = { saveSettingsFromModal }
      >
         <FormField 
            label = "Старт"
            name  = 'DStart'
         >
            <StyledDateTimeInput 
               type     = 'datetime-local'
               name     = 'DStart'
               value    = { task?.DStart }
               onChange = { e => setTask ({ ...task, DStart: e.target.value }) }
               required
            />
         </FormField>

         <FormField 
            label = "Повторять"
         >
            <Select
               options      = { timingOption }
               labelKey     = { 'label' }
               defaultValue = { timingOption[0] }
               onChange     = { ({ option }) => setTask ({ ...task, Interval: option?.value }) }
               value        = { timingOption.find (timing => timing.value === task?.Interval) }
               required
            />
         </FormField>

         { task?.Interval == 1 &&
            <FormField 
               label = "Время запуска"
            >
               <StyledDateTimeInput 
                  type     = 'time'
                  name     = 'EveryDay'
                  onChange = { e => setTask ({ ...task, EveryDay: e.target.value }) }
                  value    = { task?.EveryDay }
                  required
               />
            </FormField> 
         }
         { task?.Interval == 2 &&
         <>
            <FormField 
               label = "Выберите дни недели"
            >
               <Select
                  multiple
                  name          = 'WeekDays'
                  closeOnChange = { false }
                  options       = { weekDaysOption }
                  labelKey      = { 'label' }
                  messages      = { { multiple: 'Выбрано несколько' } }
                  placeholder   = 'Выбрать'
                  onChange      = { ({ value }) => setTask ({ ...task, WeekDays: value.flatMap (value => value.value).sort ((a, b) => a - b) }) }
                  value         = { weekDaysOption.filter (weekDays => task?.WeekDays?.includes (weekDays.value)) }
                  required
               />
            </FormField>
            <FormField 
               label = "Время запуска"
            >
               <StyledDateTimeInput 
                  type     = 'time'
                  name     = 'EveryWeek'
                  onChange = { e => setTask ({ ...task, EveryWeek: e.target.value }) }
                  value    = { task?.EveryWeek }
                  required
               />
            </FormField>
         </>
         }

         { /* <FormField 
            label = "Действие"
         >
            <Select
               options  = { actionOption }
               labelKey = { 'label' }
               value    = { action.label }
               onChange = { ({ option }) => setAction (option) }
               required
            />
         </FormField> */ }

         { task?.Action == 0 &&
            <>
               <FormField
                  label   = "Выберите опцию"
               >
                  <Select
                     options     = { controlPanelStore.controlBlocks }
                     labelKey    = { 'label' }
                     placeholder = 'Опция'
                     onChange    = { ({ option }) => setDeviceLabel (option.label) }
                     value       = { deviceLabel }
                     required
                  />
               </FormField>

               { deviceLabel &&
               <FormField
                  label   = "Команда"
               >
                  <Select
                     options     = { controlPanelStore.controlBlocks
                     .find (data => data.label == deviceLabel)?.controls
                     .flatMap (option => option.options) }
                     labelKey    = { 'label' }
                     placeholder = 'Выберите команду'
                     onChange    = { ({ option }) => setTask ({ ...task, Command: option?.command }) }
                     value       = {  controlPanelStore.getControlBlockOption (task?.Command)?.label }
                     required
                  />
               </FormField>
               }

               { (deviceLabel && 

                  controlPanelStore.controlBlocks
                  .find    (data => data.label === deviceLabel)?.controls
                  .flatMap (control => control.options)
                  .some    (option =>  option.command === task?.Command) &&

                  controlPanelStore.controlBlocks 
                  .flatMap (data   => data?.controls)
                  .find    (control => control.options
                  .find    (option => option.command === task.Command))?.type == 'RangeInput') &&

               <>
                  <Box
                     margin = { { horizontal:'6px', vertical: '12px' } }
                  >
                     Мощность: { task?.Value }%
                  </Box>
                  <RangeInput
                     max      = { 100 }
                     value    = { task?.Value }
                     onChange = { event => setTask ({ ...task, Value: Number (event.target.value) }) }
                  />
               </>
               }
            </>
         }
         
         { /* { action.value == 1 &&
            <FormField
               htmlFor = "FunctionName"
               label   = "Введите имя функции"
            >
               <TextInput
                  id   = "FunctionName"
                  name = "FunctionName"
                  required
               />
            </FormField>
         }
         { action.value == 2 &&
            <FormField
               htmlFor = "EventName"
               label   = "Введите имя события"
            >
               <TextInput
                  id   = "EventName"
                  name = "EventName"
                  required
               />
            </FormField>
         } */ }
         <Box
            direction = "row"
            justify   = 'between'
         >
            <Button
               type  = "reset"
               label = "Отменить"
               onClick = { () => setModal (false) }
            />
            <Button
               primary
               type  = "submit"
               label = { idTask ? 'Изменить' : 'Создать' }
            />
         </Box>
      </Form>
   )
})