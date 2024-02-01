import React, { useCallback, useEffect, useState } from 'react';

import { observer } from 'mobx-react';
import { Box, Button, CheckBox, DateInput, Select, Tip } from 'grommet';
import { getTagChart } from 'api/tagchart';
import { TTag } from 'models/Tag';
import { Refresh, Time } from 'grommet-icons';

import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Tooltip,
} from 'chart.js';
import {  Line } from 'react-chartjs-2';
//import Hammer from 'react-hammerjs';
import zoomPlugin from 'chartjs-plugin-zoom'

ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Tooltip,
   zoomPlugin
)

//const data = [{ date: '2020-08-20', amount: 2 }, { date: '2020-08-21', amount: 47 }, { date: '2020-08-22', amount: 33 }];
const intervalOptions = [
   {
      id: 1,
      label: 'День'
   },
   {
      id: 2,
      label: 'Неделя'
   },
   {
      id: 3,
      label: 'Месяц'
   },
   {
      id: 4,
      label: 'Указать интервал'
   }
]

const getLocaleDate = (date): string => {

   return date.toLocaleString('sv-SE', {
      year  : 'numeric',
      month : '2-digit',
      day   : '2-digit',
      hour  : '2-digit',
      minute: '2-digit'
   }).replace(" ", "T")
}

export const IndicationChart = observer ((props: {tag: TTag}) => {

   const [interval, setInterval] = useState <number> ()
   const [fullData, setFullData] = useState <boolean> (false)

   const [dBegin, setDBegin] = useState <string | string[]> (getLocaleDate (new Date()))
   const [dEnd  , setDEnd  ] = useState <string | string[]> (getLocaleDate (new Date()))
   const [data  , setData  ] = useState ([])

   const getChart = useCallback (() => {

      getTagChart (
         props.tag.id_tag,
         dBegin,
         dEnd,
         fullData
      )
      .then (result =>  setData (result))
   }, [dBegin, dEnd, fullData])

   useEffect(() => {
      setInterval (1)
   }, [])

   useEffect (() => {

      switch (interval) {
         case 1: {

            const date = new Date ()
            setDEnd (getLocaleDate (date))
            date.setDate (date.getDate () - 1)
            setDBegin (getLocaleDate (date))
            break;
         }
         case 2: {

            const date = new Date ()
            setDEnd (getLocaleDate (date))
            date.setDate (date.getDate () - 7)
            setDBegin (getLocaleDate (date))
            break;
         }
         case 3: {
            
            const date = new Date ()
            setDEnd (getLocaleDate (date))
            date.setMonth (date.getMonth () - 1)
            setDBegin (getLocaleDate (date))
            break;
         }
         default:
            break;
      }

   }, [interval])

   useEffect(() => {
      getChart ()
   }, [dBegin, dEnd])

   //console.log (interval)
   //console.log (dBegin)
   //console.log (dEnd)

   return (
      <Box
         width     = 'large'
         height    = 'medium'
         direction = 'column'
         justify   = 'between'
      >
         <Box
            flex = 'shrink'
         >
            <Box
               direction = 'row'
               gap       = 'medium'
            >
               <Box fill = 'horizontal'>
                  <Select
                     options  = { intervalOptions }
                     value    = { interval }
                     labelKey = 'label'
                     valueKey = 'id'
                     onChange = { ({ option }) => setInterval (option.id) }
                  />
               </Box>
               <Tip
                  content = 'Получить подробные данные'
               >
                  <Box
                     border
                     direction = 'row'
                     align     = 'center'
                     gap       = 'small'
                     flex      = 'grow'
                     style     = { { borderRadius: '12px' } }
                     pad       = { { horizontal: 'small' } }
                  >
                     <Time />
                     <CheckBox
                        checked  = { fullData }
                        onChange = { event => setFullData (event.target.checked) }
                     />
                  </Box>
               </Tip>
               
               <Button 
                  primary
                  icon    = { <Refresh /> }
                  onClick = { getChart }
               />
            </Box>

            { interval == 4 &&
            <Box
               direction = 'row'
               gap       = 'small'
               margin    = { { vertical: 'small' } }
            >
               <DateInput
                  format   = "dd.mm.yyyy"
                  value    = { dBegin }
                  onChange = { ({ value }) => {setDBegin (value)} }
               />
               <DateInput
                  format   = "dd.mm.yyyy"
                  value    = { dEnd }
                  onChange = { ({ value }) => {setDEnd (value)} }
               />
            </Box>
            }
         </Box>

         <Box
            flex
            margin = { { top: '20px' } }
         >
            { data?.length > 0 ? (
            <Line
               data = { {
                  labels: data?.map(({ dsample }) => {

                     const label = new Date (dsample)
                     switch (interval) {
                        case 1:  return label.toLocaleTimeString ('ru-RU') 
                        case 2:  return label.toLocaleString ('ru-RU')
                        case 3:  return label.toLocaleDateString ('ru-RU')
                        default: return label.toLocaleString ('ru-RU')
                     }
                  }),
                  datasets: [
                     {
                        data           : data?.map ((data) => data.sample),
                        borderColor    : 'rgb(53, 162, 235)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        fill           : true,
                     },
                  ],
               } }
               options = { {
                  maintainAspectRatio: false,
                  responsive         : true,
                  plugins: {
                     legend: {
                        display: false
                     },
                     zoom: {
                        zoom: {
                           wheel: {
                              enabled: true,
                           },
                           pinch: {
                              enabled: true
                           },
                           mode: 'x',
                        },
                        pan: {
                           enabled: true,
                           mode   : 'x',
                        },
                     }
                  },
               } }
            />
            ) : (
               <Box>Нет данных для отображения</Box>
            ) }

         </Box>
      </Box>

      
   )
})