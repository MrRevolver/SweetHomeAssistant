import { makeAutoObservable } from 'mobx';

import { TBlock } from 'models/ControlPanel';
import { projectStore } from './ProjectsStore';

export class ControlPanelStore {

   controlBlocks   : TBlock[] = []
   indicationBlocks: TBlock[] = []
   loading = false

   constructor () {
      makeAutoObservable (this)
   }

   getControllerOptions (IdProject) {

      this.loading  = true

      if (projectStore?.projects.length > 0) {
         
         const config = projectStore?.projects.find (project => project.id_project === IdProject)?.config
         let projectConfig
         
         if (typeof config === 'string') projectConfig = JSON.parse (config)

         if (projectConfig) {
            this.controlBlocks    = projectConfig.outputs.filter (blocks => blocks.type == 'ControlBlock'    )
            this.indicationBlocks = projectConfig.outputs.filter (blocks => blocks.type == 'TargetIndication')
         }
      }

      this.loading = false
   }

   getControlBlockOption (command) {

      return this.controlBlocks
      .flatMap (controlBlock => controlBlock.controls)
      .flatMap (control => control.options)
      .find    (option => option.command == command)
   }

   getIndicationBlockOption (command) {

      return this.controlBlocks
      .flatMap (controlBlock => controlBlock.controls)
      .flatMap (control => control.options)
      .find    (option => option.command == command)
   }
}

export const controlPanelStore = new ControlPanelStore ()