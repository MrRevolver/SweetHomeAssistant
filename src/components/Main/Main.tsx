import React, { FC } from "react";
import { observer } from "mobx-react";
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Grid, Heading, TextInput } from "grommet";
import { FormNext } from "grommet-icons";


export const MainComponent: FC = observer(() => {
   return (
      <>
         <Box pad = "large">
            <Heading>Контроллер бассейна</Heading>

            <Grid
               align   = "start"
               gap     = "medium"
               columns = { ["2/3", "1/3"] }
               rows    = { ["2/2", "1/2"] }

               areas = { [
                  { name: 'indicators', start: [0, 0], end: [1, 0] },
                  { name: 'ion'       , start: [1, 0], end: [1, 1] },
                  { name: 'input'     , start: [1, 1], end: [1, 1] },
               ] }
            >
               <Card
                  gridArea = "indicators"
                  height = "large"
                  width  = "large"
                  border = { { color: 'brand', size: 'xsmall' } }
               >
                  <CardHeader pad = "medium">
                     Текущие показатели
                  </CardHeader>

                  <CardBody   pad = "medium">
                     <Box>
                        Объём бассейна: 50 м3
                        Температура воды: +26
                        Температура воздухаЖ +26
                        Уровень Ph: 7.6
                     </Box>
                  </CardBody>

                  <CardFooter
                     pad = "small"
                     //background = "light-2"
                     align = "end"
                  >
                     <Button
                        reverse
                        label = "Подробнее"
                        title = "Подробнее"
                        icon = { <FormNext color = "plain" /> }
                        hoverIndicator
                     />
                  </CardFooter>
               </Card>

               <Card
                  gridArea = "ion"
                  height = "small"
                  width  = "small"
                  border = { { color: 'brand', size: 'xsmall' } }
               >
                  <CardHeader pad = "medium">
                     Целевой уровень ионов меди
                  </CardHeader>

                  <CardBody   pad = "medium">
                     0,75 мг/л
                  </CardBody>

                  <CardFooter
                     pad = "small"
                  >
                     <Button
                        fill
                        reverse
                        label = "Подробнее"
                        title = "Подробнее"
                        icon = { <FormNext color = "plain" /> }
                        hoverIndicator
                     />
                  </CardFooter>
               </Card>

               <Card
                  gridArea = "input"
                  height = "small"
                  width  = "small"
                  border = { { color: 'brand', size: 'xsmall' } }
               >
                  <CardHeader pad = "medium">
                     Введите результат текущего замера ионов меди
                  </CardHeader>

                  <CardBody   pad = "medium">
                     <TextInput />
                  </CardBody>

                  <CardFooter
                     pad = "small"
                  >
                     <Button
                        fill
                        reverse
                        label = "Подробнее"
                        title = "Подробнее"
                        icon = { <FormNext color = "plain" /> }
                        hoverIndicator
                     />
                  </CardFooter>
               </Card>
            </Grid>
         </Box>
      </>
   )  
});