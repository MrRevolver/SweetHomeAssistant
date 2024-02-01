import React, { useState, useContext } from 'react';
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, ResponsiveContext, Text, Tip } from 'grommet';
import { observer } from 'mobx-react';
import { Modal } from 'components/Library/Modal/Modal';

import { deviceStore } from 'store/DeviceStore';
import { deviceSettingsStore } from 'store/DeviceSettingsStore';
import { controlPanelStore } from 'store/ControlPanelStore';

import { timingOption, weekDaysOption } from './data/data';
import { TDeviceSetting } from 'models/Setting';

import { ToggleSchedule } from './components/ToggleSchedule';
import { ManipulateSchedule } from './components/ManipulateSchedule';
import { DeleteSchedule } from './components/DeleteSchedule';

import { Edit, Package, StatusGoodSmall, Trash } from 'grommet-icons';

import { Loader } from 'components/Common/Loader';

export const Schedule = observer ((props: {deviceSetting: TDeviceSetting}) => {

   const size     = useContext (ResponsiveContext)
   const settings = props.deviceSetting?.settings

   const [activeModal, setActiveModal] = useState (false)
   const [deleteModal, setDeleteModal] = useState (false)
   const [idTask     , setIdTask     ] = useState <number>(null)

   //console.log (toJS (props.deviceSetting))
   //console.log (size)

   return (
      <>
         <Card
            border = { { color: 'brand', size: 'xsmall' } }
            pad    = "medium"
            flex   = "grow"
            margin = { { top: 'medium' } }
         >
            <CardHeader
               direction = 'row'
               align     = 'center'
               gap       = 'small'
               justify   = 'start'
               margin    = { { bottom: 'medium' } }
            >

               { (props.deviceSetting?.ddeliveredsettings > props.deviceSetting?.dsettings)
                        ? (
                           <Tip content = "Расписание получено контроллером">
                              <StatusGoodSmall color = 'success'/>
                           </Tip>
                        ) : (
                           <Tip content = "Статус получения расписания контроллером неизвестен">
                              <StatusGoodSmall color = 'warning'/>
                           </Tip>
                        )
               }
                     
               <Heading
                  level  = { 3 }
                  margin = { { top: 'none', bottom: 'none' } }
               >
                  { (!deviceStore.loading && deviceStore.devices.length > 0) &&
                        `Расписание устройства "${deviceStore.devices.find (device => device.id_device === props.deviceSetting.id_device)?.name}"`
                  }
               </Heading>

            </CardHeader>

            <CardBody
               style = { { gap: 12 } }
            >

               { deviceSettingsStore.loading 
                 ? <Loader />
                 : <>
                    { settings?.Schedule 
                        ? settings?.Schedule.map (task => (

                           <Box
                              key       = { task.Id }
                              direction = 'row'
                              pad       = 'medium'
                              justify   = 'between'
                              border    = { { color: 'brand', size: 'xsmall' } }
                              style     = { { gap: 24 } }
                              wrap      = { size == 'small' ? true : false }
                              round
                           >

                              <ToggleSchedule
                                 idDevice = { props.deviceSetting.id_device }
                                 idTask   = { task.Id }
                              />

                              <Box
                                 alignSelf = 'center'
                              >
                                 { 'Выполнить команду "' }
                                 { /* actionOption[schedule?.Action].label */ }
                                 { task?.Action == 0 &&
                                       controlPanelStore.getControlBlockOption (task?.Command)
                                       ?.label
                                 }
                                  
                                 { task?.Action == 1 && task?.EventName    }
                                 { task?.Action == 2 && task?.FunctionName }
                                 { '"' }

                                 { (task?.Value &&
                                 controlPanelStore.controlBlocks
                                 .flatMap (data => data?.controls).find (control => control.options
                                 .find (option  => option.command == task?.Command))?.type === 'RangeInput') &&
                                 ': ' + task?.Value + '%, ' }

                                 { ' ' + timingOption[task?.Interval].label.toLowerCase() }

                                 { task?.Interval == 0 && '. ' }
                                 { task?.Interval == 1 && ' в ' + task?.EveryDay  + '. ' }
                                 { task?.Interval == 2 &&
                                 <>
                                    { ' в ' + task?.EveryWeek + '. Дни недели: ' }
                                    { task?.WeekDays.map ((day, i) => (
                                       weekDaysOption[day].label + ((i == (task?.WeekDays.length - 1)) ? '. ' : ', ')
                                    )) }
                                 </>
                                 }
                                  
                                 { 'Начать: ' + new Date (task?.DStart).toLocaleString([], { dateStyle: 'long', timeStyle: 'short' }) }
                                 { '.' }
                              </Box>

                              <Box
                                 direction = 'row'
                                 alignSelf = 'center'
                                 flex      = 'grow'
                                 justify   = { size == 'small' ? 'between' : 'end' }
                                 wrap
                              >
                                 <Box>
                                    <Button
                                       icon    = { <Edit color = 'brand' /> }
                                       onClick = { () => {
                                          setIdTask      (task.Id)
                                          setActiveModal (true)
                                       } }
                                    />
                                 </Box>
                                 <Box>
                                    <Button
                                       icon    = { <Trash color = 'error' /> }
                                       onClick = { () => {
                                          setIdTask      (task.Id)
                                          setDeleteModal (true)
                                       } }
                                    />
                                 </Box>

                              </Box>
                           </Box>
                        )) : (
                      <Box
                         align   = "center"
                         justify = "center"
                      >
                         <Package />
                         <Text>Нет задач</Text>
                      </Box>
                      ) }
                 </>
               }

            </CardBody>
            <CardFooter>
               <Box
                  margin    = { { top: 'medium' } }
                  justify   = 'end'
                  fill      = 'horizontal'
                  direction = 'row'
               >
                  <Button
                     primary
                     reverse
                     hoverIndicator
                     onClick = { () => {
                        setIdTask      (null)
                        setActiveModal (true)
                     } }
                     label = 'Создать задачу'
                     fill = { false }
                  />
               </Box>
            </CardFooter>
         </Card>

         <Modal
            modal    = { activeModal }
            setModal = { setActiveModal }
            heading  = { idTask ? 'Редактировать задачу' : 'Новая задача' }
         >
            <ManipulateSchedule
               idDevice = { props.deviceSetting.id_device }
               idTask   = { idTask }
               setModal = { setActiveModal }
            />
         </Modal>

         <Modal
            modal    = { deleteModal }
            setModal = { setDeleteModal }
            heading  = 'Удалить задачу'
         >
            <DeleteSchedule
               idDevice = { props.deviceSetting.id_device }
               idTask   = { idTask }
               setModal = { setDeleteModal }
            />
         </Modal>
      </>
   )
})